import type {JstlFmt} from "../../index.js";
import type {NSP} from "nsp-server-pages";
import type {Locale} from "./Locale";

type Properties = { [key: string]: string };

export abstract class ResourceBundle implements JstlFmt.ResourceBundle {
    abstract getString(key: string): string;

    static isBundle = (v: any): v is JstlFmt.ResourceBundle => (v && "function" === typeof v.getString);

    static async getBundle(basename: string, locale: Locale, app: NSP.App): Promise<JstlFmt.ResourceBundle> {
        const resource = await app.process<Promise<JstlFmt.ResourceBundle | Properties>>("fmt:bundle", basename, locale);

        if (ResourceBundle.isBundle(resource)) {
            return resource;
        }

        if (resource && "object" === typeof resource) {
            return new PropertyResouce(resource);
        }
    }
}

class PropertyResouce extends ResourceBundle {
    constructor(protected readonly properties: Properties) {
        super();
    }

    getString(key: string): string {
        return this.properties[key];
    }
}
