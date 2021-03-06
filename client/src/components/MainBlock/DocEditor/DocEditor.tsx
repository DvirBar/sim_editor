import { TextField } from '@material-ui/core'
import React, { Component } from 'react'
import './DocEditor.css'
import ChooseSims from './ChooseSims/ChooseSims'

interface IProps {
    changeDocName: (id: string, name: string) => void
    name: string
    selectedId: string 
}
 
export default class DocEditor extends Component<IProps> {
    render() {
        const {
            changeDocName,
            name,
            selectedId
        } = this.props

        return (
            <form className="add-sim">
                <TextField 
                id="outlined-basic"
                value={name}
                onChange={e => changeDocName(selectedId, e.target.value)} 
                label="שם הסימולציה" />
                <ChooseSims />
            </form>
        )
    }
}
