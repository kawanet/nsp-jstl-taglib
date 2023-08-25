import {cdate} from "cdate";

export abstract class TimeZone {
    protected displayName: string;

    static getTimeZone(id: string): TimeZone {
        if (/^GMT|^(?:GMT)?([+-])(\d+)(?::(\d+))?/.test(id)) {
            return new TimeZoneByOffset(id);
        } else {
            return new TimeZoneByName(id);
        }
    }

    constructor(id: string) {
        this.displayName = id;
    }

    cdate(dt: number | Date | string): cdate.CDate {
        return this.cdateFn()(dt);
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
