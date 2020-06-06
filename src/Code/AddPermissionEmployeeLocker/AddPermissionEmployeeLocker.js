import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, {
    BoxWrapNA, SelectFormNA, httpRequest,
    UserContext, TableNA, ComboboxNA, ColumnNA, NgocAnh,
    ContainerWrapRecord, LabelInput
} from '../../ComponentCommon/Component'
import './addPermissionEmployeeLocker.css'
/**
 * Thêm quyền quản lý sử dụng tủ cho nhân viên
 */
class AddPermissionEmployeeLocker extends Component {

    constructor() {
        super()
        this.fullNameRef = React.createRef()

        this.nameGroupUser = React.createRef()
        this.nameGroupLocker = React.createRef()
        this.checkboxForm = React.createRef()

        this.formContainer = React.createRef()

        this.gridTop = React.createRef()
        this.departTopRef = React.createRef()
        this.fullNameTopRef = React.createRef()
        this.eNameTopRef = React.createRef()
        this.statusTopRef = React.createRef()

        this.gridBot = React.createRef()
        this.buildingBotRef = React.createRef()
        this.levelBotRef = React.createRef()
        this.controllerBotRef = React.createRef()
        this.labelBotRef = React.createRef()
        this.gStatusBotRef = React.createRef()

        this.state = {
            province: [],
            statusUse: [],
            dataTable: this.records,
            dataGrid: [],
            isRender: true,
            departement: [],
            dataGridEmployee: [],
            dataGridLocker: [],
            dataWrapEmployees: "",
            dataWrapLockers: "",
            building: "",
            controller: "",
            level: "",
        }
    }

    renderGridGain() {
        this.setState({
            isRender: true,
        })
    }

    addPermissionGroupUseLocker() {
        try {
            let me = this, lstEm = [], lstLock = [], idContainer = me.formContainer.current.getID(),
                listEmObj = JSON.parse(me.state.dataWrapEmployees),
                listLockerObj = JSON.parse(me.state.dataWrapLockers),
                reuse = me.checkboxForm.current.getValue();
            NgocAnh.CommonFunction.showMaskLoading(idContainer)
            listEmObj.forEach(em => {
                lstEm.push(em.eId)
            })
            listLockerObj.forEach(lock => {
                lstLock.push(lock.lId)
            })
            var obj = {
                listEmp: lstEm,
                listLk: lstLock,
                reuse: reuse,
            }
            httpRequest.excuteFactory(obj, "user", "setPermissionUseLocker").then(res => {
                alert("Thêm nhóm sử dụng thành công!")
                NgocAnh.CommonFunction.hideMaskLoading(idContainer)
            }).catch(res => {
                NgocAnh.CommonFunction.hideMaskLoading(idContainer)
            })
        } catch (error) {
            alert("Chưa có dữ liệu để thêm")
        }
    }

    filterGridTop() {
        this.nextPrePageGridTop(1)
    }

    filterGridBot() {
        this.nexPageGridBot(1)
    }

    nextPrePageGridTop(num = 1) {
        const me = this, idContainer = me.gridTop.current.getID()
        NgocAnh.CommonFunction.showMaskLoading(idContainer)
        let obj = {
            page: num,
            dId: me.departTopRef.current.getValue(),
            code: me.eNameTopRef.current.getValue(),
            name: me.fullNameTopRef.current.getValue(),
            isGroup: me.statusTopRef.current.getValue(),
        }
        httpRequest.excuteFactory(obj, 'user', 'get').then(res => {
            var paging = JSON.parse(res)
            NgocAnh.CommonFunction.matchPropertiesOfListObject(paging.items, me.state.departement, 'dId', 'dName')
            NgocAnh.CommonFunction.matchPropertiesOfListObject(paging.items, NgocAnh.Enumeration.StatusClassify, 'gStatus', 'gStatusName')
            me.setState({
                dataGridEmployee: paging,
            })
            NgocAnh.CommonFunction.hideMaskLoading(idContainer)
        })
    }

