import React, { useState } from "react";
import { VscOutput } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from ".";
import { Context } from "../../Context";
import { Menu } from "antd";
import { makeStyles } from "@material-ui/styles";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import MonacoEditor, { MonacoDiffEditor } from "react-monaco-editor";

/**
 * 코드 에디터 페이지 디자인
 */
const useStyles = makeStyles({
    page: {
        "& > .react-monaco-editor-container": {
            display: "table-cell",
        },
    },
    "menu-bar": {
        paddingRight: 15,
        display: "table-cell",
        width: "222px",
        height: "100vh",
    },
});

/**
 * 테스트 케이스를 작성할 페이지
 */
@Service()
export class TestOutputPage implements SidePageBarElement {
    readonly icon = VscOutput;
    readonly toolTip = "Show Test Result";
    page() {
        const classes = useStyles();
        const [state, setState] = useState({
            /**
             * 선택된 테스트
             */
            selected: 0,
        });

        function handleClickTestCase(idx: number) {
            setState({ selected: idx });
        }

        return (
            <Context.Consumer>
                {(context) => {
                    const { testResults } = context;
                    return (
                        <div className={classes.page}>
                            {/* 테스트 결과 탭 */}
                            <Menu
                                className={classes["menu-bar"]}
                                mode={"inline"}
                                theme={"dark"}
                                selectedKeys={[state.selected.toString()]}
                                defaultOpenKeys={["sub0", "sub1"]}
                                selectable={true}
                            >
                                {/* 테스트 결과 그룹 */}
                                {[false, true].map(function createTestResultGroup(flag) {
                                    const Icon = flag ? CheckOutlined : StopOutlined;
                                    return (
                                        <SubMenu
                                            key={`sub${Number(flag)}`}
                                            icon={<Icon />}
                                            title={flag ? "Passed" : "Failed"}
                                        >
                                            {/* 단일 테스트 결과 */}
                                            {testResults.map((testResult, idx) => {
                                                const { actual, expect } = testResult;
                                                const isPassed = actual === expect;
                                                if (isPassed === flag) {
                                                    return (
                                                        <Menu.Item
                                                            icon={<Icon />}
                                                            key={idx.toString()}
                                                            onClick={() =>
                                                                handleClickTestCase(idx)
                                                            }
                                                        >
                                                            {idx
                                                                ? `Test ${idx}`
                                                                : `Example Result`}
                                                        </Menu.Item>
                                                    );
                                                }
                                            })}
                                        </SubMenu>
                                    );
                                })}
                            </Menu>

                            {/* 현재 포커싱된 테스트의 input */}
                            <MonacoEditor
                                height={"100vh"}
                                width={"calc( (100vw - 85px - 222px) / 3 )"}
                                theme={"vs-dark"}
                                language={"plaintext"}
                                value={testResults[state.selected]?.input}
                                options={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                    readOnly: true,
                                }}
                            />

                            {/* 현재 포커싱된 테스트의 expect, actual */}
                            <MonacoDiffEditor
                                height={"100vh"}
                                width={"calc( (100vw - 85px - 222px) / 3 * 2 )"}
                                theme={"vs-dark"}
                                original={testResults[state.selected]?.expect}
                                value={testResults[state.selected]?.actual}
                                language={"plaintext"}
                                options={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                    readOnly: true,
                                }}
                            />
                        </div>
                    );
                }}
            </Context.Consumer>
        );
    }
}
