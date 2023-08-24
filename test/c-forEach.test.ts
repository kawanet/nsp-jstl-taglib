import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../src/index.js";

const TITLE = "c-forEach.test.ts";

/**
 * <c:forEach>
 */
describe(TITLE, () => {
    const nsp = createNSP({indent: 4});

    nsp.addTagLib({ns: "c", tag: cTags});

    interface Item {
        name: string;
    }

    interface Context {
        list: Item[];
        item?: Item;
    }

    const ctx: Context = {
        list: [
            {name: "Foo"},
            {name: "Bar"},
            {name: "Buz"},
            {name: "Qux"},
            {name: "Quux"},
        ],
    };

    it('<c:forEach>', async () => {
        const src: string = '<c:forEach items="${list}" var="item">[${ item.name }]</c:forEach>';
        // console.warn(nsp.parse(src).toJS());
        assert.equal(nsp.parse(src).toFn()(ctx), "[Foo][Bar][Buz][Qux][Quux]");
    });

    it('<c:forEach begin="1">', async () => {
        const src: string = '<c:forEach items="${list}" var="item" begin="1" end="3" step="2">[${ item.name }]</c:forEach>';
        // console.warn(nsp.parse(src).toJS());
        assert.equal(nsp.parse(src).toFn()(ctx), "[Bar][Qux]");
    });

    it('<c:forEach varStatus="status">', async () => {
        const src: string = '<c:forEach items="${list}" varStatus="status" begin="1" end="3" step="2">[${ status.index }]</c:forEach>';
        // console.warn(nsp.parse(src).toJS());
        assert.equal(nsp.parse(src).toFn()(ctx), "[1][3]");
    });
});
