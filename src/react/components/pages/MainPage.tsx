import React from "react";
import { VscHome } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from ".";

/**
 * 프로그램 실행시 처음 보여질 페이지
 */
@Service()
export class MainPage implements SidePageBarElement {
    readonly icon = VscHome;
    readonly toolTip = "Main";
    page() {
        return <div>MainPage</div>;
    }
}
