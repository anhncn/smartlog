import React, {Component} from 'react'

class Button extends Component{
    handlerOnClick(){
        window.me = this;
        var value = this.refs.inputText.value;
        if(value === null || value === '') return
        this.props.parent.callOfDuty(value, (res)=>{
            this.refs.inputText.value = null
            if (!res){
                this.refs.inputText.placeholder = "do something to fix this..."
            }
        });
    }
    render() {
        console.log("renderer")
        return (
            <>
                <input ref="inputText" type="text" style={{'display':'block', 'width':'200px','marginBottom':'10px'}} placeholder="press name..." />
                <input type="button" onClick={this.handlerOnClick.bind(this)} style={{'display':'block', 'width':'205px'}} value="Add component" />
            </>
        )
    }
}

export default Button;