# nsp-jstl-taglib

[![Node.js CI](https://github.com/kawanet/nsp-jstl-taglib/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/kawanet/nsp-jstl-taglib/actions/)
[![npm version](https://img.shields.io/npm/v/nsp-jstl-taglib)](https://www.npmjs.com/package/nsp-jstl-taglib)

[NSP](https://github.com/kawanet/nsp-server-pages) taglib for JSTL Jakarta Standard Tag Library

- JSTL core library - e.g. `<c:if test="${test}"></c:if>`
- JSTL formatting library - e.g. `<fmt:formatDate value="${date}" pattern="yyyy-MM-dd"/>`
- JSTL functions library - e.g. `${ fn:toUpperCase("abc") }`
- See [TypeScript declaration files](https://github.com/kawanet/nsp-jstl-taglib/blob/main/types/) for API detail.

## SYNOPSIS

```js
import {createNSP} from "nsp-server-pages";
import {cTags, fmtTags, fnFunctions} from "nsp-jstl-taglib";

const nsp = createNSP();

nsp.addTagLib({ns: "c", tag: cTags});
nsp.addTagLib({ns: "fmt", tag: fmtTags});
nsp.addTagLib({ns: "fn", fn: fnFunctions});

const context = {title: "nsp", upper: true};

const render = await nsp.loadJSP("path/to/template.jsp");

const html = await render(context);

console.log(html);
// => <h1>NSP</h1>
```

```html

<c:if test="${upper}">
  <h1>
    <c:out value="${fn:toUpperCase(title)}" default="Untitled"/>
  </h1>
</c:if>
```

## COMMONJS

- Both ES Modules and CommonJS supported.

```js
const {createNSP} = require("nsp-server-pages");
const {cTags, fmtTags, fnFunctions} = require("nsp-jstl-taglib");
```

## COMPATIBILITY

### JSTL core library

| tag             | status | note                                             |
|-----------------|--------|--------------------------------------------------|
| `<c:choose>`    | 👍 OK  |                                                  |
| `<c:if>`        | 👍 OK  |                                                  |
| `<c:import>`    | 👍 OK  |                                                  |
| `<c:forEach>`   | 👍 OK  |                                                  |
| `<c:forTokens>` | 👍 OK  |                                                  |
| `<c:out>`       | 👍 OK  |                                                  |
| `<c:otherwise>` | 👍 OK  |                                                  |
| `<c:param>`     | 👍 OK  |                                                  |
| `<c:redirect>`  | 🚫 N/A | not available by design                          |
| `<c:remove>`    | 👍 OK  |                                                  |
| `<c:set>`       | 👍 OK  |                                                  |
| `<c:url>`       | 👍 OK  |                                                  |
| `<c:when>`      | 👍 OK  |                                                  |

`scope="xxx"` attribute is just ignored as nsp supports only `request` scope.

### JSTL formatting library

| tag                     | status     | note                                      |
|-------------------------|------------|-------------------------------------------|
| `<fmt:requestEncoding>` | 👍 OK      |                                           |
| `<fmt:setLocale>`       | 👍 OK      |                                           |
| `<fmt:timeZone>`        | 👍 OK      |                                           |
| `<fmt:setTimeZone>`     | 👍 OK      |                                           |
| `<fmt:bundle>`          | 👍 OK      | implement `ResourceBundle.getBundle` hook |
| `<fmt:setBundle>`       | 👍 OK      | implement `ResourceBundle.getBundle` hook |
| `<fmt:message>`         | 👍 OK      |                                           |
| `<fmt:param>`           | 👍 OK      |                                           |
| `<fmt:formatNumber>`    | 👍 OK      | works mostly. some feature still missing  |
| `<fmt:parseNumber>`     | 🕑 Not yet |                                           |
| `<fmt:formatDate>`      | 👍 OK      | works mostly. some feature still missing  |
| `<fmt:parseDate>`       | 🕑 Not yet |                                           |

Implement `ResourceBundle.getBundle` hook which returns an array of key-value pair properties.
The hook is called by `<fmt:bundle>` and `<fmt:setBundle>` tags.

```js
const nsp = createNSP();

nsp.hook("ResourceBundle.getBundle", async (basename) => {
    const properties = {"key": "value"};
    return [properties];
});
```

### JSTL functions library

| function                       | status | equivalant method    |
|--------------------------------|--------|----------------------|
| `${ fn:contains() }`           | 👍 OK  | `String#includes`    |
| `${ fn:containsIgnoreCase() }` | 👍 OK  |                      |
| `${ fn:endsWith() }`           | 👍 OK  | `String#endsWith`    |
| `${ fn:escapeXml() }`          | 👍 OK  |                      |
| `${ fn:indexOf() }`            | 👍 OK  | `String#indexOf`     |
| `${ fn:join() }`               | 👍 OK  | `Array#join`         |
| `${ fn:length() }`             | 👍 OK  |                      |
| `${ fn:replace() }`            | 👍 OK  | `String#replace`     |
| `${ fn:split() }`              | 👍 OK  | `String#split`       |
| `${ fn:startsWith() }`         | 👍 OK  | `String#startsWith`  |
| `${ fn:substring() }`          | 👍 OK  | `String#substring`   |
| `${ fn:substringAfter() }`     | 👍 OK  |                      |
| `${ fn:substringBefore() }`    | 👍 OK  |                      |
| `${ fn:toLowerCase() }`        | 👍 OK  | `String#toLowerCase` |
| `${ fn:toUpperCase() }`        | 👍 OK  | `String#toUpperCase` |
| `${ fn:trim() }`               | 👍 OK  | `String#trim`        |

## LINKS

- https://github.com/kawanet/nsp-server-pages
- https://github.com/kawanet/nsp-jstl-taglib
- https://github.com/kawanet/nsp-struts1-taglib
- https://www.npmjs.com/package/nsp-jstl-taglib
- https://github.com/apache/tomcat-taglibs-standard/
- https://github.com/apache/tomcat-taglibs-standard/tree/main/impl/src/main/java/org/apache/taglibs/standard
- https://github.com/apache/tomcat-taglibs-standard/tree/main/impl/src/main/resources/META-INF

## LICENSE

```js
// SPDX-License-Identifier: Apache-2.0
```
