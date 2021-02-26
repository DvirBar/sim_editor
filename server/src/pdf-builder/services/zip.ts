import fsImport from 'fs'
const fs = fsImport.promises
import JSZip from 'jszip'
import { v4 as uuidv4 } from 'uuid'

async function createZip(folderPath: string) {
    // Read simulations directory and add files to zip
    const zip = await addFilesToZip(folderPath)

    const zipPath = await generateZip(zip, folderPath)

    return zipPath
}

async function addFilesToZip(folderPath: string) {
    const files = await fs.readdir(folderPath)
    const zip = new JSZip()

    for(let file of files) {
        const filePath =`${folderPath}/${file}` 
        const fileItem = await fs.readFile(filePath)

        zip.file(`simulations/${file}`, fileItem)
    }

    return zip
}

async function generateZip(zip: JSZip, tempPath: string) {
    const tempId = uuidv4()
    const content = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" })

    const zipPath = `${tempPath}/${tempId}.zip`
    await fs.writeFile(zipPath, content)

    return zipPath
}

export default createZip