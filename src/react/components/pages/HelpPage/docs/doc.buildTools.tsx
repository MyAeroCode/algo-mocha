import React from "react";
import { Service } from "typedi";
import { Doc } from ".";
import { ToolOutlined } from "@ant-design/icons";
import { stripIndent } from "common-tags";

@Service()
export class BuildToolsDoc implements Doc {
    icon = (<ToolOutlined />);
    title = "Build Tools";
    contents = stripIndent`
        # C
            compile: gcc -o test-n test-n.cpp
            execute: test-n

        # C++
            compile: g++ -o test-n test-n.cpp
            execute: test-n

        # JavaScript
            compile: 
            execute: node test-n.js

        # TypeScript
            compile: tsc test-n.ts
            execute: node test-n.js
    `;
}
