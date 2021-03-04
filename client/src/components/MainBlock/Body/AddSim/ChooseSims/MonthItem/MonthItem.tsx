import React, { Component, Fragment } from 'react'
import { SimMonthItem } from '../../../../../../interfaces/simData'
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core'
import ChapterItem from '../ChapterItem/ChapterItem'
import { ExpandMore, ExpandLess } from '@material-ui/icons'

interface IProps {
    monthItem: SimMonthItem
}

interface IState {
    open: boolean
}

export default class MonthItem extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            open: false
        }
    }

    handleClick = () => {
        this.setState(state => ({
            open: !state.open
        }))
    }

    render() {
        return (
            <Fragment>
                <ListItem onClick={this.handleClick} button>
                    <ListItemText primary={this.props.monthItem.name} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" className="months-list">
                        {this.props.monthItem.chapters?.map(chapterItem => 
                            <ChapterItem
                            key={chapterItem.id}
                            chapterItem={chapterItem}/> 
                        )}
                    </List>
                </Collapse>
            </Fragment>
        )
    }
}
