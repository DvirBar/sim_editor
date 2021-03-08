import React, { Component } from 'react'
import SimsList from './SimsList/SimsList'
import './ChooseSims.css'
import ChosenChapters from './ChosenChapters/ChosenChapters'

export default class ChooseSims extends Component {
    render() {
        return (
            <div className="choose-sims">
                <header className="choose-sims__header">
                    בחרו פרקים
                </header>
                <div className="choose-sims__content">
                    <SimsList />
                    <ChosenChapters />
                </div>

            </div>
            
        )
    }
}
