import { TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { Component } from 'react'
import { SimContextState } from '../../../../context/SimContext'
import './ModifyEditor.css'

interface IProps {
    context: SimContextState
    selectedDoc: string
}

interface IState {
    name: string
}

export default class ModifyEditor extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props)

        this.state = {
            name: this.props.context.documents[this.props.selectedDoc] || ''
        }
    }

    changeName = (name:string) => {
        this.setState({
            name
        })
    }

    changeDocName = () => {  
        const {
            context,
            selectedDoc
        } = this.props
        context.changeDocName(selectedDoc, this.state.name)
    }
    
    componentDidUpdate(prevProps: IProps) {
        if(prevProps.selectedDoc !== this.props.selectedDoc) {
            this.setState({ 
                name: this.props.context.documents[this.props.selectedDoc]
            })
        }
    }

    render() {
        const {
            context,
            selectedDoc
        } = this.props
        
        return (
            <div className="modify-editor">
                <TextField 
                id="outlined-basic"
                value={this.state.name}
                onChange={e => this.changeName(e.target.value)} 
                onBlur={() => this.changeDocName()}
                label="שם הסימולציה" />
                <Delete 
                onClick={() => context.removeDoc(selectedDoc)}
                className="remove-doc" />
            </div>
        )
    }
}
