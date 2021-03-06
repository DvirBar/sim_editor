import { ListItem, ListItemText } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import React, { Component } from 'react'
import { SimContext } from '../../../../../../context/SimContext'
import { composeId } from '../../../../../../context/utils'
import { SimChapterItem, SimMonthItem } from '../../../../../../interfaces/simData'

interface IProps {
    chapter: SimChapterItem
    year: number
    date: SimMonthItem
}

export default class ChapterItem extends Component<IProps> {
    static contextType = SimContext
    
    render() {
        const {
            chapter,
            year,
            date
        } = this.props

        const context = this.context
        const isSelected = context.selectedSims[composeId(year, date, chapter)]
        
        return (
            <ListItem onClick={() => 
            context.addSim(year, date, chapter)}
            disabled={isSelected ? true : false}
            button>
                <ListItemText primary={this.props.chapter.name} />
                {isSelected &&
                    <Done />
                }
            </ListItem>  
        )
    }
}

