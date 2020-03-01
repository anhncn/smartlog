import React from 'react'
import BaseLayout from './BaseLayout'
import BaseContainer from '../BaseContainer'

class VHBoxLayout extends BaseLayout{
    constructor(){
        super()
    }
    /**
     * Tính toán width height của các child
     * @param {____ danh sách child} children 
     * @param {______ thuộc tính cần tính toán( 'width'|| 'height')} wdhg 
     */
    setWdHgChild(children, wdhg = 'width') {
        var nbFx = 0, strWd = `100%`, childRt = []
        children.forEach(el => {
            var fx = parseInt(el.props.Flex), wd = el.props[wdhg]
            if (typeof (fx) === "number" && !isNaN(fx)) {
                nbFx += fx
            } else if (wd) {
                strWd += ` - ${wd}`
            }
        });
        strWd = `((${strWd}) / ${nbFx})`
        children.forEach(el => {
            var wd = el.props[wdhg], hg = ''
            if (el && el.props) {
                var fx = parseInt(el.props.Flex)
                if (typeof (fx) === "number" && !isNaN(fx)) {
                    wd = `calc(${strWd} * ${fx})`
                }
            }
            if (wdhg !== 'width') { hg = wd; wd = '' }

            childRt.push(<BaseContainer width={wd} height={hg}>{el}</BaseContainer>)
        })
        return childRt;
    }

    getStyle(){
        return super.getStyle([])
    }
}

export default  VHBoxLayout