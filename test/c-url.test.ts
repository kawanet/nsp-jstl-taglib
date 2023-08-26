import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../index.js";

const TITLE = "c-url.test.ts";

interface Context {
    url?: string;
}

/**
 * <c:url>
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "c", tag: cTags});

    it("<c:url/>", async () => {
        const src: string = '[<c:url var="url" value="/foo"/>][${url}]';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();

        const ctx: Context = {}
        const result = await render(ctx);

        assert.equal(result, `[][/foo]`);
    });

    it("<c:url><c:param/></c:url>", async () => {
        const src: string = '[<c:url var="url" value="/foo?bar=BAR"><c:param name="buz" value="BUZ"/></c:url>][${url}]';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();

        const ctx: Context = {}
        const result = await render(ctx);

        assert.equal(result, `[][/foo?bar=BAR&buz=BUZ]`);
    });
});
