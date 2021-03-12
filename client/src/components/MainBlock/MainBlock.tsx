import React, { Component } from 'react';
import './MainBlock.css'
import { SimContext } from '../../context/SimContext';
import { Button } from '@material-ui/core';
import DocEditor from './DocEditor/DocEditor';
import StagedDocs from './StagedDocs/StagedDocs';

interface IProps {}

interface IState {
    display: boolean
}

export default class MainBlock extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props) 

        this.state = {
            display: false
        }
    }

    changeDisplay = (status: boolean) => {
        this.setState({
            display: status
        })
    }
    
    render() {
        return (
            <SimContext.Consumer>
                {context => 
                <div className="main-block">
                    <div className="main-block__top-bar">
                        <Button 
                        onClick={() => context.createDoc()}
                        className="main-block__top-bar__create-button"
                        variant="contained" color="primary">
                            סימולציה חדשה
                        </Button>

                        {Object.keys(context.documents).length > 0 && 
                        <div className="display-staged-sims">
                            <Button 
                            color="secondary"
                            variant="contained"
                            className="display-staged-sims"
                            onClick={() => this.setState({ display: true })}>
                                הצגת סימולציות
                            </Button>
                        </div> }
                    </div>
                    
                    {Object.keys(context.documents).length > 0 && 
                        <div className="main-block__body">
                            {context.selectedDoc in context.documents
                            ?   <DocEditor />
                            :   <div className="main-block__body__no-doc">
                                    <span>בחרו סימולציה</span>
                                </div>
                            }
                            <StagedDocs 
                            display={this.state.display}
                            changeDisplay={this.changeDisplay}
                            documents={context.documents} />
                        </div>
                    }
                </div>
                }
            </SimContext.Consumer>
        )
    }
}


