import React from 'react'
import './Css/base.css'
import FitLayout from './ContainerLayout/FitLayout'
import AbsoluteLayout from './ContainerLayout/AbsoluteLayout'
import CardLayout from './ContainerLayout/CardLayout'
import VBoxLayout from './ContainerLayout/VBoxLayout'
import HBoxLayout from './ContainerLayout/HBoxLayout'
class BaseContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            styleBase: "base",
            layout: "FitLayout",
            listLayout: [
                {
                    name: "FitLayout",
                    className: "fitlayout",
                    element: FitLayout,

                },
                {
                    name: "AbsoluteLayout",
                    className: "absolutelayout",
                    element: AbsoluteLayout,
                },
                {
                    name: "CardLayout",
                    className: "cardlayout",
                    element: CardLayout,
                },
                {
                    name: "VBoxLayout",
                    className: "vboxlayout",
                    element: VBoxLayout,
                },
                {
                    name: "HBoxLayout",
                    className: "hboxlayout",
                    element: HBoxLayout,
                },
            ],
        }
    }

    getElementLayout() {
        var m = this
        if (m && m.props && m.props.layout) {
            var layout = m.state.listLayout.find(item => item.name === m.props.layout)
            if (layout) {
                return layout.element
            }
        }
        return FitLayout
    }

    render() {
        var el = this.getElementLayout(),
            component = React.createElement(el, this.props)
        return (
            component
        )
    }
}
export default BaseContainer
