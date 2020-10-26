import React from "react";
import { VscCode } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from ".";

/**
 * 실제 코드를 작성할 페이지
 */
@Service()
export class CodeEditorPage implements SidePageBarElement {
    readonly icon = VscCode;
    readonly toolTip = "Write Code";
    page() {
        return <div>CodeEditorPage</div>;
    }
}
