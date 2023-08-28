import {strict as assert} from "assert";
import {promises as fs} from "fs";
import {createNSP} from "nsp-server-pages";
import {fmtTags} from "../index.js";

const TITLE = "fmt-jsp.test.ts";

const tweak = (str: string) => str?.replace(/￥/g, "¥");

describe(TITLE, () => {
    const nsp = createNSP({trimSpaces: false});

    nsp.addTagLib({ns: "fmt", tag: fmtTags});

    it("FormatDateTag", async () => {
        const render = await nsp.loadJSP("test/resources/fmt/FormatDateTag.jsp");
        const date = new Date("2023-04-05T06:07:08Z");
        const context = {date};
        const result = await render(context);
        const expected = await fs.readFile("test/resources/fmt/FormatDateTag.txt", "utf8");
        assert.equal(tweak(result), tweak(expected));
    });

    it("FormatNumberTag", async () => {
        const render = await nsp.loadJSP("test/resources/fmt/FormatNumberTag.jsp");
        const context = {};
        const result = await render(context);
        const expected = await fs.readFile("test/resources/fmt/FormatNumberTag.txt", "utf8");
        assert.equal(tweak(result), tweak(expected));
    });

    it("ParseNumberTag", async () => {
        const render = await nsp.loadJSP("test/resources/fmt/ParseNumberTag.jsp");
        const context = {};
        const result = await render(context);
        const expected = await fs.readFile("test/resources/fmt/ParseNumberTag.txt", "utf8");
        assert.equal(tweak(result), tweak(expected));
    });
});
