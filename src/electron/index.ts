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
    const process = cp.spawn(program, [programArg]);
    let actual = "";
    process.stdin.write(message.input + "\n", console.log);
    process.stdout.on("data", (chunk) => {
        actual += chunk.toString();
    });
    process.stdout.on("close", () => {
        const response: TestResponseMessage = {
            idx: message.idx,
            input: message.input,
            expect: message.expect,
            actual: actual.trim(),
        };
        event.sender.send(Channels.TEST_RES, response);
        process.kill(0);
    });
});
