import React, { Component } from 'react'
import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset } from '@material-ui/core';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

export default class RTL extends Component {
    render() {
        return (
            <StylesProvider jss={jss}>
                {this.props.children}
            </StylesProvider>
        )
    }
}
