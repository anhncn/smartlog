import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './component.css'

var NgocAnh = {
    Enumeration: {
        KeyCode: {
            ArrowUp: 38,
            ArrowDown: 40,
            Enter: 13,
            KeyTab: 9,
        }
    }
}
/**
 * component cho form gồm thẻ input và label của thẻ
 * nnanh 13.03.2020
 */
class InputNA extends Component {
    /**
     * textLabel nội dung của label
     * ID id của input để label for được
     * kiểm tra có label thì trả về label
     * hasLabel == false thì không hiển thị label
     */
    getElementLabel(id, hasLabel = true, contentLabel) {
        return !hasLabel ||
            <div className="label-element">
                <label htmlFor={id} >{contentLabel}</label>
            </div>
    }
    /**
     * className custom form
     * ID id của input để label for được
     * type kiểu dữ liệu, value dữ liệu của input
     */
    render() {
        let me = this, id = this.props.ID, value = this.props.value,
            classList = `${this.props.className || ''} form-inputna`,
            placeholder = this.props.placeholder, typeInput = this.props.typeInput,
            label = me.getElementLabel(id, this.props.hasLabel, this.props.textLabel)
        return (
            <div className={classList}>
                {label}
                <div className="input-element">
                    <input id={id} type={typeInput} value={value} placeholder={placeholder} onClick={this.props.onClick} ></input>
                </div>
            </div>
        )
    }
}
/**
 * component cho form gồm thẻ select và label của thẻ
 * nnanh 13.03.2020
 */
class SelectFormNA extends Component {
    constructor() {
        super()
        this.state = {
            isRenderOption: false,
        }
    }
    /**
     * Đổ option vào từ props data dạng stringify
     */
    getOption() {
        try {
            let options = [], records = JSON.parse(this.props.data)
            if (records && records.length > 0) {
                for (let i = 0; i < records.length; i++) {
                    let record = records[i]
                    options.push(<option key={record.value} value={record.value}>{record.display}</option>)
                }
                return this.state.isRenderOption ? options : []
            }
            return []
        }
        catch (e) {
            return []
        }
    }
    /**
     * textLabel nội dung của label
     * ID id của input để label for được
     * kiểm tra có label thì trả về label
     * hasLabel == false thì không hiển thị label
     */
    getElementLabel(hasLabel = true, contentLabel) {
        return !hasLabel ||
            <div className="label-element">
                <label>{contentLabel}</label>
            </div>
    }
    componentDidMount() {
        let me = this
        me.setState({
            isRenderOption: true,
        });
        console.log('mouth select')
    }
    /**
     * className custom form
     * ID id của input để label for được
     * type kiểu dữ liệu, value dữ liệu của input
     */
    render() {
        let me = this,
            selection = me.getOption(),
            classList = `${this.props.className || ''} select-wrap-na`,
            label = me.getElementLabel(this.props.hasLabel, this.props.textLabel)
        return (
            <div className={classList}>
                {label}
                <div className="input-element">
                    <select ref={'selectionRef'} className='select-element'>
                        {selection}
                    </select>

                </div>
            </div>
        )
    }
}
/**
 * component cho box gồm title box
 * nội dung box và footer
 * nnanh 13.03.2020
 */
class BoxWrapNA extends Component {
    constructor() {
        super()
        this.onClickBox = this.onClickBox.bind(this)
    }
    onClickBox() {
        this.refs.boxBody.classList.toggle('toggle-box')
        this.refs.boxFooter.classList.toggle('toggle-box')
    }
    getChildren(children = []) {
        let body = [], footer = [], header = []
        children = [].concat(children)
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            switch (child.props.typeChild) {
                case 'body':
                    body.push(child)
                    break
                case 'header':
                    header.push(child)
                    break
                case 'footer':
                    footer.push(child)
                    break
                default:
                    body.push(child)
                    break
            }
        }
        return [header, body, footer]
    }
    componentDidMount() {
        console.log('mouth BoxWrapNA')
    }
    /**
     * Title của box
     * Sự kiện click vào box
     */
    render() {
        let children = this.props.children,
            classList = `${this.props.className || ''} box-wrap`,
            [childHeader, childrenBody, childrenFooter] = this.getChildren(children)
        return (
            <div className={classList}>
                <div className="box-header">
                    <div className='head-box-header'>
                        <div className="title-box">{this.props.Title || 'Title props'}</div>
                        <div className="box-tool">
                            <button onClick={this.onClickBox} className="btn btn-box-tool">
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>

                    </div>
                    <div className='content-header'>
                        {childHeader}
                    </div>
                </div>
                <div ref='boxBody' className='box-body'>
                    {childrenBody}
                </div>
                <div ref='boxFooter' className='box-footer'>
                    {childrenFooter}
                </div>
            </div>
        )
    }
}

