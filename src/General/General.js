import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import './general.css'
import logo from '../staticna/logo.png'
import user from '../staticna/user.png'
import logo_sm from '../staticna/Logo_sm.png'
/**
 * created by nnanh 08/03/2020
 * class chung cho các màn hình bên trong
 * gồm header footer, khung cho nội dung và sidebar
 */
class General extends React.Component {
    title = [
        {
            className: 'user-sidebar-menu',
        },
        {
            className: 'fa fa-home',
            textTitle: 'Trang chủ',
            href: '#',
            title: [],
        },
        {
            className: 'fa fa-home',
            textTitle: 'Quản lý người dùng',
            href: '#',
            title: [
                {
                    className: '',
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý người sử dụng',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý sử dụng thẻ',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý sử dụng PINCode',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý bộ phận phòng ban',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý sử dụng tủ',
                    href: '#',
                    title: [],
                },
            ]
        },
        {
            className: 'fa fa-exclamation-triangle',
            textTitle: 'Quản lý thiết bị',
            href: '#',
            title: [
                {
                    className: '',
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý tòa nhà',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý tầng',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý tủ',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý kho thẻ từ',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý thiết bị điều khiển',
                    href: '#',
                    title: [],
                },
            ]
        },
        {
            className: 'fa fa-exclamation-triangle',
            textTitle: 'Cảnh báo',
            href: '#',
            title: [],
        },
        {
            className: 'fa fa-tasks',
            textTitle: 'Báo cáo',
            href: '#',
            title: [
                {
                    className: '',
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Báo cáo sự kiện thời gian thực',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Báo cáo trạng thái',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Báo cáo lịch sử dụng tủ',
                    href: '#',
                    title: [],
                },
            ]
        },
        {
            className: 'fa fa-tasks',
            textTitle: 'Quản trị hệ thống',
            href: '#',
            title: [
                {
                    className: '',
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Thêm tài khoản quản trị',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý quyền hạn của quản trị',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý quyền hạn của quản trị',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Thêm thẻ từ mới',
                    href: '#',
                    title: [],
                },
                {
                    className: 'fa fa-fw fa-chevron-right',
                    textTitle: 'Quản lý sử dụng thẻ',
                    href: '#',
                    title: [],
                },
            ]
        },
    ]
    constructor() {
        super()
        this.onClickToToggleClassSidebar = this.onClickToToggleClassSidebar.bind(this)
        this.state = {
            isRender: true,
        }
    }
    /**
     * Mở sibling của thẻ A
     * Nếu có thì mở không có thì ko làm gì
     */
    onClickElementA(e) {
        let siblingUL = e.currentTarget.parentElement.querySelector('ul')
        if (siblingUL) {
            let display = siblingUL.style.display
            if (display === 'none') {
                siblingUL.style.display = ''
            }
            else {
                siblingUL.style.display = 'none'
            }
        }
    }

    createTitleElementA({ className = '', textTitle = '', href = '#', onClick = '' }) {
        return <a href={href} onClick={this.onClickElementA.bind(this)}>
            <i className={className}></i>
            <span>{textTitle}</span>
        </a>
    }

    createElementLi({ className = '', textTitle = '', title = [] }) {
        let me = this, elementUL,
            elementA = me.createTitleElementA({ className: className, textTitle: textTitle })
        if (title && title.length > 1) {
            elementUL = me.createElementUL({ title: title }, false)
        }
        return <li>
            {elementA}
            {elementUL}
        </li>
    }

    createElementUL({ title = [] }, isVisible = true) {
        let me = this, listLI = []
        if (title && title.length < 2) {
            return
        }
        title.forEach((til, index) => {
            if (index > 0) {
                listLI.push(me.createElementLi({ className: til.className, textTitle: til.textTitle, title: til.title }))
            }
        })
        let style = {
            display: isVisible ? '' : 'none',
        }
        return <ul style={style} className={title[0].className}>
            {listLI}
        </ul>
    }
    /**
     * bật tắt class của ref `ngocanh`
     */
    onClickToToggleClassSidebar() {
        this.refs.ngocanh.classList.toggle('sidebar-open')
        if (typeof (this.props.ToggleSideBar) === 'function') {
            this.props.ToggleSideBar()
        }
    }
    render() {
        const me = this, className = `${me.props.className || ''} ngocanh`,
            elementUL = me.createElementUL({ title: me.title })
        return (
            <div className={className} ref="ngocanh">
                <div className="sidebar">
                    <div className='user-panel'></div>
                    {elementUL}
                    {/* <ul className='user-sidebar-menu'>
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
                            <ul>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý người sử dụng</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý sử dụng thẻ</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý sử dụng PINCode</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý bộ phận phòng ban</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý sử dụng tủ</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href='# '>
                                <i className='fa fa-exclamation-triangle'></i>
                                <span>Quản lý thiết bị</span>
                            </a>
                            <ul>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý tòa nhà</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý tầng</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý tủ</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý kho thẻ từ</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý thiết bị điều khiển</span>
                                    </a>
                                </li>
                            </ul>
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
                            <ul>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Báo cáo sự kiện thời gian thực</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Báo cáo trạng thái</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Báo cáo lịch sử dụng tủ</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href='# '>
                                <i className='fa fa-tasks'></i>
                                <span>Quản trị hệ thống</span>
                            </a>
                            <ul>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Thêm tài khoản quản trị</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý quyền hạn của quản trị</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Thêm thẻ từ mới</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#'>
                                        <i className="fa fa-fw fa-chevron-right"></i>
                                        <span>Quản lý sử dụng thẻ</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul> */}
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
                                <input hidden id='tokenNgocAnh'/>
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
