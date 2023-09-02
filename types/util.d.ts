export declare namespace JstlUtil {
    interface ResourceBundle {
        getKeys(): string[];

        getString(key: string): string;
    }

    interface TimeZone {
        getDisplayName(): string;

        getOffset(date: number | Date): number;
    }

    interface Locale {
        language: string;
        country: string;
        variant: string;

        getLanguage(): string;

        getCountry(): string;

        getVariant(): string;
    }

    interface LoopTagStatus<T> {
        current: T;
        index: number;
        count: number;
        begin: number;
        end: number;
        step: number;

        getCurrent(): T;

        getIndex(): number;

        getCount(): number;

        isFirst(): boolean;

        isLast(): boolean;

        getBegin(): number;

        getEnd(): number;

        getStep(): number;
    }
}
