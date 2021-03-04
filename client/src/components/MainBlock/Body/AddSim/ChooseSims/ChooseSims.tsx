import React, { Component } from 'react'
import SimsList from './SimsList/SimsList'
import './ChooseSims.css'

export default class ChooseSims extends Component {
    render() {
        return (
            <div className="choose-sims">
                <header className="choose-sims__header">
                    בחרו סימולציות
                </header>
                <div className="choose-sims__content">
                <SimsList />
                </div>

            </div>
            
        )
    }
}
