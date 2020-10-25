module.exports = {
    mode: "development",

    // 엔트리 파일 경로
    entry: "./src/react/index.tsx",

    // 빌드 결과물을 dist/react/main.js에 위치
    output: {
        filename: "main.js",
        path: __dirname + "/dist/react",
    },

    // 디버깅을 위해 빌드 결과물에 소스맵 추가
    devtool: "source-map",

    resolve: {
        // 파일 확장자 처리
        extensions: [".ts", ".tsx", ".js"],
    },

    module: {
        rules: [
            // .ts나 .tsx 확장자를 ts-loader가 트랜스파일
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    },
};
