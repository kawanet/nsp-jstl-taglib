import type {NSP} from "nsp-server-pages";

/**
 * c
 * uri: http://java.sun.com/jsp/jstl/core
 *
 * JSTL 1.2 core library
 */
export declare namespace JstlC {
    type cTags = {
        catch: NSP.TagFn<CatchTagAttr>;
        choose: NSP.TagFn<ChooseTagAttr>;
        if: NSP.TagFn<IfTagAttr>;
        import: NSP.TagFn<ImportTagAttr>;
        forEach: NSP.TagFn<ForEachTagAttr>;
        forTokens: NSP.TagFn<ForTokensTagAttr>;
        out: NSP.TagFn<OutTagAttr>;
        otherwise: NSP.TagFn<OtherwiseTagAttr>;
        param: NSP.TagFn<ParamTagAttr>;
        redirect: NSP.TagFn<RedirectTagAttr>;
        remove: NSP.TagFn<RemoveTagAttr>;
        set: NSP.TagFn<SetTagAttr>;
        url: NSP.TagFn<UrlTagAttr>;
        when: NSP.TagFn<WhenTagAttr>;
    };

    /**
     * <c:catch>
     * org.apache.taglibs.standard.tag.common.core.CatchTag
     *
     * @description
     * Catches any Throwable that occurs in its body and optionally
     * exposes it.
     */
    interface CatchTagAttr {
        /**
         * Name of the exported scoped variable for the
         * exception thrown from a nested action. The type of the
         * scoped variable is the type of the exception thrown.
         */
        var?: string;
    }

    /**
     * <c:choose>
     * org.apache.taglibs.standard.tag.common.core.ChooseTag
     *
     * @description
     * Simple conditional tag that establishes a context for
     * mutually exclusive conditional operations, marked by
     * <when> and <otherwise>
     */
    interface ChooseTagAttr {
    }

    /**
     * <c:if>
     * org.apache.taglibs.standard.tag.rt.core.IfTag
     *
     * @description
     * Simple conditional tag, which evalutes its body if the
     * supplied condition is true and optionally exposes a Boolean
     * scripting variable representing the evaluation of this condition
     */
    interface IfTagAttr {
        /**
         * The test condition that determines whether or
         * not the body content should be processed.
         */
        test: string;

        /**
         * Name of the exported scoped variable for the
         * resulting value of the test condition. The type
         * of the scoped variable is Boolean.
         */
        var?: string;

        /**
         * Scope for var.
         */
        scope?: string;
    }

    /**
     * <c:import>
     * org.apache.taglibs.standard.tag.rt.core.ImportTag
     *
     * @description
     * Retrieves an absolute or relative URL and exposes its contents
     * to either the page, a String in 'var', or a Reader in 'varReader'.
     */
    interface ImportTagAttr {
        /**
         * The URL of the resource to import.
         */
        url: string;

        /**
         * Name of the exported scoped variable for the
         * resource's content. The type of the scoped
         * variable is String.
         */
        var?: string;

        /**
         * Scope for var.
         */
        scope?: string;

        /**
         * Name of the exported scoped variable for the
         * resource's content. The type of the scoped
         * variable is Reader.
         */
        varReader?: string;

        /**
         * Name of the context when accessing a relative
         * URL resource that belongs to a foreign
         * context.
         */
        context?: string;

        /**
         * Character encoding of the content at the input
         * resource.
         */
        charEncoding?: string;
    }

    /**
     * <c:forEach>
     * org.apache.taglibs.standard.tag.rt.core.ForEachTag
     *
     * @description
     * The basic iteration tag, accepting many different
     * collection types and supporting subsetting and other
     * functionality
     */
    interface ForEachTagAttr {
        /**
         * Collection of items to iterate over.
         */
        items?: any[];

        /**
         * If items specified:
         * Iteration begins at the item located at the
         * specified index. First item of the collection has
         * index 0.
         * If items not specified:
         * Iteration begins with index set at the value
         * specified.
         */
        begin?: string;

        /**
         * If items specified:
         * Iteration ends at the item located at the
         * specified index (inclusive).
         * If items not specified:
         * Iteration ends when index reaches the value
         * specified.
         */
        end?: string;

        /**
         * Iteration will only process every step items of
         * the collection, starting with the first one.
         */
        step?: string;

        /**
         * Name of the exported scoped variable for the
         * current item of the iteration. This scoped
         * variable has nested visibility. Its type depends
         * on the object of the underlying collection.
         */
        var?: string;

        /**
         * Name of the exported scoped variable for the
         * status of the iteration. Object exported is of type
         * javax.servlet.jsp.jstl.core.LoopTagStatus. This scoped variable has nested
         * visibility.
         */
        varStatus?: string;
    }

