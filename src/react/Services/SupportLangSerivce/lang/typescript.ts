import { Service } from "typedi";
import { SupportLang } from ".";

@Service()
export class LangTypeScript implements SupportLang {
    langCode = "ts";
    langName = "TypeScript";
    async test() {
        return true;
    }
}