    nexPageGridBot(num = 1) {
        let me = this, idContainer = me.gridBot.current.getID(),
            obj = {
                bId: me.buildingBotRef.current.getValue(),
                lvId: me.levelBotRef.current.getValue(),
                imei: me.controllerBotRef.current.getValue(),
                label: me.labelBotRef.current.getValue(),
                gStatus: me.gStatusBotRef.current.getValue(),
                page: num,
            }
        NgocAnh.CommonFunction.showMaskLoading(idContainer)
        httpRequest.excuteFactory(obj, 'locker', 'getLocker').then(res => {
            var paging = JSON.parse(res)
            if (paging && paging.items && paging.items.length > 0) {
                paging.items.forEach(item => {
                    const col = item.lCl, row = item.lRw, page = item.lPg
                    item.position = `Hàng ${parseInt(row) + 1} cột ${parseInt(col) + 1} trang ${parseInt(page) + 1}`
                })
            }
            me.setState({
                dataGridLocker: paging,
            })
            NgocAnh.CommonFunction.hideMaskLoading(idContainer)
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
        })
    }

    onChangeComboboxBuilding(ref, record) {
        httpRequest.excuteFactory({ bId: record.value }, 'level', 'get').then(res => {
            this.setState({
                level: JSON.parse(res).items,
            })
        })
    }

    onChangeLevelLeft(ref, rec){
        httpRequest.excuteFactory({lId: rec.value}, 'controller', 'get').then(res => {
            let items = JSON.parse(res).items
            this.setState({
                controller: items,
            })
        })
    }

    onClickGridCellTop(controls, records) {
        var me = this
        me.setState({
            dataWrapEmployees: JSON.stringify(records)
        })
    }

    onClickGridCellBot(controls, records) {
        var me = this
        me.setState({
            dataWrapLockers: JSON.stringify(records)
        })
    }

