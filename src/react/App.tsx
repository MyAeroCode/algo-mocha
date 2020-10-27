import React from "react";
import { ToastContainer } from "react-toastify";
import { SidePageBar } from "./components/SidePageBar";

export function App() {
    return (
        <>
            {/* 사이드 바 */}
            <SidePageBar />

            {/* 토스트 라이브러리 컨테이너 */}
            <ToastContainer
                position={"bottom-right"}
                hideProgressBar={true}
                autoClose={2500}
            />
        </>
    );
}
