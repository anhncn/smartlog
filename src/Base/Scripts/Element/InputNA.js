import React from 'react'
import BaseElementNA from './BaseElementNA'
import '../Css/inputna.css'

class InputNA extends BaseElementNA {
    constructor() {
        super()
    }
    getElLabel(id) {
        if (this.props.hasLabel == false) {
            return false
        }
        return <div className="label-element">
            <label htmlFor={id} >{this.props.textLabel}</label>
        </div>
    }
    render() {
        var me = this,
            id = `ipn${parseInt(Math.random() * 100)}`,
            elLabel = me.getElLabel(id)
        return (
            <div style={{ backgroundColor: this.props.backgroundColor }}>
                {elLabel}
                <div className="input-element">
                    {/* <label htmlFor={id} >{this.props.textLabel}</label> */}
                    <input value={this.props.value} id={id} type={this.props.typeInput}></input>
                </div>
            </div>
        )
    }
}
export default InputNA;

