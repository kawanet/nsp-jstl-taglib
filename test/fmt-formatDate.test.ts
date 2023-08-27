import {strict as assert} from "assert";
import {cdate} from "cdate";
import {createNSP} from "nsp-server-pages";
import {fmtTags} from "../index.js";

const TITLE = "fmt-formatDate.test.ts";

interface Context {
    local: Date;
    utc: Date;
    tz?: string;
    pattern?: string;
}

/**
 * <fmt:formatDate>
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "fmt", tag: fmtTags});

    const ctx: Context = {
        local: new Date(2023, 3, 5, 6, 7, 8),
        utc: new Date("2023-04-05T06:07:08Z"),
    };

    it('type="DATE', async () => {
        const src: string = '[<fmt:formatDate value="${local}" type="DATE"/>]';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render(ctx), "[2023-04-05]");
    });

    it('type="TIME"', async () => {
        const src: string = '[<fmt:formatDate value="${local}" type="TIME"/>]';
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render(ctx), "[06:07:08]");
    });

    it('type="BOTH"', async () => {
        const src: string = '[<fmt:formatDate value="${local}" type="BOTH"/>]';
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render(ctx), "[Wed Apr  5 06:07:08 2023]");
    });

    it('pattern="yyyy-MM-dd hh:mm:ss"', async () => {
        const src: string = '[<fmt:formatDate value="${local}" pattern="yyyy-MM-dd hh:mm:ss"/>]';
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render(ctx), "[2023-04-05 06:07:08]");
    });

    it('timeZone="${tz}', async () => {
        const src: string = '[<fmt:formatDate value="${utc}" pattern="${pattern}" timeZone="${tz}"/>]';
        const render = nsp.parse(src).toFn<Context>();

        const {utc} = ctx;
        let tz: string;
        ctx.pattern = "yyyy-MM-dd'T'HH:mm:ssXXX";
        const fmt = "[%Y-%m-%dT%H:%M:%S%:z]";
        let expected: string;

        ctx.tz = tz = "GMT";
        expected = "[2023-04-05T06:07:08+00:00]";
        assert.equal(cdate().utc().cdateFn()(utc).text(fmt), expected, `utc()`);
        assert.equal(await render(ctx), expected, tz);

        ctx.tz = tz = "GMT+00:00";
        expected = "[2023-04-05T06:07:08+00:00]";
        assert.equal(cdate().utc().cdateFn()(utc).text(fmt), expected, `utc()`);
        assert.equal(await render(ctx), expected, tz);

        ctx.tz = tz = "Asia/Tokyo";
        expected = "[2023-04-05T15:07:08+09:00]";
        assert.equal(cdate().tz(tz).cdateFn()(utc).text(fmt), expected, `tz(${tz})`);
        assert.equal(await render(ctx), expected, tz);

        ctx.tz = tz = "GMT+12:00";
        expected = "[2023-04-05T18:07:08+12:00]";
        assert.equal(cdate().utcOffset(tz).cdateFn()(utc).text(fmt), expected, `utcOffset(${tz})`);
        assert.equal(await render(ctx), expected, tz);

        ctx.tz = tz = "GMT-12:00";
        expected = "[2023-04-04T18:07:08-12:00]";
        assert.equal(cdate().utcOffset(tz).cdateFn()(utc).text(fmt), expected, `utcOffset(${tz})`);
        assert.equal(await render(ctx), expected, tz);
    });
});
