import React, { Component } from 'react'
import AddSim from './AddSim/AddSim'
import SimList from './SimList/SimList'
import './Body.css'

interface IProps {
    selectedTab: number;
}

export default class Body extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
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
