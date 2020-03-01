import React, {Component} from 'react'

class OperatorButton extends Component{
    constructor(){
        super()
        this.state = {
            listOperator:[
                "/",
                '-',
                '+',
                '='
            ]
        }
    }
    onClickOperator(operator){
        this.props.parent.refs.screen.addOperator(operator)
    }
    render() {
        return (
            <div className={this.props.className}>
                {this.state.listOperator.map(item=>(
                    <button onClick={()=>this.onClickOperator(item)} key={Math.random()} className={"operator-child"}>{item}</button>
                ))}
            </div>
        )
    }
}

export default OperatorButton;