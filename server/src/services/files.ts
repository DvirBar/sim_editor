import fsImport from 'fs'
const fs = fsImport.promises
import { 
    Simulation, 
    File, 
    Chapter,
    Options
} from '../interfaces'
import { v4 as uuidv4 } from 'uuid'
import buildChapters, { shuffleChapters } from './buildChapters'
import { copyPagesToDoc, initPdfDoc } from './pdfDocs'
import path from 'path'
import config from 'config'

export async function createTempDir() {
    // Create a temp folder with unique id
    const tempId = uuidv4()
    const assetsPath: string = config.get("assetsPath")
    const tempFolderPath = path.join(assetsPath, 'temp', tempId)

    await fs.mkdir(tempFolderPath)

    return tempFolderPath
}

export async function buildSimFiles(
    tempFolderPath: string,
    files: File[], 
    options: Options) {

    let promises = []

    // Create simulation files and write them
    for(let file of files) {
        const {
            name, 
            simulations
        } = file
        promises.push(
            buildFile(
                simulations, 
                options, 
                name, 
                tempFolderPath)
        )
    }

    return Promise.all(promises)
            .then(filesInfo => filesInfo)
}

async function buildFile(
    simulations: Simulation[],
    options: Options,
    name: string,
    tempFolderPath: string) {
    // Initiate document
    const pdfDoc = await initPdfDoc(name)

    let chapterArr = await iterateSimulations(simulations)

    // Shuffle array if requested 
    if(options.shuffleData) {
        chapterArr = shuffleChapters(chapterArr)
    }

    // Copy extracted pages to a single file and return it
    const {
        pdfDoc: writtenDoc, 
        fileInfo 
    } = await copyPagesToDoc(chapterArr, pdfDoc)

    const newDoc = await writtenDoc.save()

    await fs.writeFile(`${tempFolderPath}/${name}.pdf`, newDoc)

    return fileInfo 
}

async function iterateSimulations(simulations: Simulation[]) {
    let promises = []
    for(let simulation of simulations) {
        promises.push(buildChapters(simulation))
    }

    return Promise.all(promises)
           .then(chpatersArr => {
               let chapters: Chapter[] = []

               for(let chaptersItem of chpatersArr) {
                   chapters = [...chapters, ...chaptersItem]
               }

               return chapters
           })
}




