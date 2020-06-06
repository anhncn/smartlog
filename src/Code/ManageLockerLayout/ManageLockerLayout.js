import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, {
    NgocAnh, ConfigsAPI, BoxWrapNA, SelectFormNA, httpRequest,
    UserContext, TableNA, ComboboxNA, ColumnNA, LayoutLocker,
    ComponentPopup, FormSubmit
} from '../../ComponentCommon/Component'
import './manageLockerLayout.css'
/**
 * Quản lý layout tủ
 * nnanh 04.04.2020
 */
class ManageLockerLayout extends Component {
    constructor() {
        super()
        this.state = {
            dataGrid: '',
            departement: [],
            building: [],
            level: [],
            controller: [],
            dataLayout: '',
            dataPopup: '',
            isShowPopup: false,
        }
        this.btnSave = React.createRef()
        this.formBuilding = React.createRef()
        this.refController = React.createRef()
        this.formPopup = React.createRef()
    }

    getLockerByController() {
        let me = this, imei = me.refController.current.getRecordsSelected().text
        if (!imei) {
            return
        }
        me.getDataLayoutByImei(imei)
    }

    getDataLayoutByImei(imei, callback) {
        httpRequest.excuteFactory({ imei: imei }, 'locker', 'getManage').then(res => {
            let record = JSON.parse(res)
            this.setState({
                dataLayout: record
            })
            if (typeof (callback) === 'function') {
                callback(record)
            }
        })
    }

    getControllerByBuildingId(buildingId) {
        let param = {}
        if (buildingId) {
            param.bId = buildingId
        }
        httpRequest.excuteFactory({}, 'controller', 'get').then(res => {
            let items = JSON.parse(res).items
            this.setState({
                controller: items,
            })
            // me.getDataLayoutByImei(items[0].imei)
        })
    }

    onClickComponent(data) {
        let me = this
        if (data) {
            data.position = 'Hàng ' + data.lRw + ' Cột ' + data.lCl + ' Trang ' + data.lPg
        }
        if (me.refController && me.refController.current.getRecordOrigin()) {
            data.lLv = me.refController.current.getRecordOrigin().lLv
            data.imei = me.refController.current.getRecordOrigin().imei
        }
        me.setState({
            isShowPopup: true,
            dataPopup: data,
        })
    }
    closePopup() {
        this.setState({
            isShowPopup: false,
        })
    }

    onChangeComboboxBuilding(ref, record) {
        httpRequest.excuteFactory({ bId: record.value }, 'level', 'get').then(res => {
            this.setState({
                level: JSON.parse(res).items,
            })
        })
    }

    onClickExcutePopup(controls) {
        let me = this,
            fields = me.formPopup.current.props.children,
            data = this.state.dataPopup
        for (var i = 0; i < fields.length; i++) {
            let child = fields[i]
            data[child.props.setField] = child.ref.current.getValue()
        }
        let dataApi = {
            lNum: parseInt(data.lNum),
            lCol: data.lCl,
            lRow: data.lRw,
            lPage: data.lPg,
            label: data.lLb,
            imei: data.imei
        }
        httpRequest.excuteFactory(dataApi, 'locker', 'create').then(res => {
        })
    }
    onClickRemoveLocker(controls) {
        let param = {
            lId: this.state.dataPopup.lId
        }
        httpRequest.excuteFactory(param, 'locker', 'remove').then(res => {
            debugger
        })
    }

    renderPopupExcuteLoker() {
        let me = this, data = JSON.stringify(me.state.dataPopup)
        return this.state.isShowPopup && <ComponentPopup
            onClosePopup={me.closePopup.bind(me)}
            className='popup-locker-layout-nnanh' ref={this.popup} Height={600} Width={700}>
            <BoxWrapNA Title="Chỉnh sửa tủ" className='box-wrap-custom' >
                <div className='row'>
                    {/* aStatus: "FREE" bName: "D'Capitale" eCode: ""eName: ""
                            gId: 1113 health: "ERROR"
                            imei: "4769495c310bbe1e" lCl: 0lId: 2946
                            lLb: "05.080" lLv: 0 lNum: 2
                            lPg: 1 lRw: 1
                            lZone: "10" lvlId: 1054 */}
                    <FormSubmit ref={me.formPopup} className='col-12 padding-parent'>
                        <InputNA className='col-12' ref={React.createRef()} data={data} setField='lLb' textLabel='Nhãn hiển thị' placeholder='ví dụ: 22.092' />
                        <InputNA className='col-12' ref={React.createRef()} data={data} setField='lNum' textLabel='Số thứ tự tủ' placeholder='ví dụ: 5' />
                        <InputNA className='col-12' ref={React.createRef()} data={data} setField='position' textLabel='Mô tả vị trí' />
                        <InputNA className='col-12' ref={React.createRef()} data={data} setField='lLv' isDisabled={true} textLabel='Tầng' />
                        <InputNA className='col-12' ref={React.createRef()} data={data} setField='imei' isDisabled={true} textLabel='Thiết bị quản lý' />
                    </FormSubmit>
                </div>
            </BoxWrapNA>
            <div>
                <div className='col-8'></div>
                <InputNA className='col-2 padding-right-10' typeInput='button' onClick={me.onClickRemoveLocker.bind(me)} value='Xóa tủ' />
                <InputNA className='col-2 padding-right-10' typeInput='button' onClick={me.onClickExcutePopup.bind(me)} value='Thay đổi' />
            </div>
        </ComponentPopup>
    }

    componentDidMount() {
        let me = this
        httpRequest.getBuilding().then(res => {
            this.setState({
                dataGrid: res,
                building: JSON.parse(res).items,
            })
        })
        httpRequest.excuteFactory({}, 'level', 'get').then(res => {
            this.setState({
                level: JSON.parse(res).items,
            })
        })
        me.getControllerByBuildingId()

    }

    render() {
        let me = this, popup = me.renderPopupExcuteLoker()
        return (
            <General Title={'Quản lý layout tủ'} className='manager-locker-layout-nnanh'>
                <div className='col-12'>
                    <BoxWrapNA Title=' ' className='' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-3' ID='ComboboxBuilding' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà" onChange={me.onChangeComboboxBuilding.bind(me)}
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    data={JSON.stringify(me.state.building)} />
                                <ComboboxNA className='col-3' ID='ComboboxLevel' textLabel='Tầng'
                                    placeholder="Chọn một tầng"
                                    setField='lLv' DisplayField="lDes" ValueField="lLv"
                                    data={JSON.stringify(me.state.level)} />
                                <ComboboxNA className='col-3' ID='ComboboxController' textLabel='Thiết bị điều khiển'
                                    placeholder="Thiết bị điều khiển" ref={this.refController}
                                    setField='cId' DisplayField="imei" ValueField="cId"
                                    data={JSON.stringify(me.state.controller)} />
                                <InputNA typeChild="footer" className='col-3' value={"Lọc kết quả"} typeInput={'button'}
                                    ref={this.btnSave} onClick={this.getLockerByController.bind(this)} />
                            </div>
                        </div>
                        <LayoutLocker Page={1} data={JSON.stringify(me.state.dataLayout)} onClickComponent={me.onClickComponent.bind(me)}></LayoutLocker>
                        <LayoutLocker Page={2} data={JSON.stringify(me.state.dataLayout)} onClickComponent={me.onClickComponent.bind(me)}></LayoutLocker>
                    </BoxWrapNA>
                    {popup}
                </div>
            </General>
        )
    }
}

export default ManageLockerLayout