import React from "react";
import MonacoEditor from "react-monaco-editor";
import { Menu } from "antd";
import { CaretRightOutlined, SettingOutlined } from "@ant-design/icons";
import { VscCode } from "react-icons/vsc";
import Container, { Service } from "typedi";
import { SidePageBarElement } from ".";
import { makeStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import { Context, SupportLangService } from "../../Context";
import SubMenu from "antd/lib/menu/SubMenu";

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
                {(context) => (
                    <div>
                        <Menu
                            className={classes["menu-bar"]}
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[context.lang]}
                            selectable={true}
                        >
                            {/* 프로그래밍 언어 변경 */}
                            <SubMenu
                                className={classes["right-align"]}
                                icon={<SettingOutlined />}
                                key={"1"}
                                title={langService.getNameOf(context.lang)}
                                style={{ width: 120 }}
                            >
                                <Menu.ItemGroup title="Language">
                                    {langService.getList().map((lang) => (
                                        <Menu.Item
                                            key={lang.key}
                                            onClick={() => {
                                                context.setContext({
                                                    ...context,
                                                    lang: lang.key,
                                                });
                                                toast.dark(`🦄 Appiled To ${lang.name}`);
                                            }}
                                        >
                                            {lang.name}
                                        </Menu.Item>
                                    ))}
                                </Menu.ItemGroup>
                            </SubMenu>
                            {/* 테스트 케이스 실행 */}
                            <Menu.Item
                                className={classes["right-align"]}
                                icon={<CaretRightOutlined />}
                                key="2"
                            >
                                Execute
                            </Menu.Item>
                        </Menu>
                        {/* 코드 에디터 */}
                        <MonacoEditor
                            height={"calc( 100vh - 46px )"}
                            width={"calc( 100vw - 85px )"}
                            options={{
                                fontSize: 16,
                                lineHeight: 24,
                            }}
                            theme={"vs-dark"}
                            language={context.lang}
                            value={context.code}
                            onChange={(newCode) =>
                                context.setContext({ ...context, code: newCode })
                            }
                        />
                    </div>
                )}
            </Context.Consumer>
        );
    }
}
