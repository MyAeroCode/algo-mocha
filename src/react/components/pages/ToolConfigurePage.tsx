import React from "react";
import { VscTools } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from ".";

/**
 * 실행 환경을 작성할 페이지
 */
@Service()
export class ToolConfigurePage implements SidePageBarElement {
    readonly icon = VscTools;
    readonly toolTip = "Configure Build Tool";
    page() {
        return <div>ToolConfigurePage</div>;
    }
}
