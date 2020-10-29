import { Service } from "typedi";
import {
    baseCodeName,
    baseExecName,
    CompileCodeInput,
    ExecuteTestInput,
    SupportLang,
} from ".";
import { path, baseDir } from ".";
import { BuildRequestMessage, TestRequestMessage } from "../../../../common/types";

@Service()
export class LangCPP implements SupportLang {
    readonly langCode = "cpp";
    readonly langName = "C++";

    getSourceFilePath() {
        return path.join(baseDir, `${baseCodeName}.cpp`);
    }

    getCompiledFilePath(): string {
        return path.join(baseDir, `${baseExecName}.exe`);
    }

    createBuildRequestMessage({ code }: CompileCodeInput) {
        const sourceFilePath = this.getSourceFilePath();
        const compiledFilePath = this.getCompiledFilePath();
        const buildRequestMessage: BuildRequestMessage = {
            sourceCodeInfo: {
                sourceCode: code,
                path: sourceFilePath,
            },
            compileInfo: {
                compileCommand: `g++ -o ${compiledFilePath} ${sourceFilePath}`,
                path: compiledFilePath,
            },
        };
        return buildRequestMessage;
    }

    createTestRequestMessage(idx: number, { input, expect }: ExecuteTestInput) {
        const compiledFilePath = this.getCompiledFilePath();
        const testRequestMessage: TestRequestMessage = {
            idx,
            input,
            expect,
            execCmd: `${compiledFilePath}`,
        };
        return testRequestMessage;
    }
}
