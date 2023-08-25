export class StackStore<T> {
    protected stack: T[] = [];

    open(value?: T) {
        this.stack.unshift(value ?? null);
    }

    close(): T {
        return this.stack.shift();
    }

    get(): T {
        return this.stack[0];
    }

    set(value: T): void {
        this.stack[0] = value;
    }

    find(test: (data: T) => boolean): T {
        for (const data of this.stack) {
            if (test(data)) {
                return data;
            }
        }
    }
}
