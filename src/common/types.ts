/**
 * 렌더링 프로세스와 메인 프로세스 사이에서 사용할 채널 이름
 */
export enum Channels {
    BUILD_REQ = "BUILD_REQUEST",
    BUILD_RES = "BUILD_RESPONSE",
    TEST_REQ = "TEST_REQUEST",
    TEST_RES = "TEST_RESPONSE",
}
/**
 * 소스코드 정보
 */
export type SourceCodeInfo = {
    /**
     * 소스코드
     */
    sourceCode: string;

    /**
     * 해당 소스코드이 저장될 파일의 경로명
     */
    path: string;
};

/**
 * 컴파일 정보.
 */
export type CompileInfo = {
    /**
     * 컴파일 명령어
     */
    compileCommand: string;

    /**
     * 컴파일 명령어를 수행한 결과 파일이 저장될 경로명
     */
    path: string;
};

/**
 * 빌드 요청 메세지
 */
export type BuildRequestMessage = {
    /**
     * 소스코드 정보
     */
    sourceCodeInfo: SourceCodeInfo;

    /**
     * 컴파일 정보.
     * 특정 프로그래밍 언어는 컴파일이 필요하지 않을 수 있다.
     */
    compileInfo?: CompileInfo;
};

/**
 * 테스트 요청 메세지
 */
export type TestRequestMessage = {
    /**
     * 프로그램 실행 명령어
     */
    execCmd: string;

    /**
     * 테스트 입력 값
     */
    input: string;

    /**
     * 테스트 출력 값
     */
    expect: string;

    /**
     * 테스트 번호
     */
    idx: number;
};

/**
 * 테스트 결과 메세지
 */
export type TestResponseMessage = {
    /**
     * 테스트 번호
     */
    idx: number;

    /**
     * 입력값
     */
    input: string;

    /**
     * 예상 출력값
     */
    expect: string;

    /**
     * 실제 출력값
     */
    actual: string;
};
