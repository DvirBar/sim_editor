import { SelectedSims, SimChapterItem, SimMonthItem } from '../interfaces/simData'

export const composeId = (
    year: number, 
    date: SimMonthItem, 
    chapter: SimChapterItem,) => {
    return year.toString() + date.id + chapter.id
}

export const addChapterIndex = (
    selectedSims: SelectedSims,
    docId: string
) => {
    let counter = 0

    for(let sim in selectedSims) {
        if(selectedSims[sim].doc === docId) {
            counter++
        }
    }

    return counter
}

export const changeIndex = (
    selectedSims: SelectedSims, 
    docId: string,
    simId: string, 
    sourceIndex: number, 
    destinationIndex: number) => {
    
    let newObj: SelectedSims = {}
    
    for(let sim in selectedSims) {
        let newIndex: number = -1
        const selSim = selectedSims[sim]
        
        if(selSim.doc === docId) {
        // If this is the dragged sim
            if(sim === simId) {
                newIndex = destinationIndex
            }
            

            // If the item was dragged to a lower spot
            else if(sourceIndex < destinationIndex &&
                    selSim.index > sourceIndex && 
                    selSim.index <= destinationIndex ) {
                
                newIndex = selSim.index - 1
            }

            // If the item was dragged to a higher spot
            else if(sourceIndex > destinationIndex &&
                    selSim.index < sourceIndex && 
                    selSim.index >= destinationIndex) {
                
                newIndex = selSim.index + 1
            }
        }

        if(newIndex === -1) {
            newIndex = selSim.index
        }

        newObj[sim] = {
            ...selSim,
            index: newIndex
        }
    }

    return newObj
}

export const removeChaptersByDoc = (
    docId: string, 
    selectedSims: SelectedSims) => {

    const newObj: SelectedSims = {}

    for(let sim in selectedSims) {
        if(selectedSims[sim].doc !== docId) {
            newObj[sim] = selectedSims[sim]
        }
    }

    return newObj
}
