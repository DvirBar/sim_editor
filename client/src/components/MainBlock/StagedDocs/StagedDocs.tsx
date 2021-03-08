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
            selectDoc,
            selected
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
                        <Button
                        color={selected === key 
                            ? 'primary' : 'secondary'} 
                        variant="contained"
                        className={documents[key] === '' ? 'no-name' : ''}
                        onClick={() => selectDoc(key)}>
                            {documents[key] === '' 
                            ? '- ללא שם -' : documents[key]}
                        </Button>    
                    )}
                </div>
            </div>        
        )
    }
}
