import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags, fmtTags, fnFunctions} from "../index.js";

const TITLE = "synopsis.test.ts";

describe(TITLE, () => {
    it("SYNOPSIS", async () => {
        const nsp = createNSP();

        nsp.addTagLib({ns: "c", tag: cTags});
        nsp.addTagLib({ns: "fmt", tag: fmtTags});
        nsp.addTagLib({ns: "fn", fn: fnFunctions});

        const context = {title: "nsp", upper: true};

        const render = await nsp.loadJSP("test/resources/synopsis1.jsp");

        const html = await render(context);

        assert.equal(html.trim(), `<h1>NSP</h1>`);
    });
});