/**
 * đối tượng lấy dữ liệu trả dữ liệu dạng stringify khi respone thành công
 * văng error khi gặp catch
 * nnanh 15.03.2020
 */
var httpRequest = {
    get({ method, data, url, async = true }) {
        return new Promise((resolve, reject) => {
            try {
                let xhttp = new XMLHttpRequest()
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        resolve(this.response)
                    }
                }
                xhttp.open(method, url, async)
                xhttp.setRequestHeader('Content-type', "application/json")
                // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                xhttp.send(JSON.stringify(data));
            }
            catch (e) {
                reject('Error')
            }
        })
    },
}
/**
 * Hỗ trợ tìm kiếm theo data text,
 * Làm mượt các hiệu ứng tìm kiếm
 * Many Feature
 */
class ComboboxNA extends Component {
    constructor() {
        super()
        this.inputRef = React.createRef()
        this.ulRefs = React.createRef()
        this.bodyInputRef = React.createRef()
        this.setData = this.setData.bind(this)
        this.getData = this.getData.bind(this)
        this.getElementLabel = this.getElementLabel.bind(this)
        this.createPlaceData = this.createPlaceData.bind(this)
        this.keyDownSelectLi = this.keyDownSelectLi.bind(this)
        this.inputTextSearch = this.inputTextSearch.bind(this)
        this.openBoundingList = this.openBoundingList.bind(this)
        this.closeBoundingList = this.closeBoundingList.bind(this)
        this.isVisblePlaceData = this.isVisblePlaceData.bind(this)
        this.mousedownDocument = this.mousedownDocument.bind(this)
        this.getAllIdCombobox = this.getAllIdCombobox.bind(this)
        this.setScrollTopCombobox = this.setScrollTopCombobox.bind(this)
        this.getElementPlaceData = this.getElementPlaceData.bind(this)
        this.onClickSetValueInput = this.onClickSetValueInput.bind(this)
        this.caculatePositionPlaceData = this.caculatePositionPlaceData.bind(this)
        this.onClickToggleBoundingList = this.onClickToggleBoundingList.bind(this)
    }
    // lấy dữ liệu từ prop dạng json
    getData() {
        let me = this, data = []
        try {
            return JSON.parse(me.props.data)
        }
        catch (e) {
            return data
        }
    }
    setData() {
        this.data = this.getData()
    }
    data = [
        { value: 1, display: 'Hà Nội' }
    ]
    // render danh sách combobox 
    pushData(data, isShow = false) {
        let me = this, liElements = [], element
        let placeData = me.createPlaceData()
        data.forEach((rec, index) => {
            let text = rec.display,
                recordindex = index, recordid = rec.value,
                onClick = me.onClickSetValueInput,
                liElement = <li role='option' unselectable='on'
                    tabIndex='-1' data-recordindex={recordindex}
                    data-recordid={recordid} className='x-boundlist-item'
                    data-boundview={`${this.props.ID}-picker`}
                    onClick={onClick} key={recordindex}>{text}</li>
            liElements.push(liElement)
        })
        element = <div className="bound-list">
            <div className="picker-listWrap" >
                <ul ref={me.ulRefs} data-selectid={-1}>
                    {liElements}
                </ul>
            </div>
        </div>
        ReactDOM.render(element, placeData)
        isShow ? me.openBoundingList() : me.closeBoundingList()
    }
    // tạo một element chứa danh sách combobox
    createPlaceData() {
        let me = this
        if (!me.getElementPlaceData()) {
            let placeData = document.createElement('DIV')
            placeData.className = 'anh thay la ko con thuong em nua y'
            placeData.setAttribute('data-componentid', this.props.ID)
            document.querySelector('body').appendChild(placeData)
        }
        return me.getElementPlaceData()
    }
    // lấy ra element chưa danh sách combobox
    getElementPlaceData() {
        return document.querySelector(`[data-componentid=${this.props.ID}]`)
    }
    // bật tắt danh sách combobox
    // xóa bỏ các class sinh ra khi sử dụng phím tắt trên li
    onClickToggleBoundingList() {
        let me = this, placeData = me.getElementPlaceData(),
            dataElement = placeData
        dataElement.classList.toggle('hidden-bound-list')
        if (!dataElement.classList.contains('hidden-bound-list')) {
            me.ulRefs.current.querySelectorAll('li').forEach(item => {
                item.classList.remove('active-movement')
            })
            let liActive = me.ulRefs.current.querySelector('li.active')
            if (liActive) {
                me.ulRefs.current.dataset.selectid = liActive.dataset.recordindex
            } else {
                me.ulRefs.current.dataset.selectid = -1
            }
        }
        me.inputRef.current.focus()
        me.caculatePositionPlaceData()
    }
    // đóng combobox
    closeBoundingList() {
        let me = this, placeData = me.getElementPlaceData()
        placeData.classList.add('hidden-bound-list')
    }
    // mở combobox
    openBoundingList() {
        let me = this, placeData = me.getElementPlaceData()
        placeData.classList.remove('hidden-bound-list')
        me.caculatePositionPlaceData()
    }
    // tính toán vị trí hiện cho combobox theo input
    caculatePositionPlaceData() {
        let me = this, placeData = me.getElementPlaceData(),
            bodyInput = me.bodyInputRef.current.getBoundingClientRect()
        placeData.style.top = bodyInput.bottom + 'px'
        placeData.style.left = bodyInput.left + 'px'
    }
    // đặt giá trị cho input khi click vào li
    onClickSetValueInput(element) {
        let dataRecord = {
            value: element.target.dataset.recordid,
            text: element.target.textContent,
            index: element.target.dataset.recordindex,
        }
        this.inputRef.current['data-record'] = JSON.stringify(dataRecord)
        this.inputRef.current.value = dataRecord.text

        // Thêm active cho phần tử được chọn
        this.ulRefs.current.querySelectorAll('li').forEach(item => { item.classList.remove('active') })
        element.target.classList.add('active')
        this.ulRefs.current.dataset.selectid = element.target.dataset.recordindex
        this.onClickToggleBoundingList()
    }
    // sự kiện khi bấm trên input
    // lọc các giá trị xuất hiện trong combobox
    inputTextSearch(e) {
        const me = this,
            content = e.target.value.toLowerCase(),
            data = me.data.filter(item => { return item.display.toLowerCase().includes(content) })
        me.pushData(data, true)
    }
    // nếu combobox ẩn và bấm nút xuống thì hiện
    // nếu combobox hiện thì todo
    keyDownSelectLi(e) {
        let me = this, idCurrent = 0, idNext = 0,
            allSelector = me.ulRefs.current.querySelectorAll('li'),
            lengthSelector = allSelector.length
        if (me.isVisblePlaceData()) {
            if (e.which === NgocAnh.Enumeration.KeyCode.ArrowDown || e.keyCode === NgocAnh.Enumeration.KeyCode.ArrowDown) {
                idCurrent = parseInt(me.ulRefs.current.dataset.selectid)
                idNext = idCurrent + 1
                if (idCurrent === lengthSelector - 1) {
                    idNext = 0
                }
                me.ulRefs.current.dataset.selectid = idNext
                if (idCurrent > - 1 && idCurrent < lengthSelector) {
                    allSelector[idCurrent].classList.remove('active-movement')
                }
                if (idNext > - 1 && idNext < lengthSelector) {
                    allSelector[idNext].classList.add('active-movement')
                }
                me.setScrollTopCombobox(false)
            }
            if (e.which === NgocAnh.Enumeration.KeyCode.ArrowUp || e.keyCode === NgocAnh.Enumeration.KeyCode.ArrowUp) {
                idCurrent = parseInt(me.ulRefs.current.dataset.selectid)
                idNext = idCurrent - 1
                if (idCurrent === 0) {
                    idNext = lengthSelector - 1
                }
                if (idCurrent === -1) {
                    idNext = 0
                }
                me.ulRefs.current.dataset.selectid = idNext
                if (idCurrent > - 1 && idCurrent < lengthSelector) {
                    allSelector[idCurrent].classList.remove('active-movement')
                }
                if (idNext > - 1 && idNext < lengthSelector) {
                    allSelector[idNext].classList.add('active-movement')
                }
                me.setScrollTopCombobox(true)
            }
            if (e.which === NgocAnh.Enumeration.KeyCode.Enter || e.keyCode === NgocAnh.Enumeration.KeyCode.Enter) {
                idCurrent = parseInt(me.ulRefs.current.dataset.selectid)
                if (idCurrent > - 1 && idCurrent < lengthSelector) {
                    allSelector[idCurrent].click()
                }
            }
            if (e.which === NgocAnh.Enumeration.KeyCode.KeyTab || e.keyCode === NgocAnh.Enumeration.KeyCode.KeyTab) {
                me.closeAllCombobox()
            }
        }
        else {
            if (e.which === NgocAnh.Enumeration.KeyCode.ArrowDown || e.keyCode === NgocAnh.Enumeration.KeyCode.ArrowDown) {
                this.openBoundingList()
            }
        }

    }
    setScrollTopCombobox(isUp) {
        let me = this, placeData = me.getElementPlaceData(),
            offsetTopELement = placeData.querySelector('.active-movement').offsetTop,
            heightCombobox = placeData.getBoundingClientRect().height,
            heightElement = placeData.querySelector('ul li').getBoundingClientRect().height
        if (isUp) {
            if (offsetTopELement < placeData.scrollTop) {
                placeData.scrollTop = offsetTopELement
            }
            else if (offsetTopELement >= placeData.querySelector('.bound-list').getBoundingClientRect().height - 2 * heightElement) {
                placeData.scrollTop = offsetTopELement - heightCombobox + heightElement
            }
        }
        else {
            if (offsetTopELement + heightElement > placeData.scrollTop + heightCombobox) {
                placeData.scrollTop = offsetTopELement - heightCombobox + heightElement
            }
            else if (offsetTopELement === 0) {
                placeData.scrollTop = offsetTopELement
            }
        }

    }
    // bấm chuột xuống ở màn hình
    // nếu bấm ra màn hình thì đóng combobox
    // updated thực thi tính toán cả những combobox khác
    mousedownDocument(e) {
        let me = this, idElement = e.target.getAttribute('id') || '',
            databound = e.target.getAttribute('data-boundview') || '',
            componentid = e.target.getAttribute('data-componentid') || '',
            listIdProps = me.getAllIdCombobox(),
            comboboxNotClose = []
        if (listIdProps.filter(item => { return databound.includes(item) || idElement.includes(item) || componentid.includes(item) }).length === 0) {
            me.closeAllCombobox()
            return
        }
        listIdProps.forEach((item, index) => {
            if (databound.includes(item + '-') || idElement.includes(item + '-') || componentid === item) {
                comboboxNotClose.push(item)
            }
        })
        me.closeAllCombobox(comboboxNotClose)
    }
    getAllIdCombobox() {
        let ids = []
        document.querySelectorAll('[data-componentid]').forEach(item => {
            ids.push(item.getAttribute('data-componentid'))
        })
        return ids
    }
    closeAllCombobox(listNotClose = []) {
        document.querySelectorAll('[data-componentid]').forEach(item => {
            let idItem = item.getAttribute('data-componentid')
            if (!listNotClose.includes(idItem)) {
                item.classList.add('hidden-bound-list')
            }
        })
    }
    // kiểm tra combobox có hiện ko
    isVisblePlaceData() {
        const placeData = this.getElementPlaceData()
        if (placeData.classList.contains('hidden-bound-list')) {
            return false
        }
        return true
    }
    // rendered
    componentDidMount() {
        const me = this;
        me.setData()
        me.pushData(me.data)
        document.onmousedown = me.mousedownDocument
    }
    getElementLabel(text, id, hasLabel = true) {
        return hasLabel && <div className='label-element'>
            <label id={`${id}-labelEl`}>{text}</label>
        </div>
    }
    render() {
        const id = this.props.ID;
        let className = this.props.className || '' + ' container-combobox',
            label = this.getElementLabel(this.props.textLabel, id, this.props.hasLabel)
        return (
            <div id={`${id}_Container`} className={className}>
                {label}
                <div id={`${id}-bodyEl`} ref={this.bodyInputRef} className="combobox-body" tabIndex='-1' onKeyDown={this.keyDownSelectLi}>
                    <div id={`${id}-triggerWrap`} className="combobox-triggerWrap">
                        <div id={`${id}-inputWrap`} className="combobox-inputWrap">
                            <input id={`${id}-inputEl`} ref={this.inputRef} onInput={this.inputTextSearch} type="text" className="combobox" />
                        </div>
                        <div id={`${id}-trigger-picker`} className="combobox-trigger-picker" onClick={this.onClickToggleBoundingList}></div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * Table component
 * nnanh 22.03.2020
 */
class TableNA extends Component {
    static nameComponent = 'TableNA'
    constructor() {
        super()
        this.tableWrapAll = React.createRef()
        this.headerNormal = React.createRef()
        this.headerLocked = React.createRef()
        this.bodyTable = React.createRef()
        this.bodyNormal = React.createRef()
        this.bodyLocked = React.createRef()
        this.scrollContainer = React.createRef()
        this.scrollLock = React.createRef()
        this.scrollNormal = React.createRef()
        this.getDataFillTable = this.getDataFillTable.bind(this)
        this.onScrollTable = this.onScrollTable.bind(this)
        this.getHeaderTable = this.getHeaderTable.bind(this)
        this.getChildrens = this.getChildrens.bind(this)
        this.getBodyRecordTable = this.getBodyRecordTable.bind(this)
        this.getBodyAndRecordTable = this.getBodyAndRecordTable.bind(this)
        this.isOverflow = this.isOverflow.bind(this)
        this.isOverflowVertical = this.isOverflowVertical.bind(this)
        this.isOverflowHorizontal = this.isOverflowHorizontal.bind(this)
        this.caculateBottomBodyTable = this.caculateBottomBodyTable.bind(this)
        this.setSizeScrollerTable = this.setSizeScrollerTable.bind(this)
        this.setPositionHeaderBodyScrollerNormalVsLocked = this.setPositionHeaderBodyScrollerNormalVsLocked.bind(this)
    }
    getDataFillTable() {
        let me = this, records = []
        try {
            records = JSON.parse(me.props.data)
        } catch (error) {
            return records
        }
        return records
    }
    /**
     * tính toán bottom của table chứa data
     * nếu chiều ngang của cột bị overflow thì cần 8px cho scroller => bottom 8px
     * và ẩn scroll đi..cái này tự vẽ ra không phải có sẵn nên cần ẩn
     * nếu không thì bottom 0
     */
    caculateBottomBodyTable() {
        let me = this
        if (me.isOverflowHorizontal(me.headerLocked) ||
            me.isOverflowHorizontal(me.headerNormal)) {
            me.bodyTable.current.style.bottom = me.scrollLock.current.getBoundingClientRect().height + 'px'
        }
        else {
            me.bodyTable.current.style.bottom = '0'
            me.scrollContainer.current.style.display = 'none'
        }
    }
    /**
     * đây là 1 scroller ảo ...
     * nó sẽ là thanh overflow ngang của table để nhìn dữ liệu
     * và nó cần có một transform có độ rộng bằng độ rộng bị overflow
     */
    setSizeScrollerTable() {
        let me = this,
            scrollWidthNormal = me.headerNormal.current.scrollWidth + 'px',
            scrollWidthLocked = me.headerLocked.current.scrollWidth + 'px'
        me.scrollNormal.current.querySelector('.scroller-spacer').
            style.transform = `translate3d(${scrollWidthNormal}, 0px, 0px)`;
        me.scrollLock.current.querySelector('.scroller-spacer').
            style.transform = `translate3d(${scrollWidthLocked}, 0px, 0px)`;
    }
    /**
     * tính toán lại vị trí header, body, thanh scroll ngang
     * của cột đã đóng băng và cột bình thường
     */
    setPositionHeaderBodyScrollerNormalVsLocked() {
        let me = this,
            widthLocked = me.headerLocked.current.getBoundingClientRect().width + 'px'
        me.headerNormal.current.style.left = widthLocked
        me.bodyNormal.current.style.left = widthLocked
        me.scrollContainer.current.style.setProperty('--width-scroller-lock', widthLocked)
    }
    isOverflow(ref) {
        return this.isOverflowHorizontal(ref) || this.isOverflowVertical(ref)
    }
    isOverflowVertical(ref) {
        let element = ref.current
        return element.clientHeight < element.scrollHeight
    }
    isOverflowHorizontal(ref) {
        let element = ref.current
        return element.clientWidth < element.scrollWidth
    }
    onScrollTable(head, body, scroller) {
        const scrollLeft = scroller.current.scrollLeft
        body.current.scrollLeft = scrollLeft
        head.current.scrollLeft = scrollLeft
    }

    getChildrens() {
        let me = this, childrens = [], childLock = [], childNormal = []
        if (me.props.children) {
            childrens = childrens.concat(me.props.children)
            childrens = childrens.filter(child => { return child.type.nameComponent === 'ColumnNA' })
            childLock = childrens.filter(child => { return child.props.isLocked === true })
            childNormal = childrens.filter(child => { return child.props.isLocked !== true })
        }
        return [childLock, childNormal]
    }
    getHeaderTable(columns = [], isLocked = false) {
        let me = this, header = []
        columns.forEach(child => {
            let text = child.props.text,
                style = {
                    width: `${child.props.Width}px`
                }
            header.push(<th style={style} className='column-header'>
                <div className='column-header-inner' title={text}>{text}</div>
            </th>)
        })
        return <table className='table-item'><tbody><tr>{header}</tr></tbody></table>
    }
    getBodyRecordTable(columns = [], isLocked = false) {
        let me = this, rowsInTable = [], records = me.getDataFillTable()
        records.forEach(rec => {
            let dataInRow = []
            columns.forEach(column => {
                let text = rec[column.props.DataIndex],
                    style = {
                        width: `${column.props.Width}px`
                    }
                dataInRow.push(<td className='table-cell' style={style}>
                    <div className='table-cell-inner' title={text}>{text}</div></td>)
            })
            rowsInTable.push(<table className='table-item'><tbody>
                <tr className='table-row'>{dataInRow}</tr></tbody></table>)
        })
        return <div className='table-item-container'>{rowsInTable}</div>
    }
    getBodyAndRecordTable(childrens = [], isLocked = false) {
        return [this.getHeaderTable(childrens, isLocked), this.getBodyRecordTable(childrens, isLocked)];
    }
    componentDidMount() {
        let me = this
        me.caculateBottomBodyTable()
        me.setPositionHeaderBodyScrollerNormalVsLocked()
        me.setSizeScrollerTable()
    }
    componentDidUpdate() {
        let me = this
        me.caculateBottomBodyTable()
        me.setPositionHeaderBodyScrollerNormalVsLocked()
        me.setSizeScrollerTable()
    }
    render() {
        let me = this, [childLock, childNormal] = me.getChildrens(),
            [headerTableLock, recordsTableLock] = me.getBodyAndRecordTable(childLock),
            [headerTableNormal, recordsTableNormal] = me.getBodyAndRecordTable(childNormal),
            styleTableWrap = {
                width: '100%',
                height: me.props.Height + 'px'
            }
        return (
            <div className='tableContainer' ref={me.tableWrapAll}>
                <div style={styleTableWrap} className='tableWrap'>
                    <div className='tableEl'>
                        <div className='theadEl'>
                            <div ref={me.headerLocked} className='header-lock'>
                                {headerTableLock}
                            </div>
                            <div ref={me.headerNormal} className='header-normal'>
                                {headerTableNormal}
                            </div>
                        </div>

                        <div className='tbodyEl'>
                            <div ref={me.bodyTable} className='table-scroll-body'>
                                <div ref={me.bodyLocked} className='table-scrollbar-clipped table-scrollbar-locked'>
                                    {recordsTableLock}
                                </div>
                                <div ref={me.bodyNormal} className='table-scrollbar-clipped table-scrollbar-normal'>
                                    {recordsTableNormal}
                                </div>
                            </div>

                            <div ref={me.scrollContainer} className='scroller'>
                                <div ref={me.scrollLock}
                                    className='table-scrollbarer table-scrollbarer-lock'
                                    onScroll={me.onScrollTable.bind(me, me.headerLocked, me.bodyLocked, me.scrollLock)}>
                                    <div className='scroller-spacer'></div>
                                </div>
                                <div ref={me.scrollNormal}
                                    className='table-scrollbarer table-scrollbarer-normal'
                                    onScroll={me.onScrollTable.bind(me, me.headerNormal, me.bodyNormal, me.scrollNormal)}>
                                    <div className='scroller-spacer'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * nnanh 20.03.2020
 * column trong table
 */
class ColumnNA extends Component {
    static nameComponent = 'ColumnNA'
    render() {
        return (
            <div>

            </div>
        )
    }
}

const UserContext = React.createContext()
const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer
export default InputNA;
export {
    BoxWrapNA,
    SelectFormNA,
    httpRequest,
    UserProvider,
    UserConsumer,
    UserContext,
    ComboboxNA,
    TableNA,
    ColumnNA,
}

