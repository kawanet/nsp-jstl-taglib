import {strict as assert} from "assert";
import {TimeZone} from "../src/lib/TimeZone.js";

const TITLE = "lib-timezone.test.ts";

const H = 3600 * 1000;

describe(TITLE, () => {
    it("GMT", async () => {
        const tz = TimeZone.getTimeZone("GMT");
        assert.equal(tz.getDisplayName(), "GMT");

        const dt = new Date("2023-04-05T06:07:08Z");
        assert.equal(tz.getOffset(dt), 0 * H);
    });

    it("GMT+09:00", async () => {
        const tz = TimeZone.getTimeZone("GMT+09:00");
        assert.equal(tz.getDisplayName(), "GMT+09:00");

        const dt = new Date("2023-04-05T06:07:08Z");
        assert.equal(tz.getOffset(dt), 9 * H);
    });

    it("Asia/Tokyo", async () => {
        const tz = TimeZone.getTimeZone("Asia/Tokyo");
        assert.equal(tz.getDisplayName(), "Asia/Tokyo");

        const dt = new Date("2023-04-05T06:07:08Z");
        assert.equal(tz.getOffset(dt), 9 * H);
    });

    it("America/Los_Angeles", async () => {
        const tz = TimeZone.getTimeZone("America/Los_Angeles");
        assert.equal(tz.getDisplayName(), "America/Los_Angeles");

        const dt = new Date("2023-04-05T06:07:08Z");
        assert.equal(tz.getOffset(dt), -7 * H);
    });
});
