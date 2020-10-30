import React, { useState } from "react";
import { VscFiles } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from ".";
import { Context, TestCase, getDefaultTestCase } from "../../Context";
import { Menu } from "antd";
import MonacoEditor, { ChangeHandler } from "react-monaco-editor";
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

        /**
         * 컨텍스트
         */
        let contextRef: Context;

        /**
         * 컨텍스트를 사용하여 컴포넌트를 생성한다.
         */
        function createComponentViaContext(context: Context) {
            contextRef = context;

            /**
             * 테스트를 선택할 수 있는 버튼들을 생성한다.
             */
            function createTestSelectors() {
                /**
                 * 특정 테스트를 선택할 수 있는 버튼을 생성한다.
                 */
                function createTestSelector(testCase: TestCase, idx: number) {
                    function handleClick() {
                        setState({ ...state, selected: idx });
                    }

                    return (
                        <Menu.Item
                            icon={<FileTextOutlined />}
                            key={idx.toString()}
                            onClick={handleClick}
                        >
                            {`Test ${idx + 1}`}
                        </Menu.Item>
                    );
                }

                return contextRef.testCases.map(createTestSelector);
            }

            /**
             * 테스트를 관리할 수 있는 버튼을 가진 탭을 생성한다.
             */
            function createTestOperation() {
                /**
                 * 새로운 테스트를 추가하는 버튼을 생성한다.
                 */
                function createAddBtn() {
                    function handleClick() {
                        contextRef.testCases.push(getDefaultTestCase());
                        setState({
                            ...state,
                            selected: contextRef.testCases.length - 1,
                        });
                        toast.dark(`🦄 New Test Created.`);
                    }

                    return (
                        <Menu.Item
                            icon={<FileAddOutlined />}
                            key={"newTestCase"}
                            onClick={handleClick}
                        >
                            Create New Test
                        </Menu.Item>
                    );
                }

                /**
                 * 현재 포커싱된 테스트를 복제하는 버튼을 생성한다.
                 */
                function createCpyBtn() {
                    function handleClick() {
                        const copied = Object.assign(
                            {},
                            contextRef.testCases[state.selected],
                        );
                        contextRef.testCases.push(copied);
                        setState({
                            ...state,
                            selected: contextRef.testCases.length - 1,
                        });
                        toast.dark(`🦄 Copied.`);
                    }

                    return (
                        <Menu.Item
                            key={"copy"}
                            icon={<CopyOutlined />}
                            onClick={handleClick}
                        >
                            Copy Current Test
                        </Menu.Item>
                    );
                }

                /**
                 * 현재 포커싱된 테스트를 삭제하는 버튼을 생성한다.
                 */
                function createDelBtn() {
                    function handleClick() {
                        const { testCases, setContext } = contextRef;
                        const lastTestCaseIdx = testCases.length - 1;
                        const focused = state.selected;

                        //
                        // 1개인 상태에서 삭제하려 할 경우.
                        if (lastTestCaseIdx === 0) {
                            toast.dark(`🦄 There must be at least one test.`);
                        }

                        //
                        // 마지막 테스트를 삭제하는 경우.
                        else if (lastTestCaseIdx === focused) {
                            testCases.pop();
                            setState({
                                ...state,
                                selected: state.selected - 1,
                            });
                            toast.dark(`🦄 Deleted.`);
                        }

                        //
                        // 처음 또는 중간의 테스트를 삭제하는 경우.
                        else {
                            testCases.splice(state.selected, 1);
                            const nextTestCases = Object.assign(
                                [] as TestCase[],
                                testCases,
                            );
                            setContext({
                                ...contextRef,
                                testCases: nextTestCases,
                            });
                            toast.dark(`🦄 Deleted.`);
                        }
                    }

                    return (
                        <Menu.Item
                            key={"delete"}
                            icon={<DeleteOutlined />}
                            onClick={handleClick}
                        >
                            Delete Current Test
                        </Menu.Item>
                    );
                }

                return (
                    <SubMenu
                        className={classes["right-align"]}
                        icon={<MenuOutlined />}
                        // title={"Operations"}
                    >
                        <Menu.ItemGroup title={"operations"}>
                            {createAddBtn()}
                            {createCpyBtn()}
                            {createDelBtn()}
                        </Menu.ItemGroup>
                    </SubMenu>
                );
            }

            /**
             * 현재 포커싱된 테스트의 input과 actual을 디스플레이하는 에디터 2개를 생성한다.
             */
            function createTestViewers() {
                interface _ViewerOption {
                    value: string;
                    handleChange: ChangeHandler;
                }

                /**
                 * 주어진 내용을 디스플레이하는 에디터 1개를 생성한다.
                 */
                function createViewer(
                    { value, handleChange }: _ViewerOption,
                    idx: number,
                ) {
                    return (
                        <MonacoEditor
                            key={idx}
                            height={"calc( 100vh - 46px )"}
                            width={"calc( (100vw - 85px) / 2 )"}
                            theme={"vs-dark"}
                            language={"plaintext"}
                            options={{
                                fontSize: 16,
                                lineHeight: 24,
                                wordBasedSuggestions: false,
                            }}
                            value={value}
                            onChange={handleChange}
                        />
                    );
                }

                /**
                 * 각각의 에디터가 보여줄 내용
                 */
                const targets: _ViewerOption[] = [
                    //
                    // 현재 포커싱된 테스트의 input을 보여주는 에디터 옵션
                    {
                        value: contextRef.testCases[state.selected].input,
                        handleChange: function (newInput) {
                            contextRef.testCases[state.selected].input = newInput;
                        },
                    },
                    //
                    // 현재 포커싱된 테스트의 actual을 보여주는 에디터 옵션
                    {
                        value: contextRef.testCases[state.selected].expect,
                        handleChange: function (newExpect) {
                            contextRef.testCases[state.selected].expect = newExpect;
                        },
                    },
                ];

                return targets.map(createViewer);
            }

            return (
                <div className={classes.page}>
                    {/* 테스트 케이스 탭 */}
                    <Menu
                        className={classes["menu-bar"]}
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[state.selected.toString()]}
                        selectable={true}
                    >
                        {createTestSelectors()}
                        {createTestOperation()}
                    </Menu>
                    {createTestViewers()}
                </div>
            );
        }

        return <Context.Consumer>{createComponentViaContext}</Context.Consumer>;
    }
}
