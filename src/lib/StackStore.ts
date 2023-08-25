export class StackStore<T> {
    protected stack: T[] = [];

    open(value?: T) {
        this.stack.unshift(value ?? null);
    }

    close(): T {
        return this.stack.shift();
    }

    current(value?: T): T {
        if (arguments.length) {
            this.stack[0] = value;
        }

        return this.stack[0];
    }

    find(test: (data: T) => boolean): T {
        for (const data of this.stack) {
            if (test(data)) {
                return data;
            }
        }
    }
}
