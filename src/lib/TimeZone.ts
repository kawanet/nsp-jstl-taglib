import {cdate} from "cdate";
import type {JstlUtil} from "../../index.js";

const isTimeZone = (tz: any): tz is JstlUtil.TimeZone => ("function" === typeof tz?.getDisplayName);

export abstract class TimeZone implements JstlUtil.TimeZone {
    protected displayName: string;

    static getTimeZone(id: string | JstlUtil.TimeZone): JstlUtil.TimeZone {
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
