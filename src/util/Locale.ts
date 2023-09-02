import type {JstlUtil} from "../../index.js";

export class Locale implements JstlUtil.Locale {
    constructor(public language: string, public country: string, public variant: string) {
        //
    }

    getLanguage(): string {
        return this.language;
    }

    getCountry(): string {
        return this.country;
    }

    getVariant(): string {
        return this.variant;
    }
}
