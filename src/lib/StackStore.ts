export class StackStore<T> {
    protected stack: T[] = [];

    open(value?: T) {
        this.stack.unshift(value ?? null);
    }

    close(): T {
        return this.stack.shift();
    }

    current(): T {
        return this.stack.at(0);
    }

    find(test: (data: T) => boolean): T {
        for (const data of this.stack) {
            if (test(data)) {
                return data;
            }
        }
    }
}
