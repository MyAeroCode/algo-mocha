import React from "react";
import { Service } from "typedi";
import { Doc } from ".";
import { GithubOutlined } from "@ant-design/icons";
import { stripIndent } from "common-tags";

@Service()
export class ProjectDoc implements Doc {
    icon = (<GithubOutlined />);
    title = "Project";
    contents = stripIndent`
        Author : AeroCode
        GitHub : https://github.com/MyAeroCode/algo-mocha
    `;
}
