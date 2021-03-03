import { TextField } from '@material-ui/core'
import React, { Component } from 'react'
import './AddSim.css'
import ChooseSims from './ChooseSims/ChooseSims'
 
export default class AddSim extends Component {
    render() {
        return (
            <form className="add-sim">
                <TextField 
                id="outlined-basic" 
                label="שם התיקייה" />
                <ChooseSims />
            </form>
        )
    }
}
