import React, { Component } from 'react'
import BaseLayout from './BaseLayout'
import BaseContainer from '../BaseContainer'
import VHBoxLayout from './VHBoxLayout'
import '../Css/hboxlayout.css'

class HBoxLayout extends VHBoxLayout {
    
    render() {
        var m = this, className = m.getClassName(),
            children = m.getChildren(),
            style = m.getStyle();
        children = m.setWdHgChild(children);
        return (
            <div className={className} style={style}>
                {children.map(item => (item))}
            </div>
        )
    }
}

export default HBoxLayout
