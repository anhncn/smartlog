import React, {Component} from 'react'

class Screen extends Component{
    constructor(){
        super()
        this.state = {
            expressionFirst: 0,
            expressionSecond:0,
            txtScreen: '0',
            operator:''
        }
    }
    addOperator(operator){
        var me = this
        var state = this.state
        if('/' == operator || '-' == operator || '+' == operator){
            state.operator = operator
            me.setState(state, ()=>{
                // alert(`screen ${this.state.operator}`)
            })
        }
        else{
            if(operator == ''){
                return
            }
            else{
                me.caculate()
            }
        }
    }
    caculate(){
        var expressionSecond = parseFloat(this.state.txtScreen)
        var result = expressionSecond
        switch(this.state.operator){
            case '/':
                result = (this.state.expressionFirst / expressionSecond).toFixed(2)
                break
            case '-':
                result = this.state.expressionFirst - expressionSecond
                break
            case '+':
                result = this.state.expressionFirst + expressionSecond
                break
        }
        if(parseInt(result) == result){
            result = parseInt(result)
        }
        this.setState({
            expressionFirst:0,
            operator:"",
            txtScreen: result+""
        })
    }
    clearSreen(){
        this.setState({
            txtScreen:"0",
            expressionFirst:0,
            expressionSecond:0,
            operator:""
        })
    }
    addButtonToScreen(number){
        var me = this
        var state = this.state
        try {
            if(number === null || number === undefined){
                alert("error")
                return
            }
            var num = parseFloat(number)
            var operator = state.operator
            if('/' == operator || '-' == operator || '+' == operator){
                state.expressionFirst = parseFloat(state.txtScreen)
                state.txtScreen = number+""
                this.setState(state)
            }
            else{
                state.txtScreen += number+""
                state.txtScreen = me.removeZeroFrontLine(state.txtScreen);
                this.setState(state)
            }
        } catch {
            alert("error")
            return
        } 
    }

    removeZeroFrontLine(stringNumber){
        if(stringNumber.length > 0){
            if(stringNumber[0] == '0'){
                return stringNumber.substring(1, stringNumber.length)
            }
        }
        return stringNumber
    }
    render() {
        return (
            <div className={this.props.className}>
                {this.state.txtScreen}
            </div>
        )
    }
}

export default Screen;
