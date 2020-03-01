import React, {Component} from 'react'

class NumberButton extends Component{
    constructor(){
        super()
        this.state ={
            listButton:[
                7,8,9,4,5,6,1,2,3
            ],
        }
    }
    onCickNumberBtn(number){
        this.props.parent.refs.screen.addButtonToScreen(number);
    }
    render() {
        return (
            <div className={this.props.className}>
                {this.state.listButton.map(item=>(
                    <button onClick={()=>this.onCickNumberBtn(item)} key={Math.random()} className={"btn-number-child"}>{item}</button>
                ))}
            </div>
        )
    }
}

export default NumberButton;