import { PDFDocument } from 'pdf-lib'

export interface Simulation {
    year: string;
    date: string;
    chapters: string[];
}

export interface File {
    name: string;
    simulations: Simulation[]
}

export interface Chapter {
    src: PDFDocument,
    name: string;
    pageIndices: number[],
    skip?: boolean
}

export interface GenObj {
    [key: string]: any
}

export interface Options {
    shuffleData: boolean
}