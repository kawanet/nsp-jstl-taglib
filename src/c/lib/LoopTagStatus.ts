interface LoopTagOptions<T> {
    items: T[];
    begin: number | string;
    end: number | string;
    step: number | string;
}

export class LoopTagStatus<T> {
    items: T[];
    current: T;
    index: number;
    begin: number;
    end: number;
    step: number;

    constructor(options: LoopTagOptions<T>) {
        const items = this.items = options.items;
        this.current = null;
        this.index = null;
        this.begin = +options.begin || 0;
        this.end = +options.end || items.length - 1;
        this.step = +options.step || 1;
    }

    start() {
        const index = this.index = this.begin;
        if (index <= this.end) {
            return this.current = this.items[index];
        }
    }

    next(): T {
        let {index} = this;
        index = this.index = (index == null) ? this.begin : index + this.step;
        if (index <= this.end) {
            return this.current = this.items[index];
        }
    }

    getIndex(): number {
        return this.index;
    }

    getCurrent(): T {
        return this.current;
    }

    isFirst(): boolean {
        return this.index === this.begin;
    }

    isLast(): boolean {
        return this.index + this.step > this.end;
    }

    getBegin(): number {
        return this.begin;
    }

    getEnd(): number {
        return this.end;
    }

    getStep(): number {
        return this.step;
    }
}