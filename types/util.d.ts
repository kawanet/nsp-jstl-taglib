export declare namespace JstlUtil {
    interface ResourceBundle {
        getKeys(): string[];

        getString(key: string): string;
    }

    interface TimeZone {
        getDisplayName(): string;

        getOffset(date: number | Date): number;
    }
}
