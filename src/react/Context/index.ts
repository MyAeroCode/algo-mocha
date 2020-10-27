import React from "react";
import { Lang } from "./SupportLangService";

/**
 * 글로벌 컨텍스트 타입
 */
export interface Context {
    /**
     * 현재 선택된 프로그래밍 언어.
     */
    lang: Lang;

    /**
     * 현재 코드 내용.
     */
    code: string;

    /**
     * 컨텍스트 수정 메서드.
     */
    setContext: React.Dispatch<React.SetStateAction<Context>>;
}

/**
 * 기본 컨텍스트 값.
 */
export const contextDefaultValue: Context = {
    lang: Lang.CPP,
    code: "",
    setContext: () => {},
};

/**
 * 글로벌 컨텍스트
 */
export const Context = React.createContext<Context>(contextDefaultValue);

//
// 하위 모듈 export.
export * from "./SupportLangService";
