import { Close } from '@material-ui/icons';
import React, { Component } from 'react'
import './Alert.css'

interface IProps {
    error: string
    changeGenError: (error: string) => void 
}

interface IState {
    open: boolean,
    shake: boolean,
    called: boolean
}

export default class Alert extends Component<IProps, IState> {
    timerID: number;
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            open: false,
            shake: false,
            called: false
        }

        this.timerID = 0
    }

    setCloseTimeOut = () => {
        this.timerID = 
            window.setTimeout(() => 
                this.closeAlert()    
            , 5000)
    }

    componentDidUpdate(prevProps: IProps) {
        if(prevProps.error !== this.props.error && this.props.error !== '') {
            this.setState({ 
                open: true
            }, () => this.setCloseTimeOut())
        }
    } 

    closeAlert = () => {
        this.setState({
            open: false
        }, () => this.timerID = window.setTimeout(() => 
        this.props.changeGenError(''), 300))
    }
    

    componentWillUnmount() {
        window.clearInterval(this.timerID)
    }

    render() {        
        return (
            <div className={`wrapper 
            ${this.state.open ? 'open' : ''}`}>
                <div className={`alert
                ${this.state.shake ? 'shake' : ''}`}>
                    <Close 
                    onClick={() => this.closeAlert()}
                    className="alert--close" />
                    <div className="alert__text">
                        <span>
                            {this.props.error}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
