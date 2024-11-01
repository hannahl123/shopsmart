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