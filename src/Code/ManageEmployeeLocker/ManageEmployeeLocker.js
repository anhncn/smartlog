import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, {
    BoxWrapNA, SelectFormNA, httpRequest,
    UserContext, TableNA, ComboboxNA, ColumnNA, NgocAnh, ComponentPopup
} from '../../ComponentCommon/Component'
import './manageEmployeeLocker.css'
/**
 * Quản lý sử dụng thẻ từ
 * nnanh 15.03.2020
 */
class ManageEmployeeLocker extends Component {

    constructor() {
        super()
        this.fullNameRef = React.createRef()
        this.popup = React.createRef()
        this.tableManageEmployeeLocker = React.createRef()
        this.tableManageEmployeeLockerRight = React.createRef()

        this.state = {
            province: [],
            statusUse: [],
            building: [],
            dataTable: this.records,
            dataGrid: [],
            dataGridRight: [],
            dataPopup: [],
            isRender: true,
            departement: [],
            isShowPopup: true,
        }
    }

    getDataAccess() {
    }

    renderGridGain() {
        this.setState({
            isRender: true,
        })
    }

    showPopupAddLocker() {
        let me = this
        httpRequest.excuteFactory({}, 'locker', 'getLockerCanAddExistPermission').then(res => {
            res = JSON.parse(res)
            NgocAnh.CommonFunction.matchPropertiesOfListObject(res.items, me.state.building, "bId", 'bName')
            me.setState({
                isShowPopup: true,
                dataPopup: res,
            })
        })
    }

    nextPrePage(num = 1) {
        const me = this, idContainer = me.tableManageEmployeeLocker.current.getID()
        NgocAnh.CommonFunction.showMaskLoading(idContainer)
        httpRequest.excuteFactory({ page: num }, "user", "getLockerCanUse").then(res => {
            var paging = JSON.parse(res)
            me.setState({
                dataGrid: paging,
            })
            NgocAnh.CommonFunction.hideMaskLoading(idContainer)
        })
    }

    onClickRowGrid(record) {
        var me = this, idContainer = me.tableManageEmployeeLocker.current.getID(),
            idContainerRight = me.tableManageEmployeeLockerRight.current.getID()
        NgocAnh.CommonFunction.showMaskLoading(idContainer)
        NgocAnh.CommonFunction.showMaskLoading(idContainerRight)
        httpRequest.excuteFactory({ eCode: record.eCode }, 'locker', 'getUsage').then(res => {
            res = JSON.parse(res)
            NgocAnh.CommonFunction.matchPropertiesOfListObject(res.items, me.state.building, "bId", 'bName')
            me.setState({
                dataGridRight: res,
            })
            NgocAnh.CommonFunction.hideMaskLoading(idContainer)
            NgocAnh.CommonFunction.hideMaskLoading(idContainerRight)
        })
    }

    renderPopupComponent() {
        let me = this
        if (!me.state.isShowPopup) {
            return
        }
    }

    componentDidMount() {
        var me = this;
        document.getElementsByTagName("BODY")[0].onresize = me.renderGridGain.bind(me)

        httpRequest.getAllDepartement().then(departs => {
            me.setState({
                departement: departs
            })
        })
        httpRequest.getBuilding().then(res => {
            const paging = JSON.parse(res)
            me.setState({
                building: paging.items,
            })
        })
        httpRequest.getLockerManage().then(res => {
        })
        me.nextPrePage()
    }


