import React, { Component } from 'react'
import { SimContext } from '../../../../../../../context/SimContext'
import ChosenChapterItem from '../ChosenChapterItem/ChosenChapterItem'
import "./ChosenChapters.css"

export default class ChosenChaptersList extends Component {
    static contextType = SimContext
    
    render() {
        const {
            selectedSims,
            selectedDoc
        } = this.context
        
        
        return (
            <div className="chosen-chapters">
                <div className="chosen-chapters__list">
                    {Object.keys(selectedSims).map(sim =>
                        selectedSims[sim].doc === selectedDoc &&
                            <ChosenChapterItem sim={selectedSims[sim]} />
                    )}
                </div>
            </div>
        )
    }
}
