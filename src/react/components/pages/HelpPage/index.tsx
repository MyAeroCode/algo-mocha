import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Menu } from "antd";
import { VscQuestion } from "react-icons/vsc";
import { Service } from "typedi";
import { SidePageBarElement } from "..";
import { docs } from "./docs";

/**
 * 실행 환경을 작성할 페이지
 */
@Service()
export class HelpPage implements SidePageBarElement {
    readonly icon = VscQuestion;
    readonly toolTip = "Help";
    page() {
        const [state, setState] = useState({ selected: 0 });
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[state.selected.toString()]}
                    selectable={true}
                >
                    {docs.map((doc, idx) => (
                        <Menu.Item
                            key={idx.toString()}
                            icon={doc.icon}
                            onClick={function handleChangeDoc() {
                                setState({ ...state, selected: idx });
                            }}
                        >
                            {doc.title}
                        </Menu.Item>
                    ))}
                </Menu>
                {/* 코드 에디터 */}
                <MonacoEditor
                    height={"calc( 100vh - 46px )"}
                    width={"calc( 100vw - 85px )"}
                    options={{
                        fontSize: 16,
                        lineHeight: 24,
                        readOnly: true,
                    }}
                    theme={"vs-dark"}
                    language={"text"}
                    value={docs[state.selected].contents}
                />
            </div>
        );
    }
}
