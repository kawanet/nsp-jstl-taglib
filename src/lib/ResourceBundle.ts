import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import type {Locale} from "./Locale";

type Properties = { [key: string]: string };

export abstract class ResourceBundle implements JstlFmt.ResourceBundle {
    protected abstract handleGetObject(key: string): any;

    public abstract getKeys(): string[];

    static isBundle(v: any): v is JstlFmt.ResourceBundle {
        return (!!v && "function" === typeof v.handleGetObject && "function" === typeof v.getKeys);
    }

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

    getString(key: string): string {
        return this.handleGetObject(key);
    }
}

class PropertyResource extends ResourceBundle {
    constructor(protected readonly properties: Properties[]) {
        super();
    }

    handleGetObject(key: string) {
        for (const properties of this.properties) {
            if (key in properties) {
                return properties[key];
            }
        }
    }

    getKeys(): string[] {
        return Object.keys(this.properties[0]);
    }
}
