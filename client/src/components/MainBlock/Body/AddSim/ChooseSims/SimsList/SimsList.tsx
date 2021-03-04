import React, { Component } from 'react'
import { SimContext } from '../../../../../../context/SimContext'
import { List } from '@material-ui/core'
import './SimsList.css'
import SimItem from '../SimItem/SimItem'

export default class SimsList extends Component {
    render() {
        return (
            <List 
            component="nav"
            aria-labelledby="nested-list-subheader"
            className="sims-list">
                <div className="sims-list__body">
                    <SimContext.Consumer>
                        {context => context.simData.map(simItem => 
                            simItem.months.length > 0 &&
                            <SimItem 
                            key={simItem.year}
                            simItem={simItem} />
                        )}
                    </SimContext.Consumer>
                </div>
            </List>
        )
    }
}
