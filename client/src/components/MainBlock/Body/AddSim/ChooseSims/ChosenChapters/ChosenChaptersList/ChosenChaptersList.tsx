import React, { Component } from 'react'
import { SimContext } from '../../../../../../../context/SimContext'
import ChosenChapterItem from '../ChosenChapterItem/ChosenChapterItem'
import "./ChosenChapters.css"
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { createSortedArray } from './utils'

export default class ChosenChaptersList extends Component {
    static contextType = SimContext
    
    render() {
        const {
            selectedSims,
            selectedDoc,
            changeSimIndex
        } = this.context
        
        const simsArray = createSortedArray(selectedSims, selectedDoc)

        return (
            <DragDropContext 
            onDragEnd={result => 
            changeSimIndex(
                result.draggableId, 
                result.source.index, 
                result.destination?.index)}>
                <Droppable droppableId="chosen-chapters">
                    {provided => (
                        <div className="chosen-chapters__list" {...provided.droppableProps} ref={provided.innerRef}>
                            {simsArray.map(simItem =>
                                <ChosenChapterItem 
                                id={simItem.id}
                                sim={simItem} />
                            )}
                            {provided.placeholder}
                        </div>    
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}
