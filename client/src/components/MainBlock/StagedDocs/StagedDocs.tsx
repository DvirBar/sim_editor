import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Documents } from '../../../interfaces/simData'
import './StagedDocs.css'

interface IProps {
    selected: string
    selectDoc: (id: string) => void
    documents: Documents
}

export default class StagedDocs extends Component<IProps> {
    render() {
        const {
            documents,
            selectDoc
        } = this.props

        return (
            <div className="staged-docs">
                <div className="staged-docs__title">
                    הסימולציות שלי:
                </div>
                <div className="staged-docs__list">
                    {Object.keys(documents).map(key =>
                        <Button
                        color="secondary" 
                        variant="contained"
                        onClick={() => selectDoc(key)}>
                            {documents[key] === '' 
                            ? 'ללא שם' : documents[key]}
                        </Button>    
                    )}
                </div>
            </div>        
        )
    }
}
