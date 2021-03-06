import React, { Component } from 'react'
import axios from 'axios'
import { SimDataItem, SelectedSims, Documents, SimMonthItem, SimChapterItem } from '../interfaces/simData'
import { v4 as uuidv4 } from 'uuid'
import { removeFromObj } from '../utils/objects'
import { addChapterIndex, changeIndex, composeId } from './utils'

interface IProps {
    children: React.ReactNode
}

export interface SimContextState {
    simData: Array<SimDataItem>
    selectedSims: SelectedSims
    selectedDoc: string
    documents: Documents
    addSim: (
        year: number, 
        date: SimMonthItem, 
        chapter: SimChapterItem) => void

    removeSim: (
        year: number, 
        date: SimMonthItem, 
        chapter: SimChapterItem,
        index: number) => void
    

    createDoc: () => void
    selectDoc: (id: string) => void
    changeDocName: (id: string, name: string) => void
    removeDoc: (id: string) => void,
    changeSimIndex: (
        simId: string, 
        sourceIndex: number, 
        destinationIndex: number) => void
}

const defaultContext: SimContextState = {
    simData: [],
    selectedSims: {},
    documents: {},
    selectedDoc: '',
    addSim: () => {},
    removeSim: () => {},
    createDoc: () => {},
    selectDoc: () => {},
    changeDocName: () => {},
    removeDoc: () => {},
    changeSimIndex: () => {}
}


export const SimContext = React.createContext<SimContextState>(defaultContext)

export default class SimProvider extends Component<IProps, SimContextState> {
    constructor(props: IProps) {
        super(props) 

        this.state = {
            simData: [],
            selectedSims: {},
            selectedDoc: '',
            documents: {},
            addSim: this.addSim,
            removeSim: this.removeSim,
            createDoc: this.createDoc,
            selectDoc: this.selectDoc,
            changeDocName: this.changeDocName,
            removeDoc: this.removeDoc,
            changeSimIndex: this.changeSimIndex
        }
    }
    
    componentDidMount() {
        // Set loading
        axios.get('/api/simList')
             .then(res => {
                 this.setState({ simData: res.data })
                 console.log(res.data)
             })
             .catch(err => console.log(err)) 
    }

    addSim = (
        year: number, 
        date: SimMonthItem, 
        chapter: SimChapterItem) => {
            this.setState(state => {
                const newIndex = addChapterIndex(state.selectedSims, state.selectedDoc)

                if(newIndex < 9) {
                    return {
                        ...state,
                        selectedSims: {
                            ...state.selectedSims,
                            [composeId(year, date, chapter)]: {
                                year,
                                date,
                                chapter,
                                doc: state.selectedDoc,
                                index: newIndex
                            }
                        }
                    }
                }

                // Raise error
                return state
            })
    }

    removeSim = (
        year: number, 
        date: SimMonthItem, 
        chapter: SimChapterItem,
        index: number) => {
        this.setState(state => {
            const selectedSims = removeFromObj(
                state.selectedSims, 
                composeId(year, date, chapter))

            return {
                ...state,
                selectedSims: changeIndex(
                    selectedSims, 
                    state.selectedDoc,
                    '',
                    index,
                    Infinity)
            }
        }, () => console.log(this.state.selectedSims))
    }
    

    selectDoc = (id: string) => {
        this.setState({
            selectedDoc: id
        })
    }

    createDoc = () => {
        const id = uuidv4()
        this.setState(state => ({
            documents: {
                ...state.documents,
                [id]: ''
            }
        }), () => this.selectDoc(id))
    }

    changeDocName = (id:string, name: string) => {
        this.setState(state => ({
            documents: {
                ...state.documents,
                [id]: name
            }
        }))
    }

    removeDoc = (id: string) => {
        this.setState(state => ({
            documents: removeFromObj(state.documents, id)
        }))
    }

    changeSimIndex = (
        simId: string, 
        sourceIndex: number, 
        destinationIndex: number) => {

        if(destinationIndex === sourceIndex || 
           typeof destinationIndex === "undefined") {  
            return;
        }
        
        this.setState(state => ({
            selectedSims: changeIndex(
                state.selectedSims,
                state.selectedDoc,
                simId,
                sourceIndex,
                destinationIndex)
        }))
    }

    render() {
        return (
            <SimContext.Provider value={{
                ...this.state
            }}>
                {this.props.children}
            </SimContext.Provider>
        )
    }
}
