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
