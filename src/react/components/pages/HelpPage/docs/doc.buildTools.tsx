import React from "react";
import { Service } from "typedi";
import { Doc } from ".";
import { ToolOutlined } from "@ant-design/icons";

@Service()
export class BuildToolsDoc implements Doc {
    icon = (<ToolOutlined />);
    title = "Build Tools";
    contents = `Build Tools Doc.`;
}
