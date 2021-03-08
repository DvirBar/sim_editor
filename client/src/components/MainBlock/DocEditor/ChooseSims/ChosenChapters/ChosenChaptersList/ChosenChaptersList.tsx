import React, { Component } from 'react'
import { SimContext } from '../../../../../../context/SimContext'
import ChosenChapterItem from '../ChosenChapterItem/ChosenChapterItem'
import "./ChosenChapters.css"
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { GenObj } from '../../../../../../interfaces/objects'

interface IProps {
    simsArray: Array<GenObj>
}

export default class ChosenChaptersList extends Component<IProps> {
    static contextType = SimContext
    
    render() {
        const {
            changeSimIndex
        } = this.context
    
        return (
            <DragDropContext 
            onDragEnd={result => 
            changeSimIndex(
                result.draggableId, 
                result.source.index, 
                result.destination?.index)}>
                <Droppable droppableId="chosen-chapters">
                    {provided => (
                        <div className="chosen-chapters__list" 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}>
                            {this.props.simsArray.map(simItem =>
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
