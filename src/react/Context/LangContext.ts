import { SupportLang, supportLangList } from "../Services/SupportLangSerivce/lang";

/**
 * 선택된 언어에 관한 컨텍스트
 */
export type LangContext = {
    /**
     * 현재 선택된 프로그래밍 언어.
     */
    lang: SupportLang;

    /**
     * 현재 코드 내용.
     */
    code: string;
};

/**
 * 선택된 언어에 관한 컨텍스트의 기본 값
 */
export const defaultLangContext: LangContext = {
    lang: supportLangList[0],
    code: "",
};
