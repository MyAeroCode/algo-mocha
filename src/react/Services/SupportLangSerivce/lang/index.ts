import Container from "typedi";
import { TestCase } from "../../../Context";
import { LangC } from "./c";
import { LangCPP } from "./cpp";
import { LangJavaScript } from "./javascript";
import { LangTypeScript } from "./typescript";

/**
 * 에디터에서 지원하는 언어
 */
export interface SupportLang {
    readonly langCode: string;
    readonly langName: string;
    test(testCase: TestCase & { idx: number }): Promise<boolean>;
}

/**
 * 에디터에서 지원하는 언어 목록
 */
export const supportLangList: SupportLang[] = [
    LangC,
    LangCPP,
    LangJavaScript,
    LangTypeScript,
].map((lang) => Container.get(lang));
