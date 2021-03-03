import React, { Component, ChangeEvent } from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core' 
import './Topbar.css'

interface IProps {
    selectedTab: number;
    handleChange: (event: ChangeEvent<{}>, value: number) => void
}

export default class Topbar extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
        this.state = {}
    }
    
    render() {
        return (
            <div className="Topbar">  
                <Tabs
                className="Tabs"
                indicatorColor="primary"
                textColor="primary"
                value={this.props.selectedTab}
                onChange={this.props.handleChange}>
                    <Tab label="יצירה" />
                    <Tab label="סימולציות" />
                </Tabs>
            </div>
        )
    }
}