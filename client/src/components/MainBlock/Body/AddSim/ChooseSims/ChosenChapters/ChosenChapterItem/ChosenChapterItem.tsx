import { Close } from '@material-ui/icons'
import React, { Component } from 'react'
import { SimContext } from '../../../../../../../context/SimContext'
import { GenObj } from '../../../../../../../interfaces/objects'

interface IProps {
    sim: GenObj
}

export default class ChosenChapterItem extends Component<IProps> {
    static contextType = SimContext
    
    render() {
        const {
            chapter,
            date,
            year
        } = this.props.sim

        const {
            removeSim
        } = this.context
        

        return (
            <div className="chosen-chapters__list__item">
                <span className="chosen-chapters__list__item__label">
                    {`${chapter.name}, ${date.name} ${year.toString()}`}
                </span>
                <Close 
                onClick={() => removeSim(year, date, chapter)}
                className="chosen-chapters__list__item--close" />     
            </div>
        )
    }
}
