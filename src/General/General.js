import React from 'react'
import './general.css'
import logo from '../staticna/logo.png'
import logo_sm from '../staticna/Logo_sm.png'
/**
 * created by nnanh 08/03/2020
 * class chung cho các màn hình bên trong
 * gồm header footer, khung cho nội dung
 * và sidebar
 */
class General extends React.Component {
    constructor(){
        super()
        this.onClickToToggleClassSidebar = this.onClickToToggleClassSidebar.bind(this)
    }
    /**
     * bật tắt class của ref `ngocanh`
     */
    onClickToToggleClassSidebar() {
        this.refs.ngocanh.classList.toggle('sidebar-open')
    }
    render() {
        return (
            <div className="ngocanh" ref="ngocanh">
                <div className="sidebar"></div>

                <div className="header">
                    <a onClick={this.onClickToToggleClassSidebar} className="logo">
                        <span className="logo-mini">
                            <img src={logo_sm} style={{ 'verticalAlign': 'middle', 'height': '70%', 'width': '70%', 'pointerEvents': 'none' }} />
                        </span>
                        <span className="logo-lg">
                            <img src={logo} style={{ 'verticalAlign': 'middle', 'height': '100%', 'width': '100%', 'pointerEvents': 'none' }} />
                        </span>
                    </a>
                    <div className="navbar"></div>
                </div>

                <div className="container">
                    <div className="content">
                        <div className="title">
                            <div className="txt-title">Canh bao</div>
                            <div className="home-title">Trang chu > canh bao</div>
                        </div>
                        <div className="grid">
                            {this.props.children}
                        </div>

                    </div>
                    <div className="footer" style={{fontSize:'13px', color:'#444'}}>
                        <strong>Copyright © 2019 <a href="#">Navistar</a>.</strong>
                        All rights reserved.
                    </div>
                </div>
            </div>
        )
    }
}

export default General;
