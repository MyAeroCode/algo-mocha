import React, { useContext, useEffect, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import { Menu } from "antd";
import { CaretRightOutlined, SettingOutlined } from "@ant-design/icons";
import { VscCode } from "react-icons/vsc";
import Container, { Service } from "typedi";
import { SidePageBarElement } from ".";
import { makeStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import { Context } from "../../Context";
import SubMenu from "antd/lib/menu/SubMenu";
import { SupportLangService } from "../../Services/SupportLangSerivce";
import Electron = require("electron");
import { Channels, TestRequestMessage, TestResponseMessage } from "../../../common/types";
import { SupportLang } from "../../Services/SupportLangSerivce/lang";

/**
 * 코드 에디터 페이지 디자인
 */
const useStyles = makeStyles({
    "menu-bar": {
        paddingRight: 15,
    },
    "right-align": {
        float: "right",
    },
});

const { ipcRenderer }: typeof Electron = window.require("electron");
let contextRef: Context;
ipcRenderer.removeAllListeners(Channels.BUILD_RES);

/**
 * 빌드 완료 메세지 수신
 */
ipcRenderer.on(Channels.BUILD_RES, (event, error) => {
    //
    // 빌드가 실패했다면 중단한다.
    if (error) {
        console.error(error);
        return;
    }

    //
    // 각 테스트에 대해, 테스트 요청 메세지 송신
    contextRef.testCases.forEach((testCase, idx) => {
        const testRequestMessage = contextRef.lang.createTestRequestMessage(
            idx,
            testCase,
        );
        ipcRenderer.send(Channels.TEST_REQ, testRequestMessage);
    });
});

/**
 * 단일 테스트 완료 메세지 수신
 */
ipcRenderer.on(Channels.TEST_RES, (event, message: TestResponseMessage) => {
    console.log(message);
});

/**
 * 실제 코드를 작성할 페이지
 */
@Service()
export class CodeEditorPage implements SidePageBarElement {
    readonly icon = VscCode;
    readonly toolTip = "Write Code";
    page() {
        const langService = Container.get(SupportLangService);
        const classes = useStyles();

        return (
            <Context.Consumer>
                {(context) => {
                    contextRef = context;

                    /**
                     * 프로그래밍 언어를 변경할 수 있는 버튼을 생성한다.
                     */
                    function createLanguageSelector() {
                        /**
                         * 프로그래밍 언어 정보로 하나의 탭을 생성한다.
                         */
                        function createLanguageTab(lang: SupportLang) {
                            function handleClick() {
                                context.setContext({
                                    ...context,
                                    lang: langService.getLangByCode(lang.langCode),
                                });
                                toast.dark(`🦄 Appiled To ${lang.langName}`);
                            }

                            return (
                                <Menu.Item key={lang.langCode} onClick={handleClick}>
                                    {lang.langName}
                                </Menu.Item>
                            );
                        }

                        return (
                            <SubMenu
                                className={classes["right-align"]}
                                icon={<SettingOutlined />}
                                key={"1"}
                                title={context.lang.langName}
                                style={{ width: 120 }}
                            >
                                <Menu.ItemGroup title="Language">
                                    {langService.getList().map(createLanguageTab)}
                                </Menu.ItemGroup>
                            </SubMenu>
                        );
                    }

                    /**
                     * 테스트를 실행하는 버튼을 생성한다.
                     */
                    function createExecutor() {
                        function handleClick() {
                            ipcRenderer.send(
                                Channels.BUILD_REQ,
                                context.lang.createBuildRequestMessage({
                                    code: context.code,
                                }),
                            );
                        }

                        return (
                            <Menu.Item
                                className={classes["right-align"]}
                                icon={<CaretRightOutlined />}
                                key="2"
                                onClick={handleClick}
                            >
                                Execute
                            </Menu.Item>
                        );
                    }

                    /**
                     * 코드를 작성할 수 있는 에디터를 생성한다.
                     */
                    function createEditor() {
                        function onChange(newCode: string) {
                            context.setContext({ ...context, code: newCode });
                        }
                        return (
                            <MonacoEditor
                                height={"calc( 100vh - 46px )"}
                                width={"calc( 100vw - 85px )"}
                                options={{
                                    fontSize: 16,
                                    lineHeight: 24,
                                }}
                                theme={"vs-dark"}
                                language={context.lang.langCode}
                                value={context.code}
                                onChange={onChange}
                            />
                        );
                    }

                    return (
                        <div>
                            <Menu
                                className={classes["menu-bar"]}
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={[context.lang.langCode]}
                                selectable={true}
                            >
                                {createLanguageSelector()}
                                {createExecutor()}
                            </Menu>
                            {createEditor()}
                        </div>
                    );
                }}
            </Context.Consumer>
        );
    }
}
