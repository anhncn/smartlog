import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.min.css'
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
    constructor() {
        super()

        this.inputRef = React.createRef()
    }
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

    getValue() {
        return this.inputRef.current.querySelector('.input-element input').value
    }

    setValue(val) {
        this.inputRef.current.querySelector('.input-element input').value = val
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
            <div className={classList} ref={me.inputRef}>
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
        this.createContainerCombobox = this.createContainerCombobox.bind(this)
        this.keyDownSelectLi = this.keyDownSelectLi.bind(this)
        this.inputTextSearch = this.inputTextSearch.bind(this)
        this.openBoundingList = this.openBoundingList.bind(this)
        this.closeBoundingList = this.closeBoundingList.bind(this)
        this.isVisblePlaceData = this.isVisblePlaceData.bind(this)
        this.mousedownDocument = this.mousedownDocument.bind(this)
        this.getAllIdCombobox = this.getAllIdCombobox.bind(this)
        this.setScrollTopCombobox = this.setScrollTopCombobox.bind(this)
        this.getContainerCombobox = this.getContainerCombobox.bind(this)
        this.onClickSetValueInput = this.onClickSetValueInput.bind(this)
        this.caculatePositionContainerCombobox = this.caculatePositionContainerCombobox.bind(this)
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
    renderCombobox(records, isShow = false) {
        let me = this, liElements = [], element,
            container = me.createContainerCombobox(),
            displayField = this.props.DisplayField || '',
            valueField = this.props.ValueField || ''
        for (let index = 0; index < records.length; index++) {
            let rec = records[index],
                text = rec[displayField],
                recordid = rec[valueField],
                recordindex = index,
                onClick = me.onClickSetValueInput,
                liElement = <li role='option' aria-selected={true} unselectable='on'
                    tabIndex='-1' data-recordindex={recordindex}
                    data-recordid={recordid} className='x-boundlist-item'
                    data-boundview={`${this.props.ID}-picker`}
                    onClick={onClick} key={recordindex}>{text}</li>
            if (recordid === undefined || recordid === null || recordid === '' || displayField === undefined || displayField === null) {
                continue
            }
            else {
                liElements.push(liElement)
            }
        }

        element = <div className="bound-list">
            <div className="picker-listWrap" >
                <ul ref={me.ulRefs} data-selectid={-1}>
                    {liElements}
                </ul>
            </div>
        </div>
        ReactDOM.render(element, container)
        isShow ? me.openBoundingList() : me.closeBoundingList()
    }
    // tạo một thùng chứa combobox
    createContainerCombobox() {
        let me = this
        if (!me.getContainerCombobox()) {
            let container = document.createElement('DIV')
            container.className = 'avenger mighty'
            container.style.width = this.bodyInputRef.current.getBoundingClientRect().width + 'px'
            container.setAttribute('data-componentid', this.props.ID)
            document.querySelector('body').appendChild(container)
        }
        else {
            me.getContainerCombobox().style.width = me.bodyInputRef.current.getBoundingClientRect().width + 'px'
        }
        return me.getContainerCombobox()
    }
    // lấy ra thùng chứa combobox
    getContainerCombobox() {
        return document.querySelector(`[data-componentid=${this.props.ID}]`)
    }
    // bật tắt danh sách combobox
    // xóa bỏ các class sinh ra khi sử dụng phím tắt trên li
    onClickToggleBoundingList() {
        let me = this, placeData = me.getContainerCombobox(),
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
        me.caculatePositionContainerCombobox()
    }
    // đóng combobox
    closeBoundingList() {
        let me = this, placeData = me.getContainerCombobox()
        placeData.classList.add('hidden-bound-list')
    }
    // mở combobox
    openBoundingList() {
        let me = this, placeData = me.getContainerCombobox()
        placeData.classList.remove('hidden-bound-list')
        me.caculatePositionContainerCombobox()
    }
    // tính toán vị trí hiện cho combobox theo input
    caculatePositionContainerCombobox() {
        let me = this, placeData = me.getContainerCombobox(),
            bodyInput = me.bodyInputRef.current,
            boundBodyInput = bodyInput.getBoundingClientRect()
        placeData.style.top = bodyInput.offsetTop + boundBodyInput.height + 'px'
        placeData.style.left = bodyInput.offsetLeft + 'px'
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
        me.renderCombobox(data, true)
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
    /**
     * tính toán lại vị trí của scroll trong combobox
     * @param {boolean} isUp 
     * sự kiện bấm lên hay xuống trong combobox
     */
    setScrollTopCombobox(isUp) {
        let me = this, container = me.getContainerCombobox(),
            offsetTopELement = container.querySelector('.active-movement').offsetTop,
            heightCombobox = container.getBoundingClientRect().height,
            heightElement = container.querySelector('ul li').getBoundingClientRect().height
        if (isUp) {
            if (offsetTopELement < container.scrollTop) {
                container.scrollTop = offsetTopELement
            }
            else if (offsetTopELement >= container.querySelector('.bound-list').getBoundingClientRect().height - 2 * heightElement) {
                container.scrollTop = offsetTopELement - heightCombobox + heightElement
            }
        }
        else {
            if (offsetTopELement + heightElement > container.scrollTop + heightCombobox) {
                container.scrollTop = offsetTopELement - heightCombobox + heightElement
            }
            else if (offsetTopELement === 0) {
                container.scrollTop = offsetTopELement
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
        const placeData = this.getContainerCombobox()
        if (placeData.classList.contains('hidden-bound-list')) {
            return false
        }
        return true
    }
    // rendered
    componentDidMount() {
        const me = this;
        me.setData()
        me.renderCombobox(me.data)
        document.onmousedown = me.mousedownDocument
    }

    componentDidUpdate() {
        this.setData()
        this.renderCombobox(this.data)
    }
    getElementLabel(text, id, hasLabel = true) {
        return hasLabel && <div className='label-element'>
            <label id={`${id}-labelEl`}>{text}</label>
        </div>
    }
    render() {
        const me = this, id = me.props.ID, readonly = me.props.ReadOnly || false
        let className = me.props.className || '' + ' container-combobox',
            label = me.getElementLabel(me.props.textLabel, id, me.props.hasLabel)
        return (
            <div id={`${id}_Container`} className={className}>
                {label}
                <div id={`${id}-bodyEl`} ref={me.bodyInputRef} className="combobox-body" tabIndex='-1' onKeyDown={me.keyDownSelectLi}>
                    <div id={`${id}-triggerWrap`} className="combobox-triggerWrap">
                        <div id={`${id}-inputWrap`} className="combobox-inputWrap">
                            <input id={`${id}-inputEl`} ref={me.inputRef}
                                placeholder={me.props.placeholder} onInput={me.inputTextSearch}
                                readOnly={readonly} type="text" className="combobox" />
                        </div>
                        <div id={`${id}-trigger-picker`} className="combobox-trigger-picker" onClick={me.onClickToggleBoundingList}></div>
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
    Paging = {
        records: [],
        totalRecords: 0,
        currentPaging: 0,
        totalPaging: 0,
        numPaging: 0,
    }
    constructor() {
        super()
        this.PagingGrid = React.createRef()
        this.tableWrapAll = React.createRef()
        this.headerNormal = React.createRef()
        this.headerLocked = React.createRef()
        this.bodyTable = React.createRef()
        this.bodyNormal = React.createRef()
        this.bodyLocked = React.createRef()
        this.scrollContainer = React.createRef()
        this.scrollLock = React.createRef()
        this.scrollNormal = React.createRef()

        this.isOverflow = this.isOverflow.bind(this)
        this.renderPaging = this.renderPaging.bind(this)
        this.getColumnGrid = this.getColumnGrid.bind(this)
        this.onScrollTable = this.onScrollTable.bind(this)
        this.checkWidthGrid = this.checkWidthGrid.bind(this)
        this.getHeaderTable = this.getHeaderTable.bind(this)
        this.getDataFillTable = this.getDataFillTable.bind(this)
        this.getBodyRecordTable = this.getBodyRecordTable.bind(this)
        this.isOverflowVertical = this.isOverflowVertical.bind(this)
        this.isOverflowHorizontal = this.isOverflowHorizontal.bind(this)
        this.setSizeScrollerTable = this.setSizeScrollerTable.bind(this)
        this.caculateWidthColumns = this.caculateWidthColumns.bind(this)
        this.getBodyAndRecordTable = this.getBodyAndRecordTable.bind(this)
        this.caculateBottomBodyTable = this.caculateBottomBodyTable.bind(this)
        this.getColumnsLockAndNormal = this.getColumnsLockAndNormal.bind(this)
        this.setPositionHeaderBodyScrollerNormalVsLocked = this.setPositionHeaderBodyScrollerNormalVsLocked.bind(this)

        this.state = {
            isRender: true,
            widthGrid: null,
            widthGridLock: null,
            numberRecordsOfPage: 20,
            currentPaging: 1,
        }
    }

    getDataFillTable() {
        // Filter
        let me = this, records = [], totalRecords = 0,
            currentPaging = me.state.currentPaging, totalPaging = 0,
            numPaging = parseInt(me.props.NumPaging) || me.state.numberRecordsOfPage
        try {
            records = records.concat(JSON.parse(me.props.data))
        } catch (error) {
            return records
        }


        records = me.filterData.bind(me)(records)

        totalRecords = records.length
        if (totalRecords % numPaging !== 0) {
            totalPaging = parseInt(totalRecords / numPaging) + 1
        }
        else {
            totalPaging = parseInt(totalRecords / numPaging)
        }

        records = records.filter((rec, index) => {
            return index < numPaging * currentPaging && index >= numPaging * (currentPaging - 1)
        }) || []
        me.Paging = {
            records: records,
            totalRecords: totalRecords,
            currentPaging: currentPaging,
            totalPaging: totalPaging,
            numPaging: numPaging
        }
        return me.Paging
    }

    filterData(records) {
        let me = this, filterObject = me.props.Filter, keys = Object.keys(filterObject)
        keys.forEach(key => {
            let valKey = filterObject[key]
            if (valKey === '' || valKey === null || valKey === undefined) {
            }
            else {
                records = records.filter((rec, index) => {
                    return rec[key].includes(valKey)
                })
            }
        })

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
            me.scrollContainer.current.style.display = ''
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
            scrollWidthNormal = me.headerNormal.current.scrollWidth - 1 + 'px',
            scrollWidthLocked = me.headerLocked.current.scrollWidth - 1 + 'px'
        me.scrollNormal.current.querySelector('.scroller-spacer').
            style.transform = `translate3d(${scrollWidthNormal}, 0px, 0px)`
        me.scrollLock.current.querySelector('.scroller-spacer').
            style.transform = `translate3d(${scrollWidthLocked}, 0px, 0px)`
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

    /* ref có bị overflow ko */
    isOverflow(ref) {
        return this.isOverflowHorizontal(ref) || this.isOverflowVertical(ref)
    }

    /* ref có bị overflow dọc ko */
    isOverflowVertical(ref) {
        let element = ref.current
        return element.clientHeight < element.scrollHeight
    }

    /* ref có bị overflow ngang ko */
    isOverflowHorizontal(ref) {
        let element = ref.current
        return element.clientWidth < element.scrollWidth
    }

    /* chỉnh scroll của ref head và body theo scroll của scroller */
    onScrollTable(head, body, scroller) {
        const scrollLeft = scroller.current.scrollLeft
        body.current.scrollLeft = scrollLeft
        head.current.scrollLeft = scrollLeft
    }

    /* Danh sách các cột là child */
    getColumnGrid() {
        let me = this, columns = []
        if (me.props.children) {
            columns = columns.concat(me.props.children)
            columns = columns.filter(column => column.type.nameComponent === 'ColumnNA')
        }
        return columns
    }

    /* Trả về các danh sách thông tin cột đã đóng băng và cột bình thường */
    getColumnsLockAndNormal() {
        let me = this, columns = me.getColumnGrid(), columnsLock = [], columnsNormal = []
        columnsLock = columns.filter(cloumn => { return cloumn.props.isLocked === true })
        columnsNormal = columns.filter(cloumn => { return cloumn.props.isLocked !== true })
        return [columnsLock, columnsNormal]
    }

    /* Truyền vào thông tin cột trả ra header html cột */
    getHeaderTable(columns = [], widthCloumns, isLocked = false) {
        let header = []
        columns.forEach((column, index) => {
            let text = column.props.text,
                style = {
                    width: isLocked ? column.props.Width : widthCloumns[index]
                }
            header.push(<th style={style} key={index} className='column-header'>
                <div className='column-header-inner' title={text}>{text}</div>
            </th>)
        })
        return <table className='table-item'><tbody><tr>{header}</tr></tbody></table>
    }

    /* Truyền vào thông tin cột trả ra body html cột */
    getBodyRecordTable(columns = [], widthCloumns, isLocked = false) {
        let me = this, rowsInTable = [], { records } = me.Paging
        records.forEach((rec, i) => {
            let dataInRow = []
            columns.forEach((column, index) => {
                let text = rec[column.props.DataIndex],
                    style = {
                        width: isLocked ? column.props.Width : widthCloumns[index]
                    }
                if (column.props.Command) {
                    let styleBtn = {
                        boxSizing: 'border-box',
                        border: 'none',
                        padding: 0,
                        backgroundColor: 'transparent',
                        cursor: 'pointer'
                    }
                    style.textAlign = "center"
                    dataInRow.push(<td key={index} className='table-cell' style={style}>
                        <div className='table-cell-inner' title={text}>
                            <button style={styleBtn} onClick={me.onClickDeleteRecord.bind(me)} recordid={rec.RecordID}><i className="fa fa-trash"></i> </button>
                        </div></td>)
                }
                else {
                    dataInRow.push(<td key={index} className='table-cell' style={style}>
                        <div className='table-cell-inner' title={text}>{text}</div></td>)
                }
            })
            rowsInTable.push(<table key={i} className='table-item' data-recordid={i}><tbody>
                <tr className='table-row'>{dataInRow}</tr></tbody></table>)
        })
        return <div className='table-item-container'>{rowsInTable}</div>
    }

    onClickDeleteRecord(e) {
        let me = this, id = e.currentTarget.getAttribute('recordid')
        alert('Đã xóa bản ghi:' + id)
    }

    /* Ném vào thông tin cột lấy ra html của header và body cột */
    getBodyAndRecordTable(columns = [], isLocked = false) {
        let me = this
        if (me.checkWidthGrid()) {
            let widthCloumns = isLocked ? [] : me.caculateWidthColumns(columns)
            return [this.getHeaderTable(columns, widthCloumns, isLocked), this.getBodyRecordTable(columns, widthCloumns, isLocked)];
        } else {
            return [[], []]
        }
    }

    /* Tính toán width cho mỗi column normal */
    caculateWidthColumns(columns) {
        let me = this, widthCloumns = [], totalFlex = 0, totalWidth = 0,
            widthGrid = me.state.widthGrid - me.state.widthGridLock
        columns.forEach(column => {
            const flex = parseInt(column.props.Flex) || 0,
                width = parseInt(column.props.Width) || 0,
                minWidth = parseInt(column.props.MinWidth) || 0
            if (minWidth === 0 && flex === 0) {
                totalWidth += width
            }
            else {
                totalFlex += flex
            }
        })
        if (totalWidth > widthGrid || totalFlex === 0) {
            totalWidth = widthGrid
            totalFlex = 1
        }
        columns.forEach((column, index) => {
            let flex = parseInt(column.props.Flex) || 0,
                width = parseInt(column.props.Width) || 0,
                minWidth = parseInt(column.props.MinWidth) || 0
            flex = (widthGrid - totalWidth) / totalFlex * flex
            if (flex !== 0 || minWidth !== 0) {
                width = Math.max(flex, minWidth)
            }
            widthCloumns[index] = width
        })
        return widthCloumns
    }

    /* Nếu width của grid chưa có hay chưa được render thì ko render */
    checkWidthGrid() {
        let width = this.state.widthGrid || 0
        if (width === 0) {
            return false
        } else {
            return true
        }
    }

    /* Cập nhật lại width grid nếu có thay đổi */
    UpdateWidthGrid() {
        const me = this, widthGridUpdate = me.tableWrapAll.current.getBoundingClientRect().width
        if (me.state.widthGrid !== widthGridUpdate) {
            let [columnsLock,] = me.getColumnsLockAndNormal(), widthColunnsLock = 0
            columnsLock.forEach(column => {
                widthColunnsLock += column.props.Width
            })
            this.setState({
                widthGrid: widthGridUpdate,
                widthGridLock: widthColunnsLock,
            })
        }
    }

    /**
     * render html cho phân trang
     */
    renderPaging() {
        const me = this,
            { totalRecords, currentPaging, totalPaging } = me.Paging,
            currentPagingText = `Trang ${currentPaging} / ${totalPaging} `
        if (me.PagingGrid.current) {
            me.PagingGrid.current.querySelector('input').value = currentPaging
        }
        return <div ref={me.PagingGrid} className='tablePaging'>
            <div className='contentPaging'>
                <div className='leftPaging'>
                    <div className='titlePaging'>Tổng số nhân viên:&nbsp;</div>
                    <div className='statTotal'>{totalRecords}</div>
                </div>
                <div className='rightPaging'>
                    <div className='inputPaging child-rightPaging'>
                        <input defaultValue={currentPaging} onKeyPress={me.onKeypressSearchPage.bind(me)} type="text" />
                    </div>
                    <div onClick={me.changeNumberPaging.bind(me, false)} className='prePaging child-rightPaging'>
                        <i className="fa fa-fw fa-chevron-left"></i>
                    </div>
                    <div className='currentPaging child-rightPaging'>{currentPagingText}</div>
                    <div onClick={me.changeNumberPaging.bind(me, true)} className='nextPaging child-rightPaging'>
                        <i className="fa fa-fw fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    }

    onKeypressSearchPage(event) {
        if (event.charCode === NgocAnh.Enumeration.KeyCode.Enter ||
            event.which === NgocAnh.Enumeration.KeyCode.Enter ||
            event.keyCode === NgocAnh.Enumeration.KeyCode.Enter) {
            let value = event.target.value,
                numberValue = parseInt(value),
                { currentPaging, totalPaging } = this.Paging
            if (!isNaN(value) && 0 < numberValue && numberValue <= totalPaging) {
                this.setState({
                    currentPaging: numberValue
                })
            }
            else {
                event.target.value = currentPaging
            }
        }
    }

    changeNumberPaging(isIncrease = false) {
        let { currentPage, totalPaging } = this.Paging
        currentPage = this.state.currentPaging + (isIncrease ? 1 : -1)
        if (currentPage === 0 || currentPage > totalPaging) {
        }
        else {
            this.setState({
                currentPaging: currentPage
            })
        }

    }

    initEventGrid() {
        let me = this,
            allRecords = me.tableWrapAll.current.querySelectorAll('.table-item[data-recordid]')
        allRecords.forEach(table => {
            let id = table.getAttribute('data-recordid'),
                listTable = me.tableWrapAll.current.querySelectorAll(`.table-item[data-recordid='${id}']`)
            table.addEventListener("mouseenter", () => {
                listTable.forEach(item => {
                    item.classList.add('active')
                })
            })
            table.addEventListener("mouseleave", () => {
                listTable.forEach(item => {
                    item.classList.remove('active')
                })
            })
            table.addEventListener("click", () => {
                allRecords.forEach(item => {
                    item.classList.remove('selected')
                })
                listTable.forEach(item => {
                    item.classList.add('selected')
                })
            })
        })
    }

    clearGrid() {
        let me = this,
            allRecords = me.tableWrapAll.current.querySelectorAll('.table-item[data-recordid]')
        allRecords.forEach(item => {
            item.classList.remove('selected')
        })
    }
    componentDidMount() {
        let me = this
        me.UpdateWidthGrid()
        me.setSizeScrollerTable()
        me.caculateBottomBodyTable()
        me.setPositionHeaderBodyScrollerNormalVsLocked()

    }

    componentDidUpdate() {
        let me = this
        me.UpdateWidthGrid()
        me.setSizeScrollerTable()
        me.clearGrid.bind(me)()
        me.initEventGrid.bind(me)()
        me.caculateBottomBodyTable()
        me.setPositionHeaderBodyScrollerNormalVsLocked()
    }

    render() {
        this.getDataFillTable()
        let me = this,
            [columnsLock, columnsNormal] = me.getColumnsLockAndNormal(),
            [headerTableLock, recordsTableLock] = me.getBodyAndRecordTable(columnsLock, true),
            [headerTableNormal, recordsTableNormal] = me.getBodyAndRecordTable(columnsNormal),
            styleTableWrap = {
                width: me.props.Width || '100%',
                height: me.props.Height || '100%',
            }, paging = me.renderPaging()
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

                        <div className='tfooterEl'></div>
                    </div>
                </div>
                {paging}
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


