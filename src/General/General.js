import React from 'react'
import './general.css'
import 'font-awesome/css/font-awesome.min.css';
import logo from '../staticna/logo.png'
import logo_sm from '../staticna/Logo_sm.png'
import user from '../staticna/user.png'
/**
 * created by nnanh 08/03/2020
 * class chung cho các màn hình bên trong
 * gồm header footer, khung cho nội dung và sidebar
 */
class General extends React.Component {
    constructor() {
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
                <div className="sidebar">
                    <div className='user-panel'></div>
                    <ul className='user-sidebar-menu'>
                        <li>
                            <a href='# '>
                                <i className='fa fa-home'></i>
                                <span>Trang chủ</span>
                            </a>
                        </li>
                        <li>
                            <a href='# '>
                                <i className="fa fa-home"></i>
                                <span>Quản lý người dùng</span>
                            </a>
                        </li>
                        <li>
                            <a href='# '>
                                <i className='fa fa-exclamation-triangle'></i>
                                <span>Quản lý thiết bị</span>
                            </a>
                        </li>
                        <li>
                            <a href='# '>
                                <i className='fa fa-exclamation-triangle'></i>
                                <span>Cảnh báo</span>
                            </a>
                        </li>
                        <li>
                            <a href='# '>
                                <i className='fa fa-tasks'></i>
                                <span>Báo cáo</span>
                            </a>
                        </li>
                        <li>
                            <a href='# '>
                                <i className='fa fa-tasks'></i>
                                <span>Quản trị hệ thống</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="header">
                    <a href='# ' onClick={this.onClickToToggleClassSidebar} className="logo">
                        <span className="logo-mini">
                            <img src={logo_sm} alt='no img' style={{ 'verticalAlign': 'middle', 'height': '70%', 'width': '70%', 'pointerEvents': 'none' }} />
                        </span>
                        <span className="logo-lg">
                            <img src={logo} alt='no img' style={{ 'verticalAlign': 'middle', 'height': '100%', 'width': '100%', 'pointerEvents': 'none' }} />
                        </span>
                    </a>
                    <div className="navbar">
                        <div className='navbar-custom-menu'>
                            <div className='message-menu'></div>
                            <div className='user-menu'>
                                <a href='# '>
                                    <img src={user} className="user-image" alt="user img" />
                                    <span>Nguyễn Công Ngọc Anh</span>
                                </a>
                                <div className='dropdown-menu'>
                                    <div className='user-dropdown-header'>
                                        <img src={user} className="img-circle" height='90' alt="user img" />
                                        <p>Nguyễn Công Ngọc Anh</p>
                                    </div>
                                    <div className='user-dropdown-footer'>
                                        <a href="# ">Đổi mật khẩu</a>
                                        <a href="# ">Đăng xuất</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="content">
                        <div className="title">
                            <div className="txt-title">{this.props.Title || `Canh bao`}</div>
                            <div className="home-title">Trang chủ > {this.props.Title || `Canh bao`}</div>
                        </div>
                        <div className="grid">
                            {this.props.children}
                        </div>

                    </div>
                    <div className="footer" style={{ fontSize: '13px', color: '#444' }}>
                        <strong>Copyright © 2019 <a href="# ">Navistar</a>.</strong>
                        All rights reserved.
                    </div>
                </div>
            </div>
        )
    }
}

export default General;
