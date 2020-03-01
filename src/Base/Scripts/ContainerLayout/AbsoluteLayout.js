import React, { Component } from 'react'
import BaseLayout from './BaseLayout'
import '../Css/absolutelayout.css'

class AbsoluteLayout extends BaseLayout {
    constructor() {
        super()
    }
    styleForAbsolute(style) {
        var listStyle = [{
            nameStyle: 'top',
            nameProp: 'Top',
        },
        {
            nameStyle:'bottom',
            nameProp:'Bottom',
        },
        {
            nameStyle:'left',
            nameProp:'Left',
        },
        {
            nameStyle:'right',
            nameProp:'Right',
        }]
        listStyle.forEach((item)=>{
            style[item.nameStyle] = this.props[item.nameProp]
        })
        return style
    }
    render() {
        var className = this.getClassName(),
            children = this.getChildren(),
            style = this.getStyle()
        style = this.styleForAbsolute(style)
        return (
            <div className={className} style={style}>
                {children.map(item => (item))}
            </div>
        )
    }
}

export default AbsoluteLayout
