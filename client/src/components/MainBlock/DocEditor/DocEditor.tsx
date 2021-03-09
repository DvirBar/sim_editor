import React, { Component, Fragment } from 'react'
import './DocEditor.css'
import ChooseSims from './ChooseSims/ChooseSims'
import ModifyEditor from './ModifyEditor/ModifyEditor'
import { SimContext } from '../../../context/SimContext'
import { InfoContext } from '../../../context/InfoContext'

export default class DocEditor extends Component {
    render() {
        return (
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
                        </Fragment>
                    }
                </SimContext.Consumer>
                
                <ChooseSims />
            </div>
        )
    }
}
