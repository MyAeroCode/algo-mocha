import React, { useState } from "react";
import { VscOutput } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from "..";
import { Context, TestResult } from "../../../Context";
import { Menu } from "antd";
import { makeStyles } from "@material-ui/styles";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import MonacoEditor, {
    MonacoDiffEditor,
    MonacoDiffEditorProps,
    MonacoEditorProps,
} from "react-monaco-editor";

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
             * 성공한 테스트 그룹과, 실패한 테스트 그룹을 디스플레이하는 뷰어를 생성한다.
             */
            function createTestResultGroups() {
                /**
                 * 디스플레이할 테스팅 그룹의 속성
                 */
                interface _ResultGroupOption {
                    icon: React.ReactNode;
                    title: string;
                }

                /**
                 * 디스플레이할 테스팅 그룹의 속성들
                 */
                const options: _ResultGroupOption[] = [
                    //
                    // 실패한 테스트의 속성
                    {
                        icon: <StopOutlined />,
                        title: "Failed",
                    },
                    //
                    // 성공한 테스트의 속성
                    {
                        icon: <CheckOutlined />,
                        title: "Passed",
                    },
                ];

                /**
                 * actual과 expect의 등치 결과가 ${flag}인 그룹을 생성한다.
                 */
                function createTestResultGroup(flag: boolean) {
                    /**
                     * flag에 대응되는 속성
                     */
                    const selectedOption = options[Number(flag)];

                    /**
                     * actual과 expect의 동치 결과가 ${flag}이라면,
                     * 클릭 시 디스플레이의 내용이 해당 테스트 결과의 내용으로 변경되는 버튼을 생성한다.
                     */
                    function createResultSelector(testResult: TestResult, idx: number) {
                        const isPassed = testResult.actual === testResult.expect;
                        if (isPassed !== flag) return undefined;

                        function handleClick() {
                            setState({ selected: idx });
                        }

                        return (
                            <Menu.Item
                                icon={selectedOption.icon}
                                key={idx.toString()}
                                onClick={handleClick}
                            >
                                {idx ? `Test ${idx}` : `Example Result`}
                            </Menu.Item>
                        );
                    }

                    return (
                        <SubMenu
                            key={`sub${Number(flag)}`}
                            icon={selectedOption.icon}
                            title={selectedOption.title}
                        >
                            {contextRef.testResults.map(createResultSelector)}
                        </SubMenu>
                    );
                }

                return [false, true].map(createTestResultGroup);
            }

            /**
             * 현재 포커싱된 테스트 결과의 input, expect, actual을 차례대로 보여주는 에디터를 생성한다.
             */
            function createTestResultViewer() {
                /**
                 * 공통된 에디터 Props를 생성한다.
                 */
                function createMonacoEditorProps(
                    denominator: number,
                    numerator: number,
                ): MonacoEditorProps & MonacoDiffEditorProps {
                    return {
                        height: "100vh",
                        width: `calc( (100vw - 85px - 222px) / ${denominator} * ${numerator} )`,
                        theme: "vs-dark",
                        language: "plaintext",
                        options: {
                            fontSize: 16,
                            lineHeight: 24,
                            readOnly: true,
                        },
                    };
                }

                return (
                    <>
                        {/* 현재 포커싱된 테스트의 input */}
                        <MonacoEditor
                            {...createMonacoEditorProps(3, 1)}
                            value={contextRef.testResults[state.selected]?.input}
                        />

                        {/* 현재 포커싱된 테스트의 expect, actual */}
                        <MonacoDiffEditor
                            {...createMonacoEditorProps(3, 2)}
                            original={contextRef.testResults[state.selected]?.expect}
                            value={contextRef.testResults[state.selected]?.actual}
                        />
                    </>
                );
            }

            return (
                <div className={classes.page}>
                    <Menu
                        className={classes["menu-bar"]}
                        mode={"inline"}
                        theme={"dark"}
                        selectedKeys={[state.selected.toString()]}
                        defaultOpenKeys={["sub0", "sub1"]}
                        selectable={true}
                    >
                        {createTestResultGroups()}
                    </Menu>
                    {createTestResultViewer()}
                </div>
            );
        }

        return <Context.Consumer>{createComponentViaContext}</Context.Consumer>;
    }
}
