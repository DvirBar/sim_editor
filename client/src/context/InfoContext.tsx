import React, { Component } from 'react'
import { DocErrorType, Errors, Loading } from '../interfaces/info'

interface IProps {
    children: React.ReactNode
}

export interface InfoContextState {
    loading: Loading,
    errors: Errors,
    changeGenError: (error: string) => void
    changeDocError: (
        doc: string, 
        errorType: DocErrorType, 
        error: string,
        errors: Errors) => Errors,
    assignErrors: (errors: Errors) => void
    setLoading: (status: boolean, message?: string) => void
    resetErrors: () => Promise<void>
    hasErrors: (errors: Errors) => boolean
}

const defaultContext: InfoContextState = {
    loading: {
        status: false,
        message: ''
    },
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
            setLoading: this.setLoading,
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

    setLoading = (status: boolean, message?: string) => {
        // Value to cleanup message when finished loading
        const cleanupMessage = ''

        /* Message to display if status is true 
            and no message provided */
        const defaultMessage = 'בטעינה'

        this.setState({
            loading: {
                status,
                message: status 
                ? message || defaultMessage : cleanupMessage
            }
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
