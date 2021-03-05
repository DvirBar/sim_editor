import React, { Component } from 'react'
import SimList from './SimList/SimList'
import CreateSims from './CreateSims/CreateSims'
import './Body.css'

interface IProps {
    selectedTab: number;
}



export default class Body extends Component<IProps> {
    render() {
        return (
            <div className="block-body">
                {this.props.selectedTab === 0 && <CreateSims />}
                {this.props.selectedTab === 1 && <SimList />}
            </div>            
        )
    }
}
