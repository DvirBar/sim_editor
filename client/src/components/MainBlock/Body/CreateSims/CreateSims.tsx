import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { SimContext } from '../../../../context/SimContext'
import AddSim from '../AddSim/AddSim'
import StagedDocs from '../StagedDocs/StagedDocs'
import './CreateSims.css'

export default class CreateSims extends Component {
    render() {
        return (
        <SimContext.Consumer>
        {context => 
            <div className="create-sims">
                <Button 
                onClick={() => context.createDoc()}
                className="create-sims__create-button"
                variant="contained" color="primary">
                    יצירת סימולציה
                </Button>
                
               {Object.keys(context.documents).length > 0 && 
                    <div className="create-sims__body">
                        <AddSim 
                        changeDocName={context.changeDocName}
                        selectedId={context.selectedDoc}
                        name={context.documents[context.selectedDoc]} />

                        <StagedDocs 
                        selected={context.selectedDoc}
                        selectDoc={context.selectDoc}
                        documents={context.documents} />
                    </div>
                }
            </div>
        }
        </SimContext.Consumer>
        )
    }
}
