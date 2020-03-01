import React from 'react'
class BaseLayout extends React.Component {
    constructor() {
        super()
    }

    stateParent = {
        styleBase: "base",
        layout: "FitLayout",
        listLayout: [
            {
                name: "FitLayout",
                className: "fitlayout",
            },
            {
                name: "AbsoluteLayout",
                className: "absolutelayout",
            },
            {
                name: "CardLayout",
                className: "cardlayout",
            },
            {
                name: "VBoxLayout",
                className: "vboxlayout",
            },
            {
                name: "HBoxLayout",
                className: "hboxlayout",
            },
        ],
        styleProperties: [
            "margin", "padding", "backgroundColor", "border", "borderRadius", "textAlign", "width", "height"
        ],
    }

    getClassName() {
        return `base ${this.constructor.name.toLowerCase()}`
    }

    getChildren() {
        if (this && this.props && this.props.children) {
            var child = this.props.children
            if(typeof(child.filter) == "function"){
                return this.props.children.filter(
                    function (children) {
                        if (typeof (children) != "object") {
                            return false;
                        }
                        return true;
                    }
                )
            }else{
                if(typeof(child) == "object") return [child]
            }
        }
        return []
    }

    getStyle(ignoreprop=[]) {
        var style = {},
            properties = this.stateParent.styleProperties,
            keys = Object.keys(this.props)
        keys.forEach((key) => {
            if (properties.includes(key) && !ignoreprop.includes(key)) {
                style[key] = this.props[key]
            }
        })
        return style
    }
}
export default BaseLayout
