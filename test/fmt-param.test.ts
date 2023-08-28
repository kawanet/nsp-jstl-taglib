import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {fmtTags, JstlFmt} from "../index.js";

const TITLE = "fmt-param.test.ts";

type Properties = { [key: string]: string };

interface Context {
    //
}

/**
 * <fmt:param>
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "fmt", tag: fmtTags});

    const propFoo: Properties = {
        "info": "This is {0}. That is {1}. They are {0}-{1}s.",
    };

    const props: { [key: string]: Properties[] } = {
        foo: [propFoo],
    };

    (nsp as JstlFmt.Hooks).hook("ResourceBundle.getBundle", async (baseName) => props[baseName]);

    it('<fmt:param/>', async () => {
        const src: string = '<fmt:bundle basename="foo">[<fmt:message key="info"><fmt:param value="Foo"/><fmt:param value="Bar"/></fmt:message>]</fmt:bundle>';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render({}), "[This is Foo. That is Bar. They are Foo-Bars.]");
    });
});
