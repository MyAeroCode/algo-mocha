import { Service } from "typedi";
import { SupportLang } from ".";

@Service()
export class LangCPP implements SupportLang {
    langCode = "cpp";
    langName = "C++";
    async test() {
        return true;
    }
}
