import React from 'react'
import BaseLayout from './BaseLayout'
class CardLayout extends BaseLayout{
    constructor(){
        super()
    }
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
export default CardLayout
