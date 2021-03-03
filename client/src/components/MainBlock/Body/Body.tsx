import React, { Component } from 'react'
import AddSim from './AddSim/AddSim'
import SimList from './SimList/SimList'
import './Body.css'
import axios from 'axios'

interface IProps {
    selectedTab: number;
}

interface IState {
    simData: SimData | {}
}

interface SimData {
    chaptersTranslate: Object,
    excludeChapters: Object,
    monthsList: Array<Object>,
    monthsTranslate: Object,
    years: Object
}

export default class Body extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            simData: {}
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
            <div className="block-body">
                {this.props.selectedTab === 0 && <AddSim />}
                {this.props.selectedTab === 1 && <SimList />}
            </div>            
        )
    }
}
