export interface SimData {
    simData: Array<SimDataItem>
    selectedSims: SelectedSims
}

export interface SelectedSims {
    [key: string]: {
        year: number
        date: string
        chapter: string
        doc: string
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