    /**
     * <c:forTokens>
     * org.apache.taglibs.standard.tag.rt.core.ForTokensTag
     *
     * @description
     * Iterates over tokens, separated by the supplied delimeters
     */
    interface ForTokensTagAttr {
        /**
         * String of tokens to iterate over.
         */
        items: string;

        /**
         * The set of delimiters (the characters that
         * separate the tokens in the string).
         */
        delims: string;

        /**
         * Iteration begins at the token located at the
         * specified index. First token has index 0.
         */
        begin?: string;

        /**
         * Iteration ends at the token located at the
         * specified index (inclusive).
         */
        end?: string;

        /**
         * Iteration will only process every step tokens
         * of the string, starting with the first one.
         */
        step?: string;

        /**
         * Name of the exported scoped variable for the
         * current item of the iteration. This scoped
         * variable has nested visibility.
         */
        var?: string;

        /**
         * Name of the exported scoped variable for the
         * status of the iteration. Object exported is of
         * type
         * javax.servlet.jsp.jstl.core.LoopTag
         * Status. This scoped variable has nested
         * visibility.
         */
        varStatus?: string;
    }

    /**
     * <c:out>
     * org.apache.taglibs.standard.tag.rt.core.OutTag
     *
     * @description
     * Like <%= ... >, but for expressions.
     */
    interface OutTagAttr {
        /**
         * Expression to be evaluated.
         */
        value: string;

        /**
         * Default value if the resulting value is null.
         */
        default?: string;

        /**
         * Determines whether characters <,>,&,'," in the
         * resulting string should be converted to their
         * corresponding character entity codes. Default value is
         * true.
         */
        escapeXml?: string;
    }

    /**
     * <c:otherwise>
     * org.apache.taglibs.standard.tag.common.core.OtherwiseTag
     *
     * @description
     * Subtag of <choose> that follows <when> tags
     * and runs only if all of the prior conditions evaluated to
     * 'false'
     */
    interface OtherwiseTagAttr {
    }

    /**
     * <c:param>
     * org.apache.taglibs.standard.tag.rt.core.ParamTag
     *
     * @description
     * Adds a parameter to a containing 'import' tag's URL.
     */
    interface ParamTagAttr {
        /**
         * Name of the query string parameter.
         */
        name: string;

        /**
         * Value of the parameter.
         */
        value?: string;
    }

    /**
     * <c:redirect>
     * org.apache.taglibs.standard.tag.rt.core.RedirectTag
     *
     * @description
     * Redirects to a new URL.
     */
    interface RedirectTagAttr {
        /**
         * The URL of the resource to redirect to.
         */
        url?: string;

        /**
         * Name of the context when redirecting to a relative URL
         * resource that belongs to a foreign context.
         */
        context?: string;
    }

    /**
     * <c:remove>
     * org.apache.taglibs.standard.tag.common.core.RemoveTag
     *
     * @description
     * Removes a scoped variable (from a particular scope, if specified).
     */
    interface RemoveTagAttr {
        /**
         * Name of the scoped variable to be removed.
         */
        var: string;

        /**
         * Scope for var.
         */
        scope?: string;
    }

    /**
     * <c:set>
     * org.apache.taglibs.standard.tag.rt.core.SetTag
     *
     * @description
     * Sets the result of an expression evaluation in a 'scope'
     */
    interface SetTagAttr {
        /**
         * Name of the exported scoped variable to hold the value
         * specified in the action. The type of the scoped variable is
         * whatever type the value expression evaluates to.
         */
        var?: string;

        /**
         * Expression to be evaluated.
         */
        value?: string;

        /**
         * Target object whose property will be set. Must evaluate to
         * a JavaBeans object with setter property property, or to a
         * java.util.Map object.
         */
        target?: string;

        /**
         * Name of the property to be set in the target object.
         */
        property?: string;

        /**
         * Scope for var.
         */
        scope?: string;
    }

    /**
     * <c:url>
     * org.apache.taglibs.standard.tag.rt.core.UrlTag
     *
     * @description
     * Creates a URL with optional query parameters.
     */
    interface UrlTagAttr {
        /**
         * Name of the exported scoped variable for the
         * processed url. The type of the scoped variable is
         * String.
         */
        var?: string;

        /**
         * Scope for var.
         */
        scope?: string;

        /**
         * URL to be processed.
         */
        value?: string;

        /**
         * Name of the context when specifying a relative URL
         * resource that belongs to a foreign context.
         */
        context?: string;
    }

    /**
     * <c:when>
     * org.apache.taglibs.standard.tag.rt.core.WhenTag
     *
     * @description
     * Subtag of <choose> that includes its body if its
     * condition evalutes to 'true'
     */
    interface WhenTagAttr {
        /**
         * The test condition that determines whether or not the
         * body content should be processed.
         */
        test: string;
    }
}
