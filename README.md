# nsp-jstl-taglib

[![Node.js CI](https://github.com/kawanet/nsp-jstl-taglib/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/kawanet/nsp-jstl-taglib/actions/)
[![npm version](https://img.shields.io/npm/v/nsp-jstl-taglib)](https://www.npmjs.com/package/nsp-jstl-taglib)

[NSP](https://github.com/kawanet/nsp-server-pages) taglib for JSTL Jakarta Standard Tag Library

- JSTL core library - e.g. `<c:if test="${test}"></c:if>`
- JSTL formatting library - e.g. `<fmt:formatDate value="${date}" pattern="yyyy-MM-dd"/>`
- JSTL functions library - e.g. `${fn:toUpperCase("abc")}`
- See [TypeScript declaration files](https://github.com/kawanet/nsp-jstl-taglib/blob/main/types/) for API detail.

## SYNOPSIS

```js
import {createNSP} from "nsp-server-pages";
import {cTags, fmtTags, fnFunctions} from "nsp-jstl-taglib";

const nsp = createNSP();

nsp.addTagLib({ns: "c", tag: cTags});
nsp.addTagLib({ns: "fn", fn: fnFunctions});
nsp.addTagLib({ns: "fmt", tag: fmtTags});

const render = await nsp.loadJSP("template.jsp");

console.log(await render({title: "nsp", upper: true}));
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

## LINKS

- https://github.com/kawanet/nsp-server-pages
- https://github.com/kawanet/nsp-struts1-taglib
- https://github.com/kawanet/nsp-jstl-taglib
- https://www.npmjs.com/package/nsp-jstl-taglib
- https://github.com/apache/tomcat-taglibs-standard/
- https://github.com/apache/tomcat-taglibs-standard/tree/main/impl/src/main/java/org/apache/taglibs/standard
- https://github.com/apache/tomcat-taglibs-standard/tree/main/impl/src/main/resources/META-INF

## LICENSE

```js
// SPDX-License-Identifier: Apache-2.0
```
