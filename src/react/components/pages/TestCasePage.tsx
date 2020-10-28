import React, { useState } from "react";
import { VscFiles } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from ".";
import { Context, TestCase, getDefaultTestCase } from "../../Context";
import { Menu } from "antd";
import MonacoEditor from "react-monaco-editor";
import { makeStyles } from "@material-ui/styles";
import {
    CopyOutlined,
    DeleteOutlined,
    FileAddOutlined,
    FileTextOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import SubMenu from "antd/lib/menu/SubMenu";

/**
 * 코드 에디터 페이지 디자인
 */
const useStyles = makeStyles({
    page: {
        "& > .react-monaco-editor-container": {
            display: "table-cell",
        },
    },
    "right-align": {
        float: "right",
    },
    "menu-bar": {
        paddingRight: 15,
    },
});

/**
 * 테스트 케이스를 작성할 페이지
 */
@Service()
export class TestCasePage implements SidePageBarElement {
    readonly icon = VscFiles;
    readonly toolTip = "Manage Test Case";
    page() {
        const classes = useStyles();
        const [state, setState] = useState({
            /**
             * 선택된 페이지
             */
            selected: 0,
        });

        return (
            <Context.Consumer>
                {(context) => (
                    <div className={classes.page}>
                        {/* 테스트 케이스 탭 */}
                        <Menu
                            className={classes["menu-bar"]}
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[state.selected.toString()]}
                            selectable={true}
                        >
                            {/* 지금까지 작성된 테스트 케이스 */}
                            {context.testCases.map((testCase, idx) => (
                                <Menu.Item
                                    icon={<FileTextOutlined />}
                                    key={idx.toString()}
                                    onClick={function handleClickTestCase() {
                                        setState({ ...state, selected: idx });
                                    }}
                                >
                                    {`Test ${idx + 1}`}
                                </Menu.Item>
                            ))}
                            {/* 추가/복사/삭제/실행 */}
                            <SubMenu
                                className={classes["right-align"]}
                                icon={<MenuOutlined />}
                                // title={"Operations"}
                            >
                                <Menu.ItemGroup title={"operations"}>
                                    {/* 새 테스트 케이스 추가 */}
                                    <Menu.Item
                                        icon={<FileAddOutlined />}
                                        key={"newTestCase"}
                                        onClick={function handleAddTestCase() {
                                            context.testCases.push(getDefaultTestCase());
                                            setState({
                                                ...state,
                                                selected: context.testCases.length - 1,
                                            });
                                            toast.dark(`🦄 New Test Created.`);
                                        }}
                                    >
                                        Create New Test
                                    </Menu.Item>

                                    {/* 현재 포커싱된 테스트 케이스 복사 */}
                                    <Menu.Item
                                        key={"copy"}
                                        icon={<CopyOutlined />}
                                        onClick={function handleCopyTestCase() {
                                            const copied = Object.assign(
                                                {},
                                                context.testCases[state.selected],
                                            );
                                            context.testCases.push(copied);
                                            setState({
                                                ...state,
                                                selected: context.testCases.length - 1,
                                            });
                                            toast.dark(`🦄 Copied.`);
                                        }}
                                    >
                                        Copy Current Test
                                    </Menu.Item>
                                    {/* 현재 포커싱된 테스트 케이스 삭제 */}
                                    <Menu.Item
                                        key={"delete"}
                                        icon={<DeleteOutlined />}
                                        onClick={function handleDeleteTestCase() {
                                            const { testCases, setContext } = context;
                                            const lastTestCaseIdx = testCases.length - 1;
                                            const focused = state.selected;
                                            //
                                            // 1개인 상태에서 삭제하려 할 경우.
                                            if (lastTestCaseIdx === 0) {
                                                toast.dark(
                                                    `🦄 There must be at least one test.`,
                                                );
                                            }
                                            //
                                            // 마지막 테스트를 삭제하는 경우.
                                            else if (lastTestCaseIdx === focused) {
                                                testCases.splice(state.selected, 1);
                                                setState({
                                                    ...state,
                                                    selected: state.selected - 1,
                                                });
                                                toast.dark(`🦄 Deleted.`);
                                            }
                                            //
                                            // 처음 또는 중간의 테스트를 삭제하는 경우.
                                            else {
                                                const nextTestCases = Object.assign(
                                                    [] as TestCase[],
                                                    testCases.splice(state.selected, 1),
                                                );
                                                setContext({
                                                    ...context,
                                                    testCases: nextTestCases,
                                                });
                                                toast.dark(`🦄 Deleted.`);
                                            }
                                        }}
                                    >
                                        Delete Current Test
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                        </Menu>
                        {/* 현재 테스트 케이스 정보 */}
                        <>
                            {/* 현재 테스트 케이스의 입력 */}
                            <MonacoEditor
                                height={"calc( 100vh - 46px )"}
                                width={"calc( (100vw - 85px) / 2 )"}
                                theme={"vs-dark"}
                                language={"text"}
                                options={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                }}
                                value={context.testCases[state.selected].input}
                                onChange={function handleInputChanged(newInput) {
                                    context.testCases[state.selected].input = newInput;
                                }}
                            />
                            {/* 현재 테스트 케이스의 출력 */}
                            <MonacoEditor
                                height={"calc( 100vh - 46px )"}
                                width={"calc( (100vw - 85px) / 2 )"}
                                theme={"vs-dark"}
                                language={"text"}
                                options={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                }}
                                value={context.testCases[state.selected].expect}
                                onChange={function handleExpectChanged(newExpect) {
                                    context.testCases[state.selected].expect = newExpect;
                                }}
                            />
                        </>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}
