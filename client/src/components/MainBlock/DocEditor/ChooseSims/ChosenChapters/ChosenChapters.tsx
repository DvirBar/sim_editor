import React, { Component } from 'react'
import ChosenChaptersList from './ChosenChaptersList/ChosenChaptersList'
import { createSortedArray } from './ChosenChaptersList/utils'
import { SimContext } from '../../../../../context/SimContext'
import "./ChosenChapters.css"


export default class ChosenChapters extends Component {
    static contextType = SimContext

    render() {
        const {
            selectedSims,
            selectedDoc
        } = this.context
        
        const simsArray = createSortedArray(selectedSims, selectedDoc)
  
        return (
            <div className="chosen-chapters">
                {simsArray.length > 0
                ?   <ChosenChaptersList simsArray={simsArray} />
                :   <div className="no-chapters-info">
                        <p className="no-chapters-info__primary">אין פרקים עדיין</p>
                        <p className="no-chapters-info__secondary">הוסיפו פרקים מהרשימה שמימין</p>
                    </div>
                }
            </div>            
        )
    }
}
