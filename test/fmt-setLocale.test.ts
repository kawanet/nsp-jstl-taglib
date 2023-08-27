import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {fmtTags} from "../index.js";

const TITLE = "fmt-setLocale.test.ts";

interface Context {
    date?: Date;
    locale?: string;
}

/**
 * <fmt:setTimeZone>
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "fmt", tag: fmtTags});

    const ctx: Context = {
        date: new Date("2023-04-05T06:07:08Z"),
    };

    const src: string = '<fmt:setLocale value="${locale}"/>[<fmt:formatDate value="${date}" pattern="MMMM" timeZone="GMT"/>]';
    const render = nsp.parse(src).toFn<Context>();

    it("en", async () => {
        ctx.locale = "en";
        assert.equal(await render(ctx), "[April]");
    });

    it("es", async () => {
        ctx.locale = "es";
        assert.equal(await render(ctx), "[abril]");
    });

    it("fr", async () => {
        ctx.locale = "fr";
        assert.equal(await render(ctx), "[avril]");
    });

    it("it", async () => {
        ctx.locale = "it";
        assert.equal(await render(ctx), "[aprile]");
    });

    it("ja", async () => {
        ctx.locale = "ja";
        assert.equal(await render(ctx), "[4月]");
    });
});
