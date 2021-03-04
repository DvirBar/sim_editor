import React, { Component } from 'react'
import axios from 'axios'
import { SimData } from '../interfaces/simData'

interface IProps {
    children: React.ReactNode
}

const defaultContext: SimData = { simData: [] }

export const SimContext = React.createContext(defaultContext)

export default class SimProvider extends Component<IProps, SimData> {
    constructor(props: IProps) {
        super(props) 

        this.state = {
            simData: []
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

    render() {
        return (
            <SimContext.Provider value={{
                simData: this.state.simData
            }}>
                {this.props.children}
            </SimContext.Provider>
        )
    }
}
