/**
 * 단일 테스트 케이스
 */
export type TestCase = {
    /**
     * 입력 값.
     */
    input: string;

    /**
     * 출력 값.
     */
    expect: string;
};

/**
 * 기본 테스트 케이스
 */
export function getDefaultTestCase(): TestCase {
    return {
        input: "Write here your input.",
        expect: "Write here your output.",
    };
}

/**
 * 현재 참조중인 테스트 케이스에 관한 문맥
 */
export type TestCaseContext = {
    /**
     * 현재 참조중인 테스트 케이스 목록
     */
    testCases: TestCase[];
};

/**
 * 선택된 언어에 관한 컨텍스트의 기본 값
 */
export const defaultTestCaseContext: TestCaseContext = {
    testCases: [getDefaultTestCase()],
};
