import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../index.js";

const TITLE = "c-import.test.ts";

interface Context {
    //
}

/**
 * <c:import>
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "c", tag: cTags});

    nsp.mount("/", async (path) => {
        return (context: any) => {
            return JSON.stringify({path, context});
        }
    });

    it("<c:import/>", async () => {
        const src: string = '<c:import url="/foo"/>';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();

        const ctx: Context = {}
        const result = await render(ctx);

        assert.equal(result, `{"path":"/foo","context":{}}`);
    });

    it("<c:import><c:param/></c:import>", async () => {
        const src: string = '<c:import url="/foo?bar=BAR"><c:param name="buz" value="BUZ"/></c:import>';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();

        const ctx: Context = {}
        const result = await render(ctx);

        assert.equal(result, `{"path":"/foo","context":{"bar":"BAR","buz":"BUZ"}}`);
    });
});
