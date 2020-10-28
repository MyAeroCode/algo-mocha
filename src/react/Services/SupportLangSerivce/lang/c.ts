import { Service } from "typedi";
import { SupportLang } from ".";

@Service()
export class LangC implements SupportLang {
    langCode = "c";
    langName = "C";
    test() {
        return true;
    }
}
