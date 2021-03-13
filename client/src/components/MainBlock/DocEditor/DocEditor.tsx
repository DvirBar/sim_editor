import React, { Component, Fragment } from 'react'
import './DocEditor.css'
import ChooseSims from './ChooseSims/ChooseSims'
import ModifyEditor from './ModifyEditor/ModifyEditor'
import { SimContext } from '../../../context/SimContext'
import { InfoContext } from '../../../context/InfoContext'
import ManageOptions from './ManageOptions/ManageOptions'

export default class DocEditor extends Component {
    render() {
        return (
            <div className="doc-editor-wrapper">
                <div className="doc-editor">
                    <SimContext.Consumer>
                        {context => 
                            <Fragment>
                                <ModifyEditor 
                                context={context}
                                selectedDoc={context.selectedDoc} />  

                                <InfoContext.Consumer>
                                    {infoContext => 
                                        infoContext.errors.docErrors[context.selectedDoc]?.ChaptersError &&
                                        <div className="errors">
                                            {infoContext.errors.docErrors[context.selectedDoc]?.ChaptersError}
                                        </div>
                                    }
                                </InfoContext.Consumer>

                                <ChooseSims /><br/>
                                <ManageOptions 
                                options={context.options}
                                toggleSuffle={context.toggleShuffle} />
                            </Fragment>
                        }
                    </SimContext.Consumer> 
                </div>
            </div>
            
        )
    }
}
