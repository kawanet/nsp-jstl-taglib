import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../src/index.js";

const TITLE = "c-remove.ts";

/**
 * <c:remove>
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "c", tag: cTags});

    type Context = { foo?: string };

    it("<c:remove>", async () => {
        const src: string = '[<c:remove var="foo"/>]';
        // console.warn(nsp.parseJSP(src).toJS());
        const fn = nsp.parse(src).toFn<Context>();

        const ctx: Context = {foo: "FOO"};

        assert.equal(ctx.foo, "FOO", "before");
        fn(ctx);
        assert.equal(ctx.foo, undefined, "after");
    });
});
