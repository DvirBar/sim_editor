import React, { Component } from 'react'
import { DocErrorType, Errors, Loading } from '../interfaces/info'
import { GenObj } from '../interfaces/objects'
import { removeFromObj } from '../utils/objects'

interface IProps {
    children: React.ReactNode
}

export interface InfoContextState {
    loading: Loading,
    errors: Errors,
    changeGenError: (error: string) => void
    pushDocErrors: (errors: GenObj) => void
    changeDocError: (
        type: DocErrorType, 
        error: string, 
        doc: string) => void
    buildDocError: (
        doc: string, 
        errorType: DocErrorType, 
        error: string,
        errors: GenObj) => GenObj
    setLoading: (status: boolean, message?: string) => void
    resetDocErrors: (doc: string, type: DocErrorType) => void,
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
    buildDocError: () => ({}),
    pushDocErrors: () => {},
    changeDocError: () => {},
    setLoading: () => {},
    resetErrors: async() => {},
    resetDocErrors: () => {},
    hasErrors: () => true
}


export const InfoContext = React.createContext<InfoContextState>(defaultContext)

export default class InfoProvider extends Component<IProps, InfoContextState> {
    constructor(props: IProps) {
        super(props) 

        this.state = {
            ...defaultContext,
            changeGenError: this.changeGenError,
            buildDocError: this.buildDocError,
            changeDocError: this.changeDocError,
            pushDocErrors: this.pushDocErrors,
            setLoading: this.setLoading,
            resetErrors: this.resetErrors,
            resetDocErrors: this.resetDocErrors,
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
    
    buildDocError = (
        doc: string, 
        errorType: DocErrorType,
        error: string,
        errors: GenObj) => {
        return {
            ...errors,
            [doc]: {
                ...errors[doc],
                [errorType]: error
            }
        }
    }

    pushDocErrors = (errors: GenObj) => {

        this.changeGenError('לא ניתן לשלוח, תקנו את השגיאות בסימולציות המסומנות')

        for(let doc in errors) {
            this.setState(state => ({
                errors: {
                    ...state.errors,
                    docErrors: {
                        ...state.errors.docErrors,
                        [doc]: {
                            ...state.errors.docErrors[doc],
                            ...errors[doc]
                        }
                    }
                }
            }))
        }
    }

    changeDocError = (
        type: DocErrorType,
        error: string, 
        doc: string) => {
        this.setState(state => ({
            errors: {
                ...state.errors,
                docErrors: {
                    [doc]: {
                        ...state.errors.docErrors[doc],
                        [type]: error
                    }
                }
            }
        }))
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

    resetDocErrors = (doc: string, type: DocErrorType) => {
        
        const newDocError = removeFromObj(this.state.errors.docErrors[doc], type)
        
        this.setState(state => ({
            errors: {
                ...state.errors,
                docErrors: {
                    ...state.errors.docErrors,
                    [doc]: {
                        ...newDocError
                    }
                }
            }
        }), () => {
            if(Object.keys(this.state.errors.docErrors[doc])) {
                const newDocErrors = removeFromObj(this.state.errors.docErrors, doc)

                this.setState(state => ({
                    errors: {
                        ...state.errors,
                        docErrors: newDocErrors
                    }
                }))
            }
        })
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
