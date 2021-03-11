import { ObjWithIndex } from "../interfaces";

export function shuffleFisherYates(array: any[]) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * (i + 1));
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
}

export function numberSeries(min: number, max: number) {
    if(max < min) {
        throw 'Invalid Input: max value cannot be lower than min value'      
    }

    let arr: number[] = [] 
    for(let num = min; num <= max; num++) {
        arr.push(num)
    }

    return arr
}

export function orderObjects(objArr: Array<ObjWithIndex>) {
    return objArr.sort((a, b) => a.index - b.index) 
}