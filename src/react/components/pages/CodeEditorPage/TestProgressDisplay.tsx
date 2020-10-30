import { Progress } from "antd";
import React from "react";
import { toast } from "react-toastify";
import Container from "typedi";
import { sidePageBarElements } from "..";
import {
    Channels,
    TestRequestMessage,
    TestResponseMessage,
} from "../../../../common/types";
import { Context, getDefaultTestResult } from "../../../Context";
import { TestOutputPage } from "../TestOutputPage";
const { ipcRenderer }: typeof Electron = window.require("electron");

interface Props {}

interface State {
    done: number;
}

let contextRef: Context;
export class TestProgressDisplay extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            done: 0,
        };
    }

    //
    // 이 컴포넌트가 부착되면 메세지를 수신할 준비를 한다.
    componentDidMount() {
        /**
         * 빌드 완료 메세지 수신
         */
        ipcRenderer.on(Channels.BUILD_RES, (event, error) => {
            //
            // 빌드가 실패했다면 중단한다.
            if (error) {
                toast.dark(`💔 Build Failed.`);
                contextRef.setContext({
                    ...contextRef,
                    inProgress: false,
                });
                return;
            }

            //
            // 테스트의 개수만큼 결과 슬롯을 할당
            contextRef.testResults = [];
            for (let i = 0; i <= contextRef.testCases.length; i++) {
                contextRef.testResults.push(getDefaultTestResult());
            }
            contextRef.setContext({ ...contextRef });

            //
            // 각 테스트에 대해, 테스트 요청 메세지 송신
            contextRef.testCases.forEach((testCase, idx) => {
                const testRequestMessage: TestRequestMessage = contextRef.lang.createTestRequestMessage(
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
            this.setState((prev) => {
                const nextDone = prev.done + 1;
                contextRef.testResults[message.idx + 1] = message;
                contextRef.setContext({ ...contextRef });
                if (nextDone === contextRef.testCases.length) {
                    const failedCnt =
                        contextRef.testResults.filter((r) => r.actual !== r.expect)
                            .length - 1;

                    //
                    // 토스트를 띄운다.
                    if (failedCnt === 0) {
                        toast.dark(`✔ All test passed.`);
                    } else {
                        toast.error(`❌ ${failedCnt} test failed.`);
                    }

                    //
                    // 상세결과 페이지로 이동한다.
                    contextRef.setContext({
                        ...contextRef,
                        inProgress: false,
                        page: sidePageBarElements.indexOf(Container.get(TestOutputPage)),
                    });
                }
                return { done: nextDone };
            });
        });

        //
        // 메세지 송신
        ipcRenderer.send(
            Channels.BUILD_REQ,
            contextRef.lang.createBuildRequestMessage({
                code: contextRef.code,
            }),
        );
    }

    //
    // 이 컴포넌트가 사라지면 더 이상 메세지를 수신하지 않는다.
    componentWillUnmount() {
        ipcRenderer.removeAllListeners(Channels.BUILD_RES);
        ipcRenderer.removeAllListeners(Channels.TEST_RES);
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => {
                    contextRef = context;
                    const total = context.testCases.length;
                    const percent = Math.floor((this.state.done * 100) / total);
                    return (
                        <>
                            <Progress percent={percent} type={"dashboard"} />
                        </>
                    );
                }}
            </Context.Consumer>
        );
    }
}
