#!/usr/bin/env bash -c make

all: test-title types/index.d.ts esm/src/index.js cjs/src/index.js LICENSE

test: test-esm test-cjs

test-esm: all
	./node_modules/.bin/mocha esm/test/*.js

test-cjs: all
	./node_modules/.bin/mocha cjs/test/*.js

cjs/%.js: ./%.ts
	./node_modules/.bin/tsc -p tsconfig-cjs.json

esm/%.js: %.ts
	./node_modules/.bin/tsc -p tsconfig.json

types/index.d.ts: src/index.ts
	./node_modules/.bin/tsc --outDir tmp/ --declaration --emitDeclarationOnly src/index.ts
	perl -pe 's#(type \{) +(.*?) +(})#$$1$$2$$3#; s#( from ".)./types(/[a-z]+.)#$$1$$2#' < tmp/index.d.ts > types/index.d.ts
	/bin/rm -f tmp/*.d.ts

test-title:
	perl -i -pe '@f = split("/",$$ARGV); s#^const TITLE =.*#const TITLE = "$$f[-1]";#' ./test/*.ts

LICENSE:
	curl -so $@ https://raw.githubusercontent.com/apache/tomcat-taglibs-standard/main/LICENSE

clean:
	/bin/rm -fr ./esm/*/ ./cjs/*/ types/index.d.ts

.PHONY: all clean test
