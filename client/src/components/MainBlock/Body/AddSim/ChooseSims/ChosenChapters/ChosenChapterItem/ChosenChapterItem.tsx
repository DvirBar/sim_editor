import { Close } from '@material-ui/icons'
import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { SimContext } from '../../../../../../../context/SimContext'
import { GenObj } from '../../../../../../../interfaces/objects'

interface IProps {
    sim: GenObj
    id: string
}

export default class ChosenChapterItem extends Component<IProps> {
    static contextType = SimContext
    
    render() {
        const {
            chapter,
            date,
            year,
            index
        } = this.props.sim

        const {
            removeSim
        } = this.context
        

        return (
            <Draggable
            key={this.props.id} 
            draggableId={this.props.id} 
            index={index}>
            {provided => (
                <div 
                {...provided.draggableProps} 
                {...provided.dragHandleProps} 
                ref={provided.innerRef}
                className="chosen-chapters__list__item">
                     <div className="chosen-chapters__list__item__title">
                        פרק {index+1}
                     </div>
                     <div className="chosen-chapters__list__item__body">
                        <span className="chosen-chapters__list__item__body__label">
                            {`${chapter.name}, ${date.name} ${year.toString()}`}
                        </span>
                        <Close 
                        onClick={() => removeSim(year, date, chapter, index)}
                        className="chosen-chapters__list__item__body--close" />
                    </div>    
                 </div>
            )}
            </Draggable>
        )
    }
}
