import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import type {Locale} from "./Locale";


export abstract class ResourceBundle implements JstlFmt.ResourceBundle {
    protected abstract handleGetObject(key: string): any;

    public abstract getKeys(): string[];

    protected parent: ResourceBundle = null;

    static isBundle(v: any): v is JstlFmt.ResourceBundle {
        return (!!v && "function" === typeof v.handleGetObject && "function" === typeof v.getKeys);
    }

    static async getBundle(basename: string, locale: Locale, app: NSP.App): Promise<JstlFmt.ResourceBundle> {
        type P = Promise<JstlFmt.ResourceBundle | { [key: string]: string }[]>;
        const resource = await app.process<P>("ResourceBundle.getBundle", basename, locale);

        if (ResourceBundle.isBundle(resource)) {
            return resource;
        }

        if (Array.isArray(resource)) {
            let bundle: ResourceBundle;
            let parent: ResourceBundle;

            for (const properties of resource) {
                bundle = new PropertyResourceBundle(properties);
                if (parent) bundle.setParent(parent);
                parent = bundle;
            }

            return bundle;
        }

        if (resource) {
            throw new Error(`Invalid ResourceBundle received for "${basename}"`);
        }
    }

    getString(key: string): string {
        return this.handleGetObject(key);
    }

    getObject(key: string): any {
        let obj = this.handleGetObject(key);
        if (obj == null) {
            obj = this.parent?.getObject(key);
        }
        return obj;
    }

    protected setParent(parent: ResourceBundle): void {
        this.parent = parent;
    }
}

class PropertyResourceBundle extends ResourceBundle {
    constructor(protected readonly properties: { [key: string]: string }) {
        super();
    }

    handleGetObject(key: string) {
        const {properties} = this;
        if (key in properties) {
            return properties[key];
        }
    }

    getKeys(): string[] {
        return Object.keys(this.properties);
    }
}
