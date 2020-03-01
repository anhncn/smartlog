import React, {Component} from 'react';
import Screen from './Screen'
import ClearButton from './ClearButton'
import NumberButton from './NumberButton'
import OperatorButton from './OperatorButton'
import './App.css'
class Caculator extends Component{
    render(){
        return(
          <div className="caculator-project">
            <Screen className="screen" parent={this} ref="screen" />
            <ClearButton className="btn-clear" parent={this} ref="btnClear" />
            <NumberButton className="btn-number" parent={this} ref="btnNumber" />
            <OperatorButton className="btn-operator" parent={this} ref="btnOperator" />
          </div>
        )
      }
}
export default Caculator;