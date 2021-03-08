import React, { Component } from 'react'
import { Errors } from '../interfaces/info'

interface IProps {
    children: React.ReactNode
}

export interface InfoContextState {
    errors: Errors,
    changeGenError: (error: string) => void
}

const defaultContext: InfoContextState = {
    errors: {
        genError: '',
        docErrors: {}
    },
    changeGenError: () => {}
}


export const InfoContext = React.createContext<InfoContextState>(defaultContext)

export default class InfoProvider extends Component<IProps, InfoContextState> {
    constructor(props: IProps) {
        super(props) 

        this.state = {
            ...defaultContext,
            changeGenError: this.changeGenError
        }
    }

    changeGenError = (error: string) => {
        this.setState(state => ({
            errors: {
                ...state.errors,
                genError: error
            }
        }))
    }


    render() {
        return (
            <InfoContext.Provider value={{
                ...this.state
            }}>
                {this.props.children}
            </InfoContext.Provider>
        )
    }
}
