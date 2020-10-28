import { Service } from "typedi";
import { SupportLang } from ".";

@Service()
export class LangTypeScript implements SupportLang {
    langCode = "ts";
    langName = "TypeScript";
    test() {
        return true;
    }
}
