import React, { Component } from 'react'
import axios from 'axios'
import { SimData } from '../interfaces/simData'
import { addSim, removeSim } from './utils'

interface IProps {
    children: React.ReactNode
}

interface IState extends SimData {
    toggleSim: (
        year: number, 
        date: string, 
        chapter: string,
        doc: string) => void
}

const defaultContext: IState = {
    simData: [],
    selectedSims: {},
    toggleSim: () => {}
}


export const SimContext = React.createContext<IState>(defaultContext)

export default class SimProvider extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props) 

        this.state = {
            simData: [],
            selectedSims: {},
            toggleSim: this.toggleSim
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

    toggleSim = (
        year:number, 
        date: string, 
        chapter: string,
        doc: string) => {
        this.setState(state => ({
            selectedSims: state.selectedSims[
                year.toString() + date + chapter
            ] 
            ? removeSim(year, date, chapter, state.selectedSims)
            : addSim(year, date, chapter, doc, state.selectedSims)
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
