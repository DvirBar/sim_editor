import React, { Component } from 'react'
import { DocErrorType, Errors } from '../interfaces/info'

interface IProps {
    children: React.ReactNode
}

export interface InfoContextState {
    loading: boolean,
    errors: Errors,
    changeGenError: (error: string) => void
    changeDocError: (
        doc: string, 
        errorType: DocErrorType, 
        error: string,
        errors: Errors) => Errors,
    assignErrors: (errors: Errors) => void
    setLoading: (status: boolean) => void
    resetErrors: () => Promise<void>
    hasErrors: (errors: Errors) => boolean
}

const defaultContext: InfoContextState = {
    loading: false,
    errors: {
        genError: '',
        docErrors: {}
    },
    changeGenError: () => {},
    changeDocError: () => ({
        genError: '',
        docErrors: {}
    }),
    assignErrors: () => {},
    setLoading: () => {},
    resetErrors: async() => {},
    hasErrors: () => true
}


export const InfoContext = React.createContext<InfoContextState>(defaultContext)

export default class InfoProvider extends Component<IProps, InfoContextState> {
    constructor(props: IProps) {
        super(props) 

        this.state = {
            ...defaultContext,
            changeGenError: this.changeGenError,
            changeDocError: this.changeDocError,
            assignErrors: this.assignErrors,
            resetErrors: this.resetErrors,
            hasErrors: this.hasErrors
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

    changeDocError = (
        doc: string, 
        errorType: DocErrorType,
        error: string,
        errors: Errors) => {
        if(errors.genError === '') {
            errors.genError = 'לא ניתן לשלוח, תקנו את השגיאות בסימולציות המסומנות'
        }   
        
        errors.docErrors = {
            ...errors.docErrors,
            [doc]: {
                ...errors.docErrors[doc],
                [errorType]: error
            }
        }

        return errors
    }

    assignErrors = (errors: Errors) => {
        this.setState({
            errors
        })
    }

    resetErrors = async() => {
        await new Promise(resolve => this.setState({
            errors: {
                genError: '',
                docErrors: {}
            }
        }, () => resolve))

        return
    }

    hasErrors = (errors: Errors): boolean => {
        const {
            docErrors,
            genError
        } = errors

        return genError !== '' || Object.keys(docErrors).length > 0
    }

    setLoading = (status: boolean) => {
        this.setState({
            loading: status
        })
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
