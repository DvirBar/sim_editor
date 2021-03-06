export interface SimData {
    simData: Array<SimDataItem>
    selectedSims: SelectedSims
    documents: Documents
}

export interface Documents {
    [id: string]: string
}

export interface SelectedSims {
    [key: string]: {
        year: number
        date: SimMonthItem
        chapter: SimChapterItem
        doc: string,
        index: number
    }
}

export interface SimDataItem {
    year: number
    months: Array<SimMonthItem> 
}

export interface SimMonthItem {
    id: string
    name: string
    chapters: Array<SimChapterItem> 
    key: string
}

export interface SimChapterItem {
    id: string
    name: string
}