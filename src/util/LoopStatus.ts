import type {JstlUtil} from "../../index.js";

interface LoopStatusOptions<T> {
    items: T[];
    begin: number | string;
    end: number | string;
    step: number | string;
}

export class LoopStatus<T> implements JstlUtil.LoopTagStatus<T> {
    protected items: T[];

    current: T;
    index: number;
    count: number;
    begin: number;
    end: number;
    step: number;

    constructor(options: LoopStatusOptions<T>) {
        const items = this.items = options.items;
        this.current = null;
        this.index = null;
        this.count = 0;
        this.begin = +options.begin || 0;
        this.end = +options.end || items.length - 1;
        this.step = +options.step || 1;
    }

    next(): T {
        let {index} = this;
        index = this.index = (index == null) ? this.begin : index + this.step;
        this.count++;
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

    getCount(): number {
        return this.count;
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