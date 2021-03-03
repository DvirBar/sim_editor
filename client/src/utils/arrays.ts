export const arrayNumList = (min: number, max: number) => {
    if(max > min) {
        let arr = []
        for(let num=min; num <= max; num++) {
            arr.push(num)
        }

        return arr
    }

    return []
}