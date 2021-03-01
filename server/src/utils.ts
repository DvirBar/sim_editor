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

export function sliceString(str: string, fragment: string) {
    const fragIndex = str.indexOf(fragment)

    if(fragIndex === -1) {
        throw new Error(`Could not find ${fragment} in ${str}`)
    }
    const endOfFragIndex = fragIndex + fragment.length
    const lastIndexOfStr = str.length - 1

    const newStr = str.slice(0, fragIndex) + str.slice(endOfFragIndex, lastIndexOfStr)

    return newStr
}