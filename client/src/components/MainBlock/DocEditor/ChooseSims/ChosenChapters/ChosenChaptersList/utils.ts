import { SelectedSims } from "../../../../../../interfaces/simData";

export const createSortedArray = (selectedSims: SelectedSims, docId: string) => {
    let sortedSims = []

    for(let sim in selectedSims) {
        if(selectedSims[sim].doc === docId) {
            sortedSims.push({
                id: sim,
                ...selectedSims[sim]
            })
        }
    }

    return sortedSims.sort((a, b) => a.index - b.index)
}