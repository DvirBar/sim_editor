import React, { Component } from 'react'
import './DocEditor.css'
import ChooseSims from './ChooseSims/ChooseSims'
import ModifyEditor from './ModifyEditor/ModifyEditor'
import { SimContext } from '../../../context/SimContext'

export default class DocEditor extends Component {
    render() {
        return (
            <div className="doc-editor">
                <SimContext.Consumer>
                    {context => 
                        <ModifyEditor 
                        context={context}
                        selectedDoc={context.selectedDoc} />                    
                    }
                </SimContext.Consumer>
                <ChooseSims />
            </div>
        )
    }
}
