import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { InfoContext } from '../../../../context/InfoContext'
import { SimContext } from '../../../../context/SimContext'
import './StagedDocItem.css'

interface IProps {
    id: string
}

export default class StagedDocItem extends Component<IProps> {

    render() {
        const {
            id
        } = this.props

        return (
            <SimContext.Consumer>
            {simContext => 
                <InfoContext.Consumer>
                    {infoContext =>
                        <Button
                        color={simContext.selectedDoc === id 
                            ? 'primary' : 'secondary'} 
                        variant="contained"

                        className={`${simContext.documents[id] === ''
                        ? 'no-name' : ''}
                        ${infoContext.errors.docErrors[id] ? 'error' : ''}`}

                        onClick={() => simContext.selectDoc(id)}>
                            {simContext.documents[id] === '' 
                            ? '- ללא שם -' : simContext.documents[id]}
                        </Button>    
                    }
                </InfoContext.Consumer>
            }
            </SimContext.Consumer>
        )
    }
}
