import React, { useState } from "react";
import { Menu } from "antd";
import { makeStyles } from "@material-ui/styles";
import { SidePageBarElement, sidePageBarElements } from "./pages";
import { Context, contextDefaultValue } from "../Context";

/**
 * 사이드 페이지 바 스타일
 */
const useStyles = makeStyles(() => ({
    //
    // 사이드 바 홀더
    sideMenuBarWrap: {
        overflowY: "hidden",
        "& > *": {
            display: "table-cell",
        },
    },

    //
    // 사이드 바
    sideMenuBar: {
        width: "85px",
        height: "100vh",
    },

    //
    // 사이드 바에 포함된 각 요소
    sideMenuBarElement: {
        "& > span": {
            display: "none",
        },
        "& svg": {
            fontSize: "22px",
            margin: "12px auto",
        },
    },
}));

/**
 * 어플리케이션 우측에 항상 표시될
 * 페이지 이동 사이드 바.
 */
export function SidePageBar() {
    const classes = useStyles();
    const [state, setState] = useState({ ...contextDefaultValue });

    /**
     * 해당 컴포넌트를 생성한다.
     */
    function createComponent() {
        /**
         * 선택된 페이지
         */
        const SelectedPage = sidePageBarElements[state.page].page;

        /**
         * 페이지 이동 탭을 생성한다.
         */
        function createSideBarElements() {
            /**
             * 클릭 시, 페이지를 이동하는 버튼을 생성한다.
             */
            function createSideBarElement(elem: SidePageBarElement, idx: number) {
                function handleClick() {
                    setState({ ...state, page: idx });
                }

                return (
                    <Menu.Item
                        key={idx.toString()}
                        icon={<elem.icon />}
                        className={classes.sideMenuBarElement}
                        style={{ height: "46px", margin: "0" }}
                        onClick={handleClick}
                    >
                        {elem.toolTip}
                    </Menu.Item>
                );
            }

            return sidePageBarElements.map(createSideBarElement);
        }

        return (
            <div className={classes.sideMenuBarWrap}>
                <Menu
                    selectedKeys={[state.page.toString()]}
                    className={classes["sideMenuBar"]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={true}
                >
                    {createSideBarElements()}
                </Menu>
                <SelectedPage />
            </div>
        );
    }

    return (
        <Context.Provider value={{ ...state, setContext: setState as any }}>
            {createComponent()}
        </Context.Provider>
    );
}
