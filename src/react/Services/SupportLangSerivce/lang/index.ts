import Container from "typedi";
import { BuildRequestMessage, TestRequestMessage } from "../../../../common/types";
import { TestCase } from "../../../Context";
import { LangC } from "./c";
import { LangCPP } from "./cpp";
import { LangJavaScript } from "./javascript";
import { LangTypeScript } from "./typescript";
import Path = require("path");
import Os = require("os");

/**
 * Electron + React에서 사용할 수 있는 os 모듈
 */
export const os: typeof Os = window.require("os");

/**
 * Electron + React에서 사용할 수 있는 path 모듈
 */
export const path: typeof Path = window.require("path");

/**
 * algo-mocha 디렉터리
 */
export const baseDir = path.join(os.homedir(), ".algo-mocha");

/**
 * 기본 소스파일 이름
 */
export const baseCodeName = "code";

/**
 * 기본 실행파일 이름
 */
export const baseExecName = "exec";

/**
 * 코드를 컴파일하기 위해 필요한 정보
 */
export type CompileCodeInput = {
    /**
     * 프로그램 코드
     */
    code: string;
};

/**
 * 실제 테스트를 실행하기 위해 필요한 정보
 */
export type ExecuteTestInput = TestCase;

/**
 * 실제 테스트 실행 결과
 */
export type ExecuteTestOutput = ExecuteTestInput & {
    /**
     * 실제 출력된 값.
     */
    actual: string;
};

/**
 * 에디터에서 지원하는 언어
 */
export interface SupportLang {
    /**
     * 에디터 내에서 사용하는 언어 코드
     */
    readonly langCode: string;

    /**
     * 사용자들이 보는 언어의 이름
     */
    readonly langName: string;

    /**
     * 소스코드의 경로를 반환한다.
     */
    getSourceFilePath(): string;

    /**
     * 컴파일된 파일의 경로를 반환한다.
     */
    getCompiledFilePath(): string;

    /**
     * 주어진 코드를 컴파일한다.
     */
    createBuildRequestMessage(input: CompileCodeInput): BuildRequestMessage;

    /**
     * 주어진 테스트를 실행한다.
     */
    createTestRequestMessage(idx: number, input: ExecuteTestInput): TestRequestMessage;
}

/**
 * 에디터에서 지원하는 언어 목록
 */
export const supportLangList: SupportLang[] = [
    Container.get(LangC),
    Container.get(LangCPP),
    Container.get(LangJavaScript),
    Container.get(LangTypeScript),
];
