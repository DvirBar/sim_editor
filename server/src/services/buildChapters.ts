import fsImport from 'fs'
const fs = fsImport.promises
import { PDFDocument } from 'pdf-lib'
import { 
    Simulation, 
    GenObj, 
    Chapter
} from '../interfaces'
import data, { chaptersMap } from '../data'
import { numberSeries, shuffleFisherYates } from '../utils/arrays'
import config from 'config'
import path from 'path'

// Get chapter files by year, date and chapter names
async function buildChapters(simulation: Simulation) {
    const {
        year,
        date,
        chapters: chapterNames
    } = simulation

    const assetsPath: string = config.get('assetsPath')

    const data = await fs.readFile(path.join(assetsPath,`${year}/${date}.pdf`))

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
        
        const chapter = getChapterDetails(
            year,
            date,
            chapterName.id,
            mapObj
        )
        chapters.push({
            src: srcPdf,
            index: chapterName.index,
            ...chapter
        })
    }

    return chapters
}


function getChapterDetails(
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

export default buildChapters
