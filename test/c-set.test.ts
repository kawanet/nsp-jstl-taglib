import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../src/index.js";

const TITLE = "c-set.test.ts";

/**
 * c:set
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "c", tag: cTags});

    it("set", async () => {
        type Context = { foo?: string };

        const src = '<c:set var="foo" value="FOO"/>[${foo}]';
        // console.warn(nsp.parseJSP(src).toJS());
        const fn = nsp.parse(src).toFn<Context>();

        assert.equal(fn({}), "[FOO]");
    });

    /**
     * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/standard-test/src/test/java/org/apache/taglibs/standard/tag/el/core/TestSetTag.java
     */
    it("TestSetTag", async () => {
        const context = {var1: null as string};

        const render = await nsp.loadJSP("test/resources/TestSetTag.jsp");
        const result = await render(context);

        assert.equal(result, "value1", "#1");
        assert.equal(context.var1, "value1", "#2");
    });
});
