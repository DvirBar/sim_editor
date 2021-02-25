import { 
    File, 
    Options
} from '../interfaces'
import { createTempDir, buildSimFiles } from './fileMethods'

async function createSimulations(
    files: File[],
    options: Options) {

    const {
        tempFolderPath,
        dir
    } = await createTempDir()
    
    const filesInfo = await buildSimFiles(tempFolderPath, files, options)
    
    // Zip files
}

export default createSimulations
