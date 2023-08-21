import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags, fmtTags, fnFunctions} from "../src/index.js";

const TITLE = "synopsis.test.ts";

describe(TITLE, () => {
    it("SYNOPSIS", async () => {
        const nsp = createNSP();

        nsp.addTagLib({ns: "c", tag: cTags});
        nsp.addTagLib({ns: "fn", fn: fnFunctions});
        nsp.addTagLib({ns: "fmt", tag: fmtTags});

        const render = await nsp.loadJSP("test/resources/synopsis1.jsp");

        const result = await render({title: "nsp", upper: true});

        assert.equal(result.trim(), `<h1>NSP</h1>`);
    });
});
