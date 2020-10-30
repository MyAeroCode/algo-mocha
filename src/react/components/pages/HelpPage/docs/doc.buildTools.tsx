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
            compile: gcc -o exec.exe code.c
            execute: exec.exe

        # C++
            compile: g++ -o exec.exe code.cpp
            execute: exec.exe

        # JavaScript
            compile: cp code.js exec.js
            execute: node exec.js

        # TypeScript
            compile: tsc code.ts --outFile exec.js
            execute: node exec.js
    `;
}
