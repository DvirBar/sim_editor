import { Documents } from "../../../interfaces/simData";

export const mapStagedDocs = (documents: Documents) => {
    let mappedDocs = []

    for(let doc in documents) {
        mappedDocs.push(doc)
    }

    return mappedDocs
} 