    componentDidMount() {
        var me = this;
        document.getElementsByTagName("BODY")[0].onresize = me.renderGridGain.bind(me)


        httpRequest.getBuilding().then(res => {
            const paging = JSON.parse(res)
            me.setState({
                building: paging.items,
            })
        })


        httpRequest.excuteFactory({}, 'level', 'get').then(res => {
            this.setState({
                level: JSON.parse(res).items,
            })
        })
        httpRequest.getAllDepartement().then(departs => {
            me.setState({
                departement: departs
            })
            me.nextPrePageGridTop()
        })

        me.nexPageGridBot()
        me.getControllerByBuildingId()
    }
    render() {
        const me = this,
            departement = JSON.stringify(me.state.departement),
            building = JSON.stringify(me.state.building)
        //listDataIndex={listDataIndexLocker}
        let statusUse = JSON.stringify(me.state.statusUse),
            placeWork = JSON.stringify(me.province),
            filterGrid = {
                FullName: me.fullNameRef.current ? me.fullNameRef.current.getValue() : null
            }, listDataIndexEmployee = JSON.stringify(["name", "eCode"]),
            listDataIndexLocker = JSON.stringify(["position"])
        return (
            <General Title={'Thêm quyền sử dụng tủ cho nhân viên'} className='add-permission-employee-locker-nnanh-feature'>
                <div className='col-3 manager-left padding-both-size-10'>
                    <BoxWrapNA Title="Thêm nhóm sử dụng tủ" ref={me.formContainer}>
                        <InputNA textLabel='Tên nhóm người dùng' placeholder='ví dụ: Nhóm IT' ref={me.nameGroupUser} />
                        <ContainerWrapRecord data={me.state.dataWrapEmployees} sperator="-" textLabel={'Danh sách nhân viên trong nhóm'}
                            listDataIndex={listDataIndexEmployee} />
                        <InputNA textLabel='Tên nhóm tủ' placeholder='ví dụ: Nhóm IT' ref={me.nameGroupLocker} />
                        <ContainerWrapRecord data={me.state.dataWrapLockers} sperator="-" textLabel={'Danh sách tủ trong nhóm'}
                            listDataIndex={listDataIndexLocker} />
                        <LabelInput TextLabel="Cho phép nhóm nhân viên cũ tiếp tục sử dụng tủ đã được phân trước đó và ngược lại" ref={me.checkboxForm} />
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm nhóm sử dụng"} typeInput={'button'} onClick={me.addPermissionGroupUseLocker.bind(me)} />
                    </BoxWrapNA>
                </div>
                <div className='col-9 manager-right padding-both-size-10'>
                    <BoxWrapNA Title="Danh sách nhân viên" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-10 padding-parent'>
                                <ComboboxNA className='col-3 padding-both-size-4' ID='ComboboxDepartementGridTop' textLabel='Bộ phận/phòng ban'
                                    placeholder="Chọn một bộ phận/phòng ban"
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    data={departement} ref={me.departTopRef} />
                                <InputNA ref={me.fullNameTopRef} className='col-3 padding-both-size-4' textLabel='Tên nhân viên' placeholder='ví dụ: NA' />
                                <InputNA className='col-3 padding-both-size-4' ref={me.eNameTopRef} textLabel='Mã nhân viên' placeholder='ví dụ: nnanh' />
                                <ComboboxNA className='col-3 padding-both-size-4' ID='ComboboxStatusGridTop' textLabel='Trạng thái'
                                    placeholder="Chọn tình trạng phân nhóm" ref={me.statusTopRef}
                                    setField='gStatus' DisplayField="gStatusName" ValueField="gStatus"
                                    data={JSON.stringify(NgocAnh.Enumeration.StatusClassify)} />
                            </div>
                            <InputNA ref='filterResult' className='col-2 btn-filter padding-both-size-4' typeInput='button' value='Lọc kết quả' onClick={this.filterGridTop.bind(this)}></InputNA>
                        </div>
                        <TableNA Height={500} ID={"gridListEmployee"} data={JSON.stringify(me.state.dataGridEmployee)}
                            NumPaging={5} Filter={filterGrid} changePaging={me.nextPrePageGridTop.bind(me)}
                            ref={me.gridTop} onClickCheckboxColumn={me.onClickGridCellTop.bind(me)} isSelection={true}>
                            <ColumnNA isLocked={true} Width={200} DataIndex='name' text='Họ và tên' />
                            <ColumnNA MinWidth={150} Flex={1} text='Mã nhân viên' DataIndex='eCode' />
                            <ColumnNA Width={200} text='Bộ phận làm việc' DataIndex='dName' />
                            <ColumnNA Width={200} text='Nhóm sử dụng' DataIndex='gStatusName' />
                        </TableNA>
                    </BoxWrapNA>

                    <BoxWrapNA Title='Danh sách tủ' className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxBuildingGridBot' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà" ref={me.buildingBotRef}
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    data={building} onChange={me.onChangeComboboxBuilding.bind(me)} />
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxLevelGridBot' textLabel='Tầng'
                                    placeholder="Chọn một tầng" ref={me.levelBotRef}
                                    setField='lId' DisplayField="lLv" ValueField="lId"
                                    onChange={me.onChangeLevelLeft.bind(me)}
                                    data={JSON.stringify(me.state.level)} />
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxControllerGridBot' textLabel='Thiết bị điều khiển'
                                    placeholder="Thiết bị điều khiển" ref={this.controllerBotRef}
                                    setField='cId' DisplayField="imei" ValueField="cId"
                                    data={JSON.stringify(me.state.controller)} />
                                <InputNA className='col-4 padding-both-size-4' textLabel='Nhãn tủ' ref={me.labelBotRef} placeholder="ví dụ: 22.096" />
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxStatusGridBot' textLabel='Trạng thái'
                                    placeholder="Chọn tình trạng phân nhóm" ref={me.gStatusBotRef}
                                    setField='status' DisplayField="gStatusName" ValueField="gStatus"
                                    data={JSON.stringify(NgocAnh.Enumeration.StatusClassify)} />
                                <InputNA typeChild="footer" className='col-4' value={"Lọc kết quả"} typeInput={'button'}
                                    onClick={this.filterGridBot.bind(this)} />
                            </div>
                        </div>
                        <TableNA Height={500} ID={"gridListLocker"} data={JSON.stringify(me.state.dataGridLocker)}
                            NumPaging={5} Filter={filterGrid} changePaging={me.nexPageGridBot.bind(me)}
                            ref={me.gridBot} onClickCheckboxColumn={me.onClickGridCellBot.bind(me)} isSelection={true}>
                            <ColumnNA isLocked={true} Width={200} text='Tòa Nhà' DataIndex='bName' />
                            <ColumnNA Width={200} Flex={1} text='Tầng' DataIndex='lLv' />
                            <ColumnNA Width={200} text='Thứ tự' DataIndex='lnum' />
                            <ColumnNA Width={200} text='Nhãn hiện thị' DataIndex='lLb' />
                            <ColumnNA Width={200} text='Vị trí tương đối' DataIndex='position' />
                            <ColumnNA Width={200} text='Tình trạng' DataIndex='gName' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default AddPermissionEmployeeLocker