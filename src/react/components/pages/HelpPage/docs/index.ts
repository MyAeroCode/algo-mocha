import Container from "typedi";
import { ProjectDoc } from "./doc.project";
import { BuildToolsDoc } from "./doc.buildTools";

/**
 * 하나의 도큐먼트 문서
 */
export interface Doc {
    /**
     * 도큐먼트 아이콘
     */
    readonly icon: JSX.Element;

    /**
     * 도큐먼트 이름
     */
    readonly title: string;

    /**
     * 도큐먼트 내용
     */
    readonly contents: string;
}

/**
 * 도큐먼트 문서 목록
 */
export const docs: Doc[] = [Container.get(BuildToolsDoc), Container.get(ProjectDoc)];
