import { SelectedSims, SimChapterItem, SimMonthItem } from '../interfaces/simData'
import { removeFromObj } from '../utils/objects'

export const composeId = (
    year: number, 
    date: SimMonthItem, 
    chapter: SimChapterItem,) => {
    return year.toString() + date.id + chapter.id
}

