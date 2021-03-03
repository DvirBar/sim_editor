import React, { Component } from 'react'
import axios from 'axios'

interface IProps {}

interface IState {
    simData: SimData | {}
}

interface SimData {
    chaptersTranslate: Object,
    excludeChapters: Object,
    monthsList: Array<Object>,
    monthsTranslate: Object,
    years: Object
}

export default class ChooseSims extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            simData: {}
        }
    }

    componentDidMount() {
        // Set loading
        axios.get('/api/simList')
             .then(res => {
                 this.setState({ simData: res.data })
                 console.log(res.data)
             })
             .catch(err => console.log(err)) 
    }



    render() {
        return (
            <div className="">
                
            </div>
        )
    }
}
