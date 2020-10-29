import { Service } from "typedi";
import {
    baseCodeName,
    baseExecName,
    CompileCodeInput,
    ExecuteTestInput,
    ExecuteTestOutput,
    SupportLang,
} from ".";
import { path, baseDir } from ".";
import { BuildRequestMessage, TestRequestMessage } from "../../../../common/types";

@Service()
export class LangC implements SupportLang {
    readonly langCode = "c";
    readonly langName = "C";

    getSourceFilePath(): string {
        return path.join(baseDir, `${baseCodeName}.c`);
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
                compileCommand: `gcc -o ${compiledFilePath} ${sourceFilePath}`,
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
