export function round(val: number, nearest: number): number {
    return Math.floor(val / nearest + 0.5) * nearest;
}
export function rad(x: number): number {
    return (x * Math.PI) / 180;
}
export function deg(x: number): number {
    return (x * 180) / Math.PI;
}
export function sq(x: number): number {
    return x * x;
}
export function logLastBit(x: number): number {
    if (x == 0) {return 0;}
    let ans = 0;
    while (x%2 == 0) {
        x /= 2; ans++;
    }
    return ans;
}
