import data from './data'
import { buildSimFiles, createTempDir } from './services/files'
import createZip from './services/zip'
import { File, GenObj, Options } from './interfaces'

export default class Controllers {
    static getData(): GenObj {
        return data
    }

    /* Creates simulation files requested, and sends 
        them back as a zip file */
    static async createSimulations(
        files: File[],
        options: Options) {
        const tempFolderPath = await createTempDir()
    
        const filesInfo = await buildSimFiles(tempFolderPath, files, options)
        
        // Zip files
        const zipPath = await createZip(tempFolderPath)

        return zipPath
    }
}
