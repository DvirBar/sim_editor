import React, { Component } from 'react'
import axios from 'axios'
import { 
    SimDataItem,
    SelectedSims, 
    Documents, 
    SimMonthItem, 
    SimChapterItem, 
    SimDataOptions} from '../interfaces/simData'
import { v4 as uuidv4 } from 'uuid'
import { removeFromObj } from '../utils/objects'
import { 
    addChapterIndex, 
    changeIndex, 
    composeDocsUtil, 
    composeId,
    removeChaptersByDoc } from './utils'
import { InfoContext } from './InfoContext'

interface IProps {
    children: React.ReactNode
}

export interface SimContextState {
    simData: Array<SimDataItem>
    selectedSims: SelectedSims
    selectedDoc: string
    documents: Documents
    options: SimDataOptions
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
    toggleShuffle: (value: boolean) => void
    composeDocs: () => Promise<string | void>
}

const defaultContext: SimContextState = {
    simData: [],
    selectedSims: {},
    documents: {},
    selectedDoc: '', 
    options: {
        shuffleData: true
    },
    addSim: () => {},
    removeSim: () => {},
    createDoc: () => {},
    selectDoc: () => {},
    changeDocName: () => {},
    removeDoc: () => {},
    changeSimIndex: () => {},
    toggleShuffle: () => {},
    composeDocs: async() => {}
}


export const SimContext = React.createContext<SimContextState>(defaultContext)

export default class SimProvider extends Component<IProps, SimContextState> {
    constructor(props: IProps) {
        super(props) 

        this.state = {
            ...defaultContext,
            addSim: this.addSim,
            removeSim: this.removeSim,
            createDoc: this.createDoc,
            selectDoc: this.selectDoc,
            changeDocName: this.changeDocName,
            removeDoc: this.removeDoc,
            changeSimIndex: this.changeSimIndex,
            toggleShuffle: this.toggleShuffle,
            composeDocs: this.composeDocs
        }
    }

    static contextType = InfoContext
    
    componentDidMount() {
        // Set loading
        axios.get('/api/simList')
             .then(res => {
                 this.setState({ simData: res.data })
             })
             .catch(err => 
                this.context.changeGenError('התרחשה תקלה, נסו לרענן את הדף')) 
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
            
            this.context.changeGenError('ניתן להוסיף עד 9 סימולציות')
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
        })
    }
    

    selectDoc = (id: string) => {
        this.setState({
            selectedDoc: id
        })
    }

    createDoc = () => {
        if(Object.keys(this.state.documents).length < 10) {
            const id = uuidv4()
            this.setState(state => ({
                documents: {
                    ...state.documents,
                    [id]: ''
                }
            }), () => this.selectDoc(id))
        }
        
        else {
            this.context.changeGenError('ניתן ליצור עד 10 סימולציות')
        }
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
            documents: removeFromObj(state.documents, id),
            selectedSims: removeChaptersByDoc(state.selectedDoc, state.selectedSims)
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

    toggleShuffle = (value: boolean) => {
        this.setState({
            options: {
                shuffleData: value
            }
        })
    }

    composeDocs = async() => {
        const url = await composeDocsUtil(
            this.state.documents,
            this.state.selectedSims,
            this.context,
            this.state.options
        )

        this.context.setLoading(false)
        return url
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
