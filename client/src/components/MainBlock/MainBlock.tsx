import React, { Component } from 'react';
import './MainBlock.css'
import { SimContext } from '../../context/SimContext';
import { Button } from '@material-ui/core';
import DocEditor from './DocEditor/DocEditor';
import StagedDocs from './StagedDocs/StagedDocs';

interface IProps {}

interface IState {
    selectedTab: number
}

export default class MainBlock extends Component<IProps, IState> {

    render() {
        return (
            <SimContext.Consumer>
                {context => 
                <div className="main-block">
                    <Button 
                    onClick={() => context.createDoc()}
                    className="main-block__create-button"
                    variant="contained" color="primary">
                        יצירת סימולציה
                    </Button>
                    
                    {Object.keys(context.documents).length > 0 && 
                        <div className="main-block__body">
                            <DocEditor
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


