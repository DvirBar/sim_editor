export enum DocErrorType {
    NameError = "NameError",
    ChaptersError = "ChaptersError"
}

export interface Errors {
    genError: string
    docErrors: {
        [doc: string]: {
            NameError?: string
            ChaptersError?: string
        }
    }
}

export interface Loading {
    status: boolean
    message: string
}