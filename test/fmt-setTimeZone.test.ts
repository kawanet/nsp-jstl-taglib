import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {fmtTags} from "../index.js";
import type {TimeZone} from "../src/lib/TimeZone.js";

const TITLE = "fmt-setTimeZone.test.ts";

interface Context {
    utc: Date;
    tz?: string;
    tzObj?: TimeZone;
}

/**
 * <fmt:setTimeZone>
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "fmt", tag: fmtTags});

    const ctx: Context = {
        utc: new Date("2023-04-05T06:07:08Z"),
    };

    it('<fmt:setTimeZone value="xxx"/>', async () => {
        const src: string = '<fmt:setTimeZone value="${tz}" var="tzObj"/>[<fmt:formatDate value="${utc}" pattern="yyyy-MM-dd HH:mm:ss" timeZone="${tzObj}"/>]';
        const render = nsp.parse(src).toFn<Context>();

        let tz: string;
        let expected: string;

        ctx.tz = tz = "GMT";
        expected = "[2023-04-05 06:07:08]";
        assert.equal(await render(ctx), expected, tz);

        ctx.tz = tz = "GMT+00:00";
        expected = "[2023-04-05 06:07:08]";
        assert.equal(await render(ctx), expected, tz);

        ctx.tz = tz = "Asia/Tokyo";
        expected = "[2023-04-05 15:07:08]";
        assert.equal(await render(ctx), expected, tz);

        ctx.tz = tz = "GMT+12:00";
        expected = "[2023-04-05 18:07:08]";
        assert.equal(await render(ctx), expected, tz);

        ctx.tz = tz = "GMT-12:00";
        expected = "[2023-04-04 18:07:08]";
        assert.equal(await render(ctx), expected, tz);
    });

    it('<fmt:setTimeZone/> without value', async () => {
        const src: string = '<fmt:setTimeZone var="tzObj"/>[<fmt:formatDate value="${utc}" pattern="yyyy-MM-dd HH:mm:ss" timeZone="${tzObj}"/>]';
        const render = nsp.parse(src).toFn<Context>();

        const expected = "[2023-04-05 06:07:08]";
        assert.equal(await render(ctx), expected);
    });
});
