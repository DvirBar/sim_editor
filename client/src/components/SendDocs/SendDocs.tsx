import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { SimContext } from '../../context/SimContext'

interface IProps {}
interface IState {
    downloadLink: any
}

export default class SendDocs extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        
        this.state = {
            downloadLink: ''
        }
    }

    static contextType = SimContext

    donwloadFiles = async() => {
        try {
            this.setState({
                downloadLink: ''
            })
            
            const url = await this.context.composeDocs()

            if(url) {
                this.setState({
                    downloadLink: url
                })

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'mySimulations.zip');
                document.body.appendChild(link);
                link.click();
            }
        }
        catch(err) {}
    }


    render() {
        return (
            <SimContext.Consumer>
                {context => 
                    Object.keys(context.documents).length > 0 &&
                    <div className="send-docs">
                        <Button 
                        color="primary"
                        variant="contained"
                        onClick={() => this.donwloadFiles()}>
                            יצירת סימולציות
                        </Button>

                        {this.state.downloadLink &&
                            <div className="try-donwload-again">
                                <span>ההורדה תחל אוטומטית. אם ההורדה לא החלה&nbsp;</span>
                                <a href={this.state.downloadLink} download="mySimulations.zip">
                                    לחצו כאן
                                </a>
                            </div>                      
                        }
                    </div>
                }
            </SimContext.Consumer>
        )
    }
}
