import React from "react";
import { VscQuestion } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from ".";

/**
 * 실행 환경을 작성할 페이지
 */
@Service()
export class HelpPage implements SidePageBarElement {
    readonly icon = VscQuestion;
    readonly toolTip = "Help";
    page() {
        return <div>HelpPage</div>;
    }
}
