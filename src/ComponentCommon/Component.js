import React, { Component } from 'react'
import './component.css'
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
        try{
            debugger
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
        catch(e){
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
    get({ method, url, async = true }){
        return new Promise((resolve, reject) => {
            try {
                let xhttp = new XMLHttpRequest()
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        resolve(this.response)
                    }
                }
                xhttp.open(method, url, async)
                xhttp.send();
            }
            catch (e) {
                reject('Error')
            }
        })
    },
}
export default InputNA;
export {
    BoxWrapNA, 
    SelectFormNA,
    httpRequest
}


