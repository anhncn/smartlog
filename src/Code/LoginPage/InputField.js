import React from 'react'

class InputField extends React.Component{
    constructor(){
        super()
        this.state = {
            clsInput:"input-field ",
        }
    }
    render(){
        var padding = ""
        var margin = ""
        if(!(this.props.padding === null || this.props.padding === undefined)){
            padding = this.props.padding.split(' ').join('px ') + 'px'
        }
        if(!(this.props.margin === null || this.props.margin === undefined)){
            margin = this.props.margin.split(' ').join('px ') + 'px'
        }
        var styleDivInput = {
            margin: margin,
            padding: padding,
        }
        var hasLabel = this.props.hasLabel !== false
        var clsInput = this.state.clsInput + this.props.clsInput
        return(
            <div style={styleDivInput}>
                {hasLabel &&
                <div>
                    <label htmlFor={this.props.id} >{this.props.textLabel}</label>
                </div>}
                <div className={clsInput}>
                    <input value={this.props.value} id={this.props.id} type={this.props.typeInput} ></input>
                </div>
            </div>
        )
    }
}
export default InputField;
