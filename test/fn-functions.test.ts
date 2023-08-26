/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {strict as assert} from "assert";
import {fnFunctions} from "../index.js";

const TITLE = "fn-functions.test.ts";

const {
    // contains,
    // containsIgnoreCase,
    // startsWith,
    endsWith,
    substring,
    substringAfter,
    substringBefore,
    escapeXml,
    // trim,
    replace,
    split,
    join,
    length,
} = fnFunctions;

const Assert = {
    assertTrue: (value: boolean, message?: string) => assert.equal(value, true, message),
    assertEquals: (expected: any, actual: any, message?: string) => assert.equal(actual, expected, message),
    assertArrayEquals: (expected: any[], actual: any[], message?: string) => assert.deepEqual(actual, expected, message),
};

/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/test/java/org/apache/taglibs/standard/functions/FunctionsTest.java
 */

describe(TITLE, () => {
    it("testEndsWith", () => {
        Assert.assertTrue(endsWith("00", "0")); // verify bug 50057 was fixed
    });

    it("testSubstring", () => {
        Assert.assertEquals("el", substring("Hello", 1, 3));
        Assert.assertEquals("", substring("Hello", 10, 0));
        Assert.assertEquals("He", substring("Hello", -1, 2));
        Assert.assertEquals("Hello", substring("Hello", -4, -1));
        Assert.assertEquals("ello", substring("Hello", 1, -1));
        Assert.assertEquals("ello", substring("Hello", 1, 10));
        Assert.assertEquals("", substring("Hello", 3, 1));
        Assert.assertEquals("", substring("Hello", 10, 6));
        Assert.assertEquals("Hello", substring("Hello", -1, -4));
    });


    it("testSubstringAfter", () => {
        Assert.assertEquals("lo", substringAfter("Hello", "el"));
        Assert.assertEquals("", substringAfter("", "el"));
        Assert.assertEquals("Hello", substringAfter("Hello", ""));
        Assert.assertEquals("", substringAfter("", "lx"));
        Assert.assertEquals("lo All", substringAfter("Hello All", "l"));
    });

    it("testSubstringBefore", () => {
        Assert.assertEquals("H", substringBefore("Hello", "el"));
        Assert.assertEquals("", substringBefore("", "el"));
        Assert.assertEquals("", substringBefore("Hello", ""));
        Assert.assertEquals("", substringBefore("", "lx"));
        Assert.assertEquals("He", substringBefore("Hello All", "l"));
    });

    it("testReplace", () => {
        Assert.assertEquals("Hxxlo", replace("Hello", "el", "xx"), "#1");
        Assert.assertEquals("Hexxxxo", replace("Hello", "l", "xx"), "#2");
        Assert.assertEquals("", replace("", "l", "xx"), "#3");
        Assert.assertEquals("Heo", replace("Hello", "l", ""), "#4");
        Assert.assertEquals("Hello", replace("Hello", "", "xx"), "#5");
        Assert.assertEquals("Hellllo", replace("Hello", "l", "ll"), "#6");
        Assert.assertEquals("Hello", replace("Hello", "x", "ll"), "#7");
    });

    it("testSplit", () => {
        Assert.assertArrayEquals(["a", "b", "c"], split("a:b:c", ":"), "#1");
        Assert.assertArrayEquals(["a", "b", "c"], split("a:b/c", ":/"), "#2");
        Assert.assertArrayEquals(["a", "b", "c"], split("a:b/c", "/:"), "#3");
        Assert.assertArrayEquals(["a", "b"], split("a:b:", ":"), "#4");
        Assert.assertArrayEquals(["a:b:c"], split("a:b:c", "x"), "#5");
        Assert.assertArrayEquals([""], split("", ""), "#6");
        Assert.assertArrayEquals([""], split("", ":"), "#7");
        Assert.assertArrayEquals(["Hello"], split("Hello", ""), "#8");
    });

    it("testJoin", () => {
        Assert.assertEquals("a:b:c", join(["a", "b", "c"], ":"), "#1");
        Assert.assertEquals("abc", join(["a", "b", "c"], ""), "#2");
        Assert.assertEquals("axxbxxc", join(["a", "b", "c"], "xx"), "#3");
        Assert.assertEquals("", join(null, ""), "#4");
        Assert.assertEquals("", join([], ":"), "#5");
        Assert.assertEquals("a:null:c", join(["a", null, "c"], ":"), "#6");
        Assert.assertEquals("a", join(["a"], ":"), "#7");
        Assert.assertEquals("null", join([null], ":"), "#8");
    });

    it("testLength", () => {
        Assert.assertEquals(0, length(null));
        Assert.assertEquals(0, length(""));
        Assert.assertEquals(3, length([1, 2, 3]));
    });

    it("testEscapeXML", () => {
        Assert.assertEquals("Hello", escapeXml("Hello"));
        // Assert.assertEquals("&lt;Hello msg=&#034;world&#034;/&gt;", escapeXml("<Hello msg=\"world\"/>"));
        Assert.assertEquals("&lt;Hello msg=&quot;world&quot;/&gt;", escapeXml("<Hello msg=\"world\"/>"));
        // Assert.assertEquals("&lt;Hello msg=&#039;world&#039;/&gt;", escapeXml("<Hello msg='world'/>"));
        Assert.assertEquals("&lt;Hello msg=&apos;world&apos;/&gt;", escapeXml("<Hello msg='world'/>"));
        Assert.assertEquals("cats &amp; dogs", escapeXml("cats & dogs"));
    });
});
