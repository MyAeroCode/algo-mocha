import React from "react";
import { VscFiles } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from ".";

/**
 * 테스트 케이스를 작성할 페이지
 */
@Service()
export class TestCasePage implements SidePageBarElement {
    readonly icon = VscFiles;
    readonly toolTip = "Manage Test Case";
    page() {
        return <div>TestCasePage</div>;
    }
}
