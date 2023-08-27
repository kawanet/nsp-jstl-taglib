import {cdate} from "cdate";
import type {JstlFmt} from "../../index.js";

const isTimeZone = (tz: any): tz is JstlFmt.TimeZone => ("function" === typeof tz?.getDisplayName);

export abstract class TimeZone implements JstlFmt.TimeZone {
    protected displayName: string;

    static getTimeZone(id: string | JstlFmt.TimeZone): JstlFmt.TimeZone {
        if (isTimeZone(id)) {
            return id;
        } else if (/^GMT|^(?:GMT)?([+-])(\d+)(?::(\d+))?/.test(id)) {
            return new TimeZoneByOffset(id);
        } else {
            return new TimeZoneByName(id);
        }
    }

    constructor(id: string) {
        this.displayName = id;
    }

    getDisplayName(): string {
        return this.displayName;
    }

    abstract getOffset(date: number | Date): number ;
}

class TimeZoneByName extends TimeZone {
    getOffset(date: number | Date): number {
        return cdate(date).tz(this.getDisplayName()).utcOffset() * 60000;
    }
}

class TimeZoneByOffset extends TimeZone {
    getOffset(date: number | Date): number {
        return cdate(date).utcOffset(this.getDisplayName()).utcOffset() * 60000;
    }
}
