import React, { Component, Fragment } from 'react'
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core'
import { SimDataItem } from '../../../../../../interfaces/simData'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import MonthItem from '../MonthItem/MonthItem'
import './SimItem.css'

interface IProps {
    simItem: SimDataItem
}

interface IState {
    open: boolean
}

export default class SimItem extends Component<IProps, IState> {
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
                <ListItem button onClick={this.handleClick}>
                    <ListItemText 
                    primary={this.props.simItem.year} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" className="months-list">
                        {this.props.simItem.months.map(monthItem => 
                            <MonthItem 
                            key={monthItem.id}
                            monthItem={monthItem}/> 
                        )}
                    </List>
                </Collapse>
            </Fragment>
            
        )
    }
}
