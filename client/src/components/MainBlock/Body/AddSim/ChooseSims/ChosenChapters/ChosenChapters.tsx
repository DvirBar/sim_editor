import React, { Component } from 'react'
import ChosenChaptersList from './ChosenChaptersList/ChosenChaptersList'

export default class ChosenChapters extends Component {
    render() {
        return (
            <div className="chosen-chapters">
                <ChosenChaptersList />
            </div>                    
        )
    }
}
