import { SelectedSims } from '../interfaces/simData'
import { removeFromObj } from '../utils/objects'

export const addSim = (
    year: number, 
    date: string, 
    chapter: string,
    doc: string,
    selectedSims: SelectedSims ) => {
    return {
        ...selectedSims,
        [year.toString() + date + chapter]: {
            year,
            date,
            chapter,
            doc
        }
    }
}

export const removeSim = (
    year: number, 
    date: string, 
    chapter: string,
    selectedSims: SelectedSims) => {
    return removeFromObj(
            selectedSims, 
            year.toString() + date + chapter)
}
