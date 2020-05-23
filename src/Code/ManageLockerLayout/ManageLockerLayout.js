import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, { NgocAnh, ConfigsAPI, BoxWrapNA, SelectFormNA, httpRequest,
     UserContext, TableNA, ComboboxNA, ColumnNA, LayoutLocker } from '../../ComponentCommon/Component'
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
        }
        this.btnSave = React.createRef()
        this.formBuilding = React.createRef()
    }

    saveBuilding() {

    }

    componentDidMount() {
        let me = this
        httpRequest.getBuilding().then(res => {
            this.setState({
                dataGrid: res,
                building: JSON.parse(res).items,
            })
            httpRequest.excuteFactory({}, 'level', 'get').then(res => {
                this.setState({
                    level: JSON.parse(res).items,
                })
            })
        })
        httpRequest.excuteFactory({}, 'controller', 'get').then(res => {
            let items = JSON.parse(res).items
            this.setState({
                controller: items,
            })
            httpRequest.excuteFactory({ imei: items[0].imei }, 'locker', 'getManage').then(res => {
                // debugger
            })
        })

    }

    render() {
        let me = this
        return (
            <General Title={'Quản lý layout tủ'} className='manager-locker-layout-nnanh'>
                <div className='col-12'>
                    <BoxWrapNA Title=' ' className='' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-3' ID='ComboboxBuilding' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà"
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    data={JSON.stringify(me.state.building)} />
                                <ComboboxNA className='col-3' ID='ComboboxLevel' textLabel='Tầng'
                                    placeholder="Chọn một tầng"
                                    setField='lLv' DisplayField="lDes" ValueField="lLv"
                                    data={JSON.stringify(me.state.level)} />
                                <ComboboxNA className='col-3' ID='ComboboxController' textLabel='Thiết bị điều khiển'
                                    placeholder="Thiết bị điều khiển"
                                    setField='cId' DisplayField="imei" ValueField="cId"
                                    data={JSON.stringify(me.state.controller)} />
                                <InputNA typeChild="footer" className='col-3' value={"Lọc kết quả"} typeInput={'button'}
                                    ref={this.btnSave} onClick={this.saveBuilding.bind(this)} />
                            </div>
                        </div>
                        <LayoutLocker Page={1}></LayoutLocker>
                        <LayoutLocker Page={2}></LayoutLocker>
                        {/* aStatus: "FREE"
                            bName: "D'Capitale"
                            eCode: ""
                            eName: ""
                            gId: 1113
                            health: "ERROR"
                            imei: "4769495c310bbe1e"
                            lCl: 0
                            lId: 2946
                            lLb: "05.080"
                            lLv: 0
                            lNum: 2
                            lPg: 1
                            lRw: 1
                            lZone: "10"
                            lvlId: 1054 */}
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManageLockerLayout