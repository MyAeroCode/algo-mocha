import React, { useState } from "react";
import { Menu } from "antd";
import { makeStyles } from "@material-ui/styles";
import { sidePageBarElements } from "./pages";
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
    const [state, setState] = useState({ page: 0, ...contextDefaultValue });
    const SelectedPage = sidePageBarElements[state.page].page;
    return (
        <Context.Provider value={{ ...state, setContext: setState as any }}>
            <div className={classes.sideMenuBarWrap}>
                <Menu
                    defaultSelectedKeys={["0"]}
                    className={classes["sideMenuBar"]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={true}
                >
                    {sidePageBarElements.map((v, i) => (
                        <Menu.Item
                            key={i.toString()}
                            icon={<v.icon />}
                            className={classes.sideMenuBarElement}
                            style={{ height: "46px", marginTop: "0" }}
                            onClick={() => setState({ ...state, page: i })}
                        >
                            {v.toolTip}
                        </Menu.Item>
                    ))}
                </Menu>
                <div>
                    <SelectedPage />
                </div>
            </div>
        </Context.Provider>
    );
}
