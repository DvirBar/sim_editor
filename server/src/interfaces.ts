import { PDFDocument, PDFFont } from 'pdf-lib'

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

export interface TextConfig {
    width?: number;
    height?: number;
    font: PDFFont,
    fontSize: number;
}

export interface SimData {
    chaptersTranslate: GenObj
    excludeChapters: GenObj
    monthsList: Array<monthsList>
    monthsTranslate: GenObj
    years: GenObj,
    chapters: Array<string>
}

interface monthsList {
    min?: number
    max?: number
    isMax?: boolean
    sims: Array<string> | Array<never>
}