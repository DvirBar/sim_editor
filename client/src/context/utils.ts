import axios from 'axios'
import { DocErrorType, Errors } from '../interfaces/info'
import { GenObj } from '../interfaces/objects'
import { Documents, SelectedSims, SimChapterItem, SimDataOptions, SimMonthItem } from '../interfaces/simData'
import { objectTOArray } from '../utils/objects'
import { InfoContextState } from './InfoContext'

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

export const composeDocsUtil = async(
    documents: Documents,
    selectedSims: SelectedSims,
    context: InfoContextState,
    options: SimDataOptions) => {
    if(Object.keys(documents).length === 0) {
        context.changeGenError('יש ליצור סימולציות לפני השליחה')
        return
    }

    const {
        files,
        errors
    } = composeSimulationsArray(documents, selectedSims, context)
    
    context.assignErrors(errors)
    
    if(!context.hasErrors(errors)) {
        const body = JSON.stringify({
            files,
            options
        })
        
        return axios
        .post('/api/generateSimulations', body, {
            responseType: 'blob'
        })
        .then(res => {
            const blob = new Blob([res.data])
            const url = URL.createObjectURL(blob)

            return url
        })
        .catch(err => {
            context.changeGenError('התרחשה תקלה בזמן הפקת הקובץ')})
    }
}


export const composeSimulationsArray = (
    documents: Documents,
    selectedSims: SelectedSims,
    context: InfoContextState) => {
    
    let errors: Errors = {
        genError: '',
        docErrors: {}
    }

    let files = []

    for(let doc in documents) {
        if(documents[doc] === '') {
            errors = context.changeDocError(doc, DocErrorType.NameError, 'יש לבחור שם לסימולציה', errors)
        }

        let simulations: GenObj = {}
        for(let sim in selectedSims) {
            const {
                year,
                date,
                chapter,
                doc: simDoc
            } = selectedSims[sim]
        
            if(simDoc === doc) {
                let thisSim = simulations[year.toString() + date.id]
                if(thisSim) {
                    simulations[year.toString() + date.id] = {
                        ...thisSim,
                        chapters: [...thisSim.chapters, chapter.id]
                    }
                }

                else {
                    simulations[year.toString() + date.id] = {
                        year,
                        date: date.id,
                        chapters: [chapter.id]
                    }
                } 
            }
        }

        if(Object.keys(simulations).length === 0) {
            errors = context.changeDocError(
                doc,
                DocErrorType.ChaptersError,
                'הסימולציה ריקה, יש לבחור פרקים',
                errors
            )
        }

        else {
            // Transform simulations object to array
            const simArr = objectTOArray(simulations)

            files.push({
                name: documents[doc],
                simulations: simArr
            })
        }
    }


    return {
        files,
        errors
    }
}
