import data from "./data";
import { GenObj } from "./interfaces";

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
    const lastIndexOfStr = str.length

    const newStr = str.slice(0, fragIndex) + str.slice(endOfFragIndex, lastIndexOfStr)

    return newStr
}

export function getYearMonths(year: number) {
    return data.monthsList.find(yearObj => 
        yearObj.max && yearObj.min &&
        year >= yearObj.min && year <= yearObj.max)?.sims || []
}

function getChapters(excludeArr: Array<string>) {
    return data.chapters.filter(chapter => 
        !excludeArr.includes(chapter))
}

export function getMonths(yearMonths: string[], year: number) {
    const {
        excludeChapters,
        monthsTranslate,
        chaptersTranslate,
        chapters
    } = data


    return yearMonths.map(sim => {
        const excludeArr: Array<string> | undefined = 
            excludeChapters[year]?.[sim]
        
        const monthChapters =  excludeArr 
            ? getChapters(excludeArr) : chapters

        return {
            id: sim,
            name: monthsTranslate[sim],
            chapters: monthChapters.map(chapter => ({
                id: chapter,
                name: chaptersTranslate[chapter]
            }))
        }
    })
}
