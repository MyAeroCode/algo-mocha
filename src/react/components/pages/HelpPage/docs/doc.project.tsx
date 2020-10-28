import React from "react";
import { Service } from "typedi";
import { Doc } from ".";
import { GithubOutlined } from "@ant-design/icons";

@Service()
export class ProjectDoc implements Doc {
    icon = (<GithubOutlined />);
    title = "Project";
    contents = `Project Doc.`;
}
