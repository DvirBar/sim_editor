import { CircularProgress } from '@material-ui/core'
import React, { Component } from 'react'
import './Loading.css'

interface IProps {
    message: string
}

export default class Loading extends Component<IProps> {
    render() {
        return (
            <div className="loading-wrapper">
                <div className="loading-container">
                    <CircularProgress
                    color="primary" />
                    <div className="loading-message">
                        {this.props.message}
                    </div>
                </div>  
            </div>
        )
    }
}
