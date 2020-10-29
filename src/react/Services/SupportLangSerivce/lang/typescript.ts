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
export class LangTypeScript implements SupportLang {
    readonly langCode = "typescript";
    readonly langName = "TypeScript";

    getSourceFilePath(): string {
        return path.join(baseDir, `${baseCodeName}.ts`);
    }

    getCompiledFilePath(): string {
        return path.join(baseDir, `${baseExecName}.js`);
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
                compileCommand: `tsc ${sourceFilePath} --outFile ${compiledFilePath}`,
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
            execCmd: `node ${compiledFilePath}`,
        };
        return testRequestMessage;
    }
}
