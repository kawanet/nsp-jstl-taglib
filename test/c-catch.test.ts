import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../index.js";

const TITLE = "c-catch.test.ts";

/**
 * <c:catch>
 */
describe(TITLE, () => {
    const nsp = createNSP({
        indent: 4,
    });

    nsp.hook("error", (e) => {
        throw e;
    });

    nsp.addTagLib({ns: "c", tag: cTags});

    nsp.addTagLib({
        ns: "test",
        tag: {
            throws: () => {
                return () => {
                    throw new Error("test error");
                }
            }
        }
    });

    type Context = { err?: Error };

    it("<c:catch>", async () => {
        const src = '[<c:catch var="err"><test:throws/></c:catch>]';

        const render = nsp.parse(src).toFn<Context>();

        const ctx: Context = {};

        const result = await render(ctx);

        assert.equal(result, "[]");

        assert.equal(ctx.err?.message, "test error");
    });
});
