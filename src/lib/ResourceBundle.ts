import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import type {Locale} from "./Locale";

type Properties = { [key: string]: string };

export abstract class ResourceBundle implements JstlFmt.ResourceBundle {
    abstract getString(key: string): string;

    static isBundle = (v: any): v is JstlFmt.ResourceBundle => (v && "function" === typeof v.getString);

    static async getBundle(basename: string, locale: Locale, app: NSP.App): Promise<JstlFmt.ResourceBundle> {
        const resource = await app.process<Promise<JstlFmt.ResourceBundle | Properties[]>>("ResourceBundle.getBundle", basename, locale);

        if (Array.isArray(resource)) {
            return new PropertyResource(resource);
        }

        if (ResourceBundle.isBundle(resource)) {
            return resource;
        }

        if (resource) {
            throw new Error(`Invalid ResourceBundle for "${basename}"`);
        }
    }
}

class PropertyResource extends ResourceBundle {
    constructor(protected readonly properties: Properties[]) {
        super();
    }

    getString(key: string): string {
        for (const properties of this.properties) {
            if (key in properties) {
                return properties[key];
            }
        }
    }
}
