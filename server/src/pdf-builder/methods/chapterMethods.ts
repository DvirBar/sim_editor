import fsImport from 'fs'
const fs = fsImport.promises
import { PDFDocument } from 'pdf-lib'
import { 
    Simulation, 
    GenObj, 
    Chapter,
} from '../interfaces'
import data, { chaptersMap } from '../../data'
import { numberSeries } from '../utils'
import { shuffleFisherYates } from '../utils'

async function getChapters(simulation: Simulation) {
    const {
        year,
        date,
        chapters: chapterNames
    } = simulation

    const data = await fs.readFile(`assets/${year}/${date}.pdf`)

    const srcPdf = await PDFDocument.load(data)
    const mapYear = chaptersMap[year]
    let mapObj: GenObj 

    if(mapYear && mapYear[date]) {
        mapObj = mapYear[date]
    }

    else {
        mapObj = chaptersMap["default"]
    }

    let chapters: Chapter[] = []        
    for(let chapterName of chapterNames) {
        const chapter = createChapter(
            year,
            date,
            chapterName,
            mapObj
        )
        chapters.push({
            src: srcPdf,
            ...chapter
        })
    }

    return chapters
}

function createChapter(
    year: string,
    date: string,
    chapter: string,
    mapObj: GenObj) {

    const {
        start,
        end,
        skip
    } = mapObj[chapter]

    const pageIndices = numberSeries(start, end)

    const monthName: string = data.monthsTranslate[date]
    const chaptName: string = data.chaptersTranslate[chapter]

    return {
        name: `${chaptName} ${monthName} ${year}`,
        pageIndices,
        skip
    }
}

export function shuffleChapters(chapterArr: Chapter[])  {
    let chaptersToShuffle: Chapter[] = []
    let constChapters: Chapter[] = []

    for(let chapter of chapterArr) {
        if(!chapter.skip) {
            chaptersToShuffle.push(chapter)
        }
        else {
            constChapters.push(chapter)
        }
    }
        
    return [...constChapters, ...shuffleFisherYates(chaptersToShuffle)]
}

export default getChapters
