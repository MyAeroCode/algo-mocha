import { TestCase } from "./TestCaseContext";

/**
 * 테스트 하나의 결과
 */
export type TestResult = TestCase & {
    /**
     * 실행된 값
     */
    actual: string;
};

/**
 * 가장 최근에 수행된 테스트 결과에 대한 문맥
 */
export type TestResultsContext = {
    /**
     * 가장 최근에 수행된 테스트 결과
     */
    testResults: TestResult[];
};

/**
 * 테스트 결과 예제
 */
export function getDefaultTestResult(): TestResult {
    return {
        input: "This is Input",
        expect: "This is Expect",
        actual: "This is Actual",
    };
}

/**
 * 가장 최근에 수행된 테스트 결과에 대한 문맥의 기본값
 */
export const defaultTestResultsContext: TestResultsContext = {
    testResults: [getDefaultTestResult()],
};
