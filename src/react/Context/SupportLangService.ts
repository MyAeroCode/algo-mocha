import Container, { Service } from "typedi";

/**
 * 에디터에서 지원하는 언어의 식별자들
 */
export enum Lang {
    C = "c",
    CPP = "cpp",
    JAVASCRIPT = "javascript",
    TYPESCRIPT = "typescript",
}

/**
 * 선택된 언어에 관한 컨텍스트
 */
export type LangContext = {
    /**
     * 현재 선택된 프로그래밍 언어.
     */
    lang: Lang;

    /**
     * 현재 코드 내용.
     */
    code: string;
};

/**
 * 선택된 언어에 관한 컨텍스트의 기본 값
 */
export const defaultLangContext: LangContext = {
    lang: Lang.CPP,
    code: "",
};

/**
 * 에디터에서 지원하는 언어 정보
 */
export interface LangInfo {
    /**
     * 언어의 식별자
     */
    key: Lang;

    /**
     * 언어의 이름
     */
    name: string;
}

@Service()
export class SupportLangService {
    /**
     * 에디터에서 지원하는 언어 목록
     */
    private readonly langInfos: LangInfo[] = [
        { key: Lang.C, name: "C" },
        { key: Lang.CPP, name: "C++" },
        { key: Lang.JAVASCRIPT, name: "JavaScript" },
        { key: Lang.TYPESCRIPT, name: "TypeScript" },
    ];

    /**
     * 에디터에서 지원하는 언어 목록을 배열 형태로 가져온다.
     */
    getList(): LangInfo[] {
        return Object.assign([], this.langInfos);
    }

    /**
     * 주어진 언어 키에 해당하는 언어의 이름을 가져온다.
     */
    getNameOf(langKey: string): string {
        return this.langInfos.find((v) => v.key === langKey)!.name;
    }
}
