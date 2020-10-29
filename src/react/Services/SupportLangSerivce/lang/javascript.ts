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
export class LangJavaScript implements SupportLang {
    readonly langCode = "javascript";
    readonly langName = "JavaScript";

    getSourceFilePath(): string {
        return path.join(baseDir, `${baseCodeName}.js`);
    }

    getCompiledFilePath(): string {
        return path.join(baseDir, `${baseExecName}.js`);
    }

    createBuildRequestMessage({ code }: CompileCodeInput) {
        const sourceFilePath = this.getSourceFilePath();
        const buildRequestMessage: BuildRequestMessage = {
            sourceCodeInfo: {
                sourceCode: code,
                path: sourceFilePath,
            },
        };
        return buildRequestMessage;
    }

    createTestRequestMessage(idx: number, { input, expect }: ExecuteTestInput) {
        const sourceFilePath = this.getSourceFilePath();
        const testRequestMessage: TestRequestMessage = {
            idx,
            input,
            expect,
            execCmd: `node ${sourceFilePath}`,
        };
        return testRequestMessage;
    }
}
