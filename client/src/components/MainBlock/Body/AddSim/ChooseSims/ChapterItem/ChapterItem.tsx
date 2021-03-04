import { ListItem, ListItemText } from '@material-ui/core'
import React, { Component } from 'react'
import { SimChapterItem } from '../../../../../../interfaces/simData'

interface IProps {
    chapterItem: SimChapterItem
}

export default class ChapterItem extends Component<IProps> {
    render() {
        return (
            <ListItem button>
                <ListItemText primary={this.props.chapterItem.name} />
            </ListItem>
        )
    }
}
