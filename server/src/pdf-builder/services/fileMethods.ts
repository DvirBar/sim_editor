import fsImport from 'fs'
const fs = fsImport.promises
import { 
    Simulation, 
    File, 
    Chapter,
    Options
} from '../interfaces'
import { v4 as uuidv4 } from 'uuid'
import getChapters, { shuffleChapters } from './chapterMethods'
import { copyPagesToDoc, initPdfDoc } from './documents'


export async function createTempDir() {
    // Create a temp folder with unique id
    const tempId = uuidv4()
    const tempFolderPath = `assets/temp/${tempId}`

    await fs.mkdir(tempFolderPath)

    return tempFolderPath
}

export async function buildSimFiles(
    tempFolderPath: string,
    files: File[], 
    options: Options) { 

    let filesInfo = []

    for(let file of files) {
        // Create simulation files and write them
        const {
            name, 
            simulations
        } = file

        const {
            newDoc,
            fileInfo
        } = await buildFile(simulations, options, name)

        await fs.writeFile(`${tempFolderPath}/${name}.pdf`, newDoc)
        filesInfo.push(fileInfo)

        console.log(`Created simulation ${name} at ${tempFolderPath}`);
    }

    return filesInfo
} 


async function buildFile(
    simulations: Simulation[],
    options: Options,
    name: string
    ) {

    // Initiate document
    const pdfDoc = await initPdfDoc(name)

    // Get chapters pages and names of each simulation
    let chapterArr: Chapter[] = []
    for(let simulation of simulations) {
        const chapters = await getChapters(simulation)
        chapterArr = [...chapterArr, ...chapters]
    }

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

    return {
        newDoc,
        fileInfo
    }
}




