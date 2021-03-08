export interface Errors {
    genError: string
    docErrors: {
        [doc: string]: string
    }
}