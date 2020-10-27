import React from "react";
import { defaultLangContext, LangContext } from "./LangContext";

/**
 * 글로벌 컨텍스트 타입
 */
export type Context = {
    /**
     * 컨텍스트 수정 메서드.
     */
    setContext: React.Dispatch<React.SetStateAction<Context>>;
} & LangContext;

/**
 * 기본 컨텍스트 값.
 */
export const contextDefaultValue: Context = {
    setContext: () => {},
    ...defaultLangContext,
};

/**
 * 글로벌 컨텍스트
 */
export const Context = React.createContext<Context>(contextDefaultValue);

//
// 하위 모듈 export.
export * from "./LangContext";
