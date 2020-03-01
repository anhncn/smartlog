import React, {Component} from 'react'

class ClearButton extends Component{
    onClickClearScreen(){
        var me = this;
        me.props.parent.refs.screen.clearSreen();
    }
    render() {
        return (
            <button onClick={this.onClickClearScreen.bind(this)} className={this.props.className}>
                clear
            </button>
        )
    }
}

export default ClearButton;