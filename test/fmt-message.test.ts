import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {fmtTags, JstlFmt} from "../src/index.js";

const TITLE = "fmt-message.test.ts";

interface Context {
    basename?: string;
    key?: string;
}

/**
 * <fmt:message>
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "fmt", tag: fmtTags});

    const propFoo: JstlFmt.Properties = {
        "only.foo": "FOO",
        "item.name": "Foo",
    };

    const propBar: JstlFmt.Properties = {
        "only.bar": "BAR",
        "item.name": "Bar",
    };

    const props = {
        foo: propFoo,
        bar: propBar,
    };

    nsp.hook("fmt:bundle", (name: string) => props[name as keyof typeof props]);

    /**
     * @example
     * <fmt:setBundle basename="bundled" var="bundled"/>
     * <fmt:message key="key" bundle="${bundled}"/>
     */
    it('<fmt:message bundle="..."/>', async () => {
        const src: string = '[<fmt:setBundle basename="${basename}" var="bundled"/>][<fmt:message key="item.name" bundle="${bundled}"/>]';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render({basename: "foo"}), `[][Foo]`);
        assert.equal(await render({basename: "bar"}), `[][Bar]`);
    });

    /**
     * @example
     * <fmt:setBundle basename="messages" var="bundled"/>
     * <fmt:message key="key" var="bundled"/>
     */
    it('<fmt:message var="..."/>', async () => {
        const src: string = '[<fmt:setBundle basename="${basename}" var="bundled"/>][<fmt:message key="item.name" var="bundled"/>]';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render({basename: "foo"}), `[][Foo]`);
        assert.equal(await render({basename: "bar"}), `[][Bar]`);
    });

    /**
     * @example
     * <fmt:bundle basename="messages"/>
     * <fmt:message key="key"/>
     * </fmt:bundle>
     */
    it('<fmt:bundle><fmt:message/></fmt:bundle>', async () => {
        const src: string = '<fmt:bundle basename="${basename}">[<fmt:message key="item.name"/>]</fmt:bundle>';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render({basename: "foo"}), `[Foo]`);
        assert.equal(await render({basename: "bar"}), `[Bar]`);
    });

    /**
     * @example
     * <fmt:bundle basename="messages"/>
     * <fmt:message key="key"/>
     * </fmt:bundle>
     */
    it('<fmt:bundle><fmt:bundle><fmt:message/></fmt:bundle></fmt:bundle>', async () => {
        const src: string = '<fmt:bundle basename="foo"><fmt:bundle basename="bar">[<fmt:message key="${key}"/>]</fmt:bundle></fmt:bundle>';
        // console.warn(nsp.parse(src).toJS());
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render({key: "item.name"}), `[Bar]`);
        assert.equal(await render({key: "only.bar"}), `[BAR]`);
        assert.equal(await render({key: "only.foo"}), `[FOO]`);
    });

    /**
     * when undefined key given
     */
    it('<fmt:message key="undefined"/>', async () => {
        const src: string = '[<fmt:message key="undefined"/>]';
        const render = nsp.parse(src).toFn<Context>();
        assert.equal(await render({}), `[???undefined???]`);
    });
});