    render() {
        const me = this
        let statusUse = JSON.stringify(me.state.statusUse),
            placeWork = JSON.stringify(me.province),
            filterGrid = {
                FullName: me.fullNameRef.current ? me.fullNameRef.current.getValue() : null
            }
        return (
            <General Title={'Quản lý sử dụng tủ'} className='manager-employee-locker-nguyen-ngoc-anh-feature'>
                <div className='col-6 manager-left'>
                    <BoxWrapNA Title="Thống kê số lượng tủ có thể sử dụng cho từng nhân viên" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-4' ID='ComboboxNA' textLabel='Bộ phận / phòng ban'
                                    placeholder="Chọn một bộ phận/ phòng ban"
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    hasLabel={true} data={JSON.stringify(me.state.departement)} />
                                <InputNA ref={me.fullNameRef} className='col-4' textLabel='Tên nhân viên' placeholder='ví dụ: NA'></InputNA>
                                <InputNA className='col-4' textLabel='Mã nhân viên' placeholder='ví dụ: nnanh'></InputNA>
                                <ComboboxNA className='col-4' ID='ComboboxBuilding' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà"
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    hasLabel={true} data={JSON.stringify(me.state.building)} />
                                <InputNA className='col-4' textLabel='Nhãn tủ' placeholder='ví dụ: 22.092'></InputNA>
                                <InputNA ref='filterResult' className='col-4 btn-filter' textLabel="" typeInput='button' value='Lọc kết quả' onClick={this.getDataAccess.bind(this)}></InputNA>
                            </div>

                        </div>
                        <TableNA Height={500} ID={"tableManageEmployeeLocker"} data={JSON.stringify(me.state.dataGrid)}
                            NumPaging={5} Filter={filterGrid} changePaging={me.nextPrePage.bind(me)}
                            ref={me.tableManageEmployeeLocker} onClickRowGrid={me.onClickRowGrid.bind(me)}>
                            <ColumnNA isLocked={true} Width={400} DataIndex='eName' text='Nhân viên' />
                            <ColumnNA MinWidth={150} Flex='1' text='Mã nhân viên' DataIndex='eCode' />
                            <ColumnNA Width={80} text='Số tủ' DataIndex='lNum' />
                            <ColumnNA Width={80} Command='Yes' DataIndex='Entertainment' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
                <div className='col-6 manager-right'>
                    <BoxWrapNA Title="Danh sách tủ trong nhóm" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-4' ID='ComboboxBuildingRight' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà"
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    hasLabel={true} data={JSON.stringify(me.state.building)} />
                                <ComboboxNA className='col-4' ID='ComboboxFloor' textLabel='Tầng'
                                    placeholder="Chọn một tầng"
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    hasLabel={true} data={JSON.stringify(me.state.departement)} />
                                <ComboboxNA className='col-4' ID='ComboboxDeviceRemote' textLabel='Thiết bị điều khiển'
                                    placeholder="Chọn một mã thiết bị"
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    hasLabel={true} data={JSON.stringify(me.state.departement)} />
                                <InputNA className='col-4' textLabel='Nhãn tủ' placeholder='ví dụ: 22.092'></InputNA>
                                <InputNA ref='filterResultRight' className='col-4 btn-filter' textLabel="" typeInput='button' value='Lọc kết quả' onClick={this.getDataAccess}></InputNA>
                                <InputNA ref='btnAddLocker' className='col-4 ' textLabel="" typeInput='button' value='Thêm tủ' onClick={this.showPopupAddLocker.bind(this)}></InputNA>
                            </div>

                        </div>
                        <TableNA Height={500} ID={"tableManageEmployeeLockerRight"} data={JSON.stringify(me.state.dataGridRight)}
                            NumPaging={5} Filter={filterGrid} changePaging={me.nextPrePage.bind(me)}
                            ref={me.tableManageEmployeeLockerRight} onClickRowGrid={me.onClickRowGrid}>
                            <ColumnNA isLocked={true} Width={300} DataIndex='bName' text='Tòa nhà' />
                            <ColumnNA MinWidth={100} Flex='1' text='Tầng' DataIndex='lLv' />
                            <ColumnNA Width={100} text='Nhãn' DataIndex='lLb' />
                            <ColumnNA Width={100} text='Mô tả vị trí' DataIndex='lNum' />
                            <ColumnNA Width={80} Command='Yes' DataIndex='Entertainment' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
                {this.state.isShowPopup && <ComponentPopup ref={this.popup} Height={700} Width={700}>
                    <BoxWrapNA Title="Thêm tủ vào nhóm" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-4' ID='ComboboxBuildingPopup' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà"
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    hasLabel={true} data={JSON.stringify(me.state.building)} />
                                <ComboboxNA className='col-4' ID='ComboboxFloorPopup' textLabel='Tầng'
                                    placeholder="Chọn một tầng"
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    hasLabel={true} data={JSON.stringify(me.state.departement)} />
                                <ComboboxNA className='col-4' ID='ComboboxDeviceRemotePopup' textLabel='Thiết bị điều khiển'
                                    placeholder="Chọn một mã thiết bị"
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    hasLabel={true} data={JSON.stringify(me.state.departement)} />
                                <InputNA className='col-4' textLabel='Nhãn tủ' placeholder='ví dụ: 22.092'></InputNA>
                            </div>

                        </div>
                        <TableNA Height={400} ID={"tableManageEmployeeLockerPopup"} data={JSON.stringify(me.state.dataPopup)}
                            NumPaging={5} changePaging={me.nextPrePage.bind(me)}
                            ref={me.tableManageEmployeeLockerRight} onClickRowGrid={me.onClickRowGrid}>
                            <ColumnNA isLocked={true} Width={100} DataIndex='bName' text='Tòa nhà' />
                            <ColumnNA MinWidth={100} Flex='1' text='Tầng' DataIndex='lLv' />
                            <ColumnNA MinWidth={100} Flex='1' text='Thứ tự' DataIndex='lId' />
                            <ColumnNA Width={100} text='Nhãn hiển thị' DataIndex='lLb' />
                            <ColumnNA Width={100} text='Mô tả vị trí' DataIndex='lNum' />
                            <ColumnNA Width={100} text='Nhóm tủ' DataIndex='aStatus' />
                            <ColumnNA Width={80} Command='Yes' DataIndex='Entertainment' />
                        </TableNA>
                    </BoxWrapNA>
                </ComponentPopup>}
            </General>
        )
    }
}

export default ManageEmployeeLocker