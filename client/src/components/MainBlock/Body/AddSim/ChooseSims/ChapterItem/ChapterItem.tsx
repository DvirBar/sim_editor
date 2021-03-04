import { ListItem, ListItemText } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import React, { Component } from 'react'
import { SimContext } from '../../../../../../context/SimContext'
import { SimChapterItem } from '../../../../../../interfaces/simData'

interface IProps {
    chapterItem: SimChapterItem
    year: number
    date: string
}

export default class ChapterItem extends Component<IProps> {
    render() {
        const {
            chapterItem,
            year,
            date
        } = this.props
        return (
            <SimContext.Consumer>
                {context => 
                    <ListItem onClick={() => 
                    context.toggleSim(year, date, chapterItem.id, '1')} button>
                        <ListItemText primary={this.props.chapterItem.name} />
                        {context.selectedSims[year.toString() + date + chapterItem.id] &&
                            <Done />
                        }
                    </ListItem>
                }
            </SimContext.Consumer>
            
        )
    }
}
