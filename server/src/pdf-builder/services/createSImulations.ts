import { 
    File, 
    Options
} from '../interfaces'
import { createTempDir, buildSimFiles } from './fileMethods'
import createZip from './zip'

async function createSimulations(
    files: File[],
    options: Options) {

    const tempFolderPath = await createTempDir()
    
    const filesInfo = await buildSimFiles(tempFolderPath, files, options)
    
    // Zip files
    const zipPath = await createZip(tempFolderPath)
    
}

export default createSimulations
