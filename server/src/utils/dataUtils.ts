import data from "../data";

export function getYearMonths(year: number) {
    return data.monthsList.find(yearObj => 
        yearObj.max && yearObj.min &&
        year >= yearObj.min && year <= yearObj.max)?.sims || []
}

function getChapters(excludeArr: Array<string>) {
    return data.chapters.filter(chapter => 
        !excludeArr.includes(chapter))
}

// Get all the dates for each year
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
