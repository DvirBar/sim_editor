import { Checkbox } from '@material-ui/core'
import React, { Component } from 'react'
import { SimDataOptions } from '../../../../interfaces/simData'
import './ManageOptions.css' 

interface IProps {
    options: SimDataOptions
    toggleSuffle: (value: boolean) => void
}

export default class ManageOptions extends Component<IProps> {
    render() {
        const {
            options,
            toggleSuffle
        } = this.props
        
        return (
            <div className="manage-options">
                <Checkbox
                color="primary"
                checked={options.shuffleData}
                onChange={(e) => toggleSuffle(e.target.checked)}
                inputProps={{ 'aria-label': 'primary checkbox' }} />
                <label className="checkbox-label">
                    <span className="checkbox-label__main">
                        סדר אקראית &nbsp;
                    </span>
                    <span className="checkbox-label__comment"> 
                        (אם תסמנו אפשרות זו, סידור הפרקים לא ייחשב)
                    </span>
                </label>
                
            </div>
        )
    }
}
