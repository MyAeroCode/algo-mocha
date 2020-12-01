import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import {
    BuildRequestMessage,
    Channels,
    TestRequestMessage,
    TestResponseMessage,
} from "../common/types";
import fs from "fs-extra";
import cp from "child_process";
import os from "os";

app.whenReady().then(() => {
    const window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        width: 1600,
        height: 1000,
        resizable: false,
    });

    if (process.env.NODE_ENV === "dev") {
        window.loadURL("http://localhost:8080");
        window.webContents.openDevTools();
    } else {
        window.loadFile(path.join(__dirname, "..", "..", "index.html"));
    }
});

/**
 * 빌드 요청 메세지 처리 로직
 */
ipcMain.on(Channels.BUILD_REQ, (event, message: BuildRequestMessage) => {
    fs.outputFile(message.sourceCodeInfo.path, message.sourceCodeInfo.sourceCode)
        .then(() => {
            if (message.compileInfo) {
                cp.exec(message.compileInfo.compileCommand, (error) => {
                    event.sender.send(Channels.BUILD_RES, error);
                });
            } else {
                event.sender.send(Channels.BUILD_RES, undefined);
            }
        })
        .catch((reason) => event.sender.send(Channels.BUILD_RES, reason));
});

/**
 * 테스트 요청 메세지 처리 로직
 */
ipcMain.on(Channels.TEST_REQ, (event, message: TestRequestMessage) => {
    const [program, programArg] = message.execCmd.split(" ");
    const subProcess = cp.spawn(program, [programArg]);
    let actual = "";
    subProcess.stdin.write(message.input + "\n");
    subProcess.stdout.on("data", (chunk) => {
        actual += chunk.toString();
    });

    /**
     * 중복 메세지 전송 방지를 위한 플래그
     */
    let isSended = false;

    /**
     * 주어진 body를 actual로 갖는 응답 메세지를 전송한다.
     */
    function sendResponse(body: string) {
        if (isSended) return;
        isSended = true;

        //
        // 입력 대기중에는, 표준입력 스트림을 닫아야 프로그램이 꺼진다.
        if (!subProcess.stdin.destroyed) {
            subProcess.stdin.destroy();
        }
        subProcess.kill("SIGKILL");

        //
        // 응답 메세지를 만들고 반환한다.
        const response: TestResponseMessage = {
            idx: message.idx,
            input: message.input,
            expect: message.expect,
            actual: body
                .trim()
                .split(os.EOL)
                .map((line) => line.trim())
                .join(os.EOL),
        };
        event.sender.send(Channels.TEST_RES, response);
    }

    //
    // 타임아웃
    const timeoutHandler = setTimeout(() => {
        sendResponse("timeout");
    }, 5000);

    //
    // 정상종료
    subProcess.stdout.on("close", () => {
        clearTimeout(timeoutHandler);
        sendResponse(actual.trim());
    });
});
