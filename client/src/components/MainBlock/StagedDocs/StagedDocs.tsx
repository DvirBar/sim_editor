import React, { Component } from 'react'
import { Documents } from '../../../interfaces/simData'
import StagedDocItem from './StagedDocItem/StagedDocItem'
import './StagedDocs.css'

interface IProps {
    documents: Documents
}

export default class StagedDocs extends Component<IProps> {
    render() { 
        const {
            documents
        } = this.props
        
        return (
            <div className="staged-docs">
                <div>
                    <p className="staged-docs__title">
                        הסימולציות שלי:
                    </p>
                    <p className="staged-docs__subtitle">
                        ניתן ליצור עד 10 סימולציות
                    </p>
                </div>

                <div className="staged-docs__list">
                    {Object.keys(documents).map(key =>
                        <StagedDocItem 
                        key={key}
                        id={key} />
                    )}
                </div>
            </div>
        )
    }
}
