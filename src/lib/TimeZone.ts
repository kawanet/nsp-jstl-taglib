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

    protected abstract cdateFn(): cdate.cdate;

    getDisplayName(): string {
        return this.displayName;
    }

    getOffset(date: number | Date): number {
        return this.cdateFn()(date).utcOffset() * 60000;
    }
}

class TimeZoneByName extends TimeZone {
    cdateFn() {
        return cdate().tz(this.getDisplayName()).cdateFn();
    }
}

class TimeZoneByOffset extends TimeZone {
    cdateFn() {
        return cdate().utcOffset(this.getDisplayName()).cdateFn();
    }
}
