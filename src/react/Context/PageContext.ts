/**
 * 선택된 페이지에 관한 컨텍스트.
 */
export type PageContext = {
    /**
     * 현재 선택된 페이지 인덱스.
     */
    page: number;
};

/**
 * 선택된 언어에 관한 컨텍스트의 기본 값
 */
export const defaultPageContext: PageContext = {
    page: 0,
};
