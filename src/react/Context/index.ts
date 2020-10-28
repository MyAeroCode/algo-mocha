import React from "react";
import { defaultLangContext, LangContext } from "./LangContext";
import { defaultTestCaseContext, TestCaseContext } from "./TestCaseContext";

/**
 * 글로벌 컨텍스트 타입
 */
export type Context = {
    /**
     * 컨텍스트 수정 메서드.
     */
    setContext: React.Dispatch<React.SetStateAction<Context>>;
} & LangContext &
    TestCaseContext;

/**
 * 기본 컨텍스트 값.
 */
export const contextDefaultValue: Context = {
    setContext: () => {},
    ...defaultLangContext,
    ...defaultTestCaseContext,
};

/**
 * 글로벌 컨텍스트
 */
export const Context = React.createContext<Context>(contextDefaultValue);

//
// 하위 모듈 export.
export * from "./LangContext";
export * from "./TestCaseContext";
