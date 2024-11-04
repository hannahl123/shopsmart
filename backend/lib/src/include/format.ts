export function format(str: string, varArr: Array<any>, spChar: string = '%'): string {
    let i = 0;
    let temp = "";
    for (let j = 0; j < str.length; j++) {
        let c = str[j];
        if (c == spChar) {temp += varArr[i++];}
        else {temp += c;}
    }
    return temp;
}