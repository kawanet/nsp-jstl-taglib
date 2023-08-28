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
        getLanguage(): string;

        getCountry(): string;

        getVariant(): string;
    }

    interface LoopTagStatus<T> {
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
