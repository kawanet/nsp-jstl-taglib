export class Locale {
    constructor(protected language: string, protected country: string, protected variant: string) {
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
