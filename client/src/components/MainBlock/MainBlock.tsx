import React, { Component, ChangeEvent } from 'react';
import Topbar from './Topbar/Topbar';
import './MainBlock.css'
import Body from './Body/Body';

interface IProps {}

interface IState {
    selectedTab: number
}

export default class MainBlock extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            selectedTab: 0
        }
    }

    handleChange = (
        event: ChangeEvent<{}>, 
        value: number) => {

        this.setState({
            selectedTab: value
        })
    }

    render() {
        return (
            <div className="main-block">
                <div className="main-block__container">
                    <Topbar 
                    selectedTab={this.state.selectedTab}
                    handleChange={this.handleChange} />
                    <Body selectedTab={this.state.selectedTab} />
                </div>
            </div>
        )
    }
}


