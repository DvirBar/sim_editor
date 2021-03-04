import data from './data'
import { buildSimFiles, createTempDir } from './services/files'
import createZip from './services/zip'
import { File, GenObj, Options } from './interfaces'
import { getYearMonths, getMonths } from './utils'
 
export default class Controllers {
    static getData(): GenObj {
        const {
            years
        } = data
      
        let result = []
    
        for(let year = years.min; year <= years.max; year++) {
            const yearMonths = getYearMonths(year)
        
            const months = getMonths(yearMonths, year)
            
            result.push({
                year,
                months
            })
        }
    
        return result
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
