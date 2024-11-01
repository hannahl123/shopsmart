export function Arr(n: number, v: any = 0): Array<any> {
    let arr: Array<any> = [];
    for (let i = 0; i < n; i++) {
        arr.push(v)
    }
    return arr;
}
export function Arr2d(sx: number, sy: number, v: any = 0): Array<Array<any>> {
    let arr: Array<Array<any>> = [];
    for (let x = 0; x < sx; x++) {
        let line: Array<any> = [];
        for (let y = 0; y < sy; y++) {
            line.push(v);
        }
        arr.push(line);
    }
    return arr;
}
export function swap(arr: Array<any>, i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export class PriorityQueue<T> {
    arr: Array<T> = [];
    PriorityQueue(arr1: Array<T> = []) {
        this.arr = [];
    }

    static root(x: number) {return Math.trunc((x-1)/2);}
    static lnode(x: number) {return x*2+1;}
    static rnode(x: number) {return x*2+2;}

    size(): number {
        return this.arr.length;
    }
    empty(): boolean {
        return this.arr.length == 0;
    }
    top(): T {
        return this.arr[0];
    }
    push(x: T) {
        let i = this.arr.length;
        this.arr.push(x);
        while (i > 0) {
            let i0 = PriorityQueue.root(i);
            if (this.arr[i] > this.arr[i0]) {
                swap(this.arr, i, i0); i = i0;
            } else {
                break;
            }
        }
    }
    pop() {
        swap(this.arr, 0, this.arr.length-1);
        this.arr.pop();
        let i = 0;
        while (true) {
            let il = PriorityQueue.lnode(i);
            let ir = PriorityQueue.rnode(i);
            if (ir < this.arr.length && this.arr[i] < this.arr[ir]) {
                if (this.arr[il] > this.arr[ir]) {
                    swap(this.arr, i, il); i = il;
                } else {
                    swap(this.arr, i, ir); i = ir;
                }
            } else if (il < this.arr.length && this.arr[i] < this.arr[il]) {
                swap(this.arr, i, il); i = il;
            } else {
                break;
            }
        }
    }
}