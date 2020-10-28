import { Service } from "typedi";
import { SupportLang } from ".";

@Service()
export class LangJavaScript implements SupportLang {
    langCode = "js";
    langName = "JavaScript";
    test() {
        return true;
    }
}
