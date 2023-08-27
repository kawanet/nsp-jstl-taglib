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

    const src: string = '<fmt:setLocale value="${locale}"/>[<fmt:formatDate value="${date}" type="both" timeZone="GMT"/>]';
    const render = nsp.parse(src).toFn<Context>();

    it("en", async () => {
        ctx.locale = "en";
        assert.equal(await render(ctx), "[Wed, Apr 5, 2023, 06:07:08 AM]");
    });

    it("es", async () => {
        ctx.locale = "es";
        assert.equal(await render(ctx), "[mié, 5 abr 2023, 06:07:08]");
    });

    it("fr", async () => {
        ctx.locale = "fr";
        assert.equal(await render(ctx), "[mer. 5 avr. 2023, 06:07:08]");
    });

    it("de", async () => {
        ctx.locale = "de";
        assert.equal(await render(ctx), "[Mi., 5. Apr. 2023, 06:07:08]");
    });

    it("ja", async () => {
        ctx.locale = "ja";
        assert.equal(await render(ctx), "[2023年4月5日(水) 06:07:08]");
    });
});
