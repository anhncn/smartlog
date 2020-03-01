import React from 'react'
import BaseLayout from './BaseLayout'
import '../Css/fitlayout.css'

class FitLayout extends BaseLayout{
    render(){
        var className = this.getClassName(),
            children = this.getChildren(),
            style = this.getStyle();
        return(
            <div className={className} style={style}>
                {children.map(item=>(item))}
            </div>
        )
    }
}

export default  FitLayout;