import Container from "typedi";
import { IconBaseProps } from "react-icons";
import { CodeEditorPage } from "./CodeEditorPage";
import { MainPage } from "./MainPage";
import { TestCasePage } from "./TestCasePage";
import { ToolConfigurePage } from "./ToolConfigurePage";

/**
 * 사이드 바에 삽입될 수 있는 요소.
 */
export interface SidePageBarElement {
    /**
     * 사이드 바에 보여질 아이콘 컴포넌트
     * "react-icons" 패키지에서 가져올 것.
     */
    icon: (props: IconBaseProps) => JSX.Element;

    /**
     * 클릭 시 화면에 보여질 페이지 컴포넌트
     */
    page: () => JSX.Element;

    /**
     * 툴팁 메세지
     */
    toolTip: string;
}

/**
 * 사이드 바에 삽입될 요소들의 배열.
 */
export const sidePageBarElements: SidePageBarElement[] = [
    Container.get(MainPage),
    Container.get(CodeEditorPage),
    Container.get(TestCasePage),
    Container.get(ToolConfigurePage),
];
