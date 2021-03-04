export interface SimData {
    simData: Array<SimDataItem>
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