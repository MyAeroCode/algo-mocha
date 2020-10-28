import { Service } from "typedi";
import { SupportLang, supportLangList } from "./lang";

@Service()
export class SupportLangService {
    /**
     * 에디터에서 지원하는 언어 목록을 배열 형태로 가져온다.
     */
    getList(): SupportLang[] {
        return Object.assign([], supportLangList);
    }

    /**
     * 주어진 언어 코드에 해당하는 언어의 이름을 가져온다.
     */
    getLangByCode(langCode: string): SupportLang {
        return supportLangList.find((lang) => lang.langCode === langCode)!;
    }
}
