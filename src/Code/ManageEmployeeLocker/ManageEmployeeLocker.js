import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, {
    BoxWrapNA, SelectFormNA, httpRequest,
    UserContext, TableNA, ComboboxNA, ColumnNA, NgocAnh,
    ComponentPopup, LabelInput, ContainerWrapRecord
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
        this.departementLeft = React.createRef()
        this.buildingLeft = React.createRef()
        this.eCodeLeft = React.createRef()
        this.labelLeft = React.createRef()


        this.buildingRight = React.createRef()
        this.levelRight = React.createRef()
        this.controllerRight = React.createRef()
        this.labelRight = React.createRef()

        this.buildingPopup = React.createRef()
        this.levelPopup = React.createRef()
        this.controllerPopup = React.createRef()
        this.labelPopup = React.createRef()


        this.popup = React.createRef()
        this.tableManageEmployeeLocker = React.createRef()
        this.tableManageEmployeeLockerRight = React.createRef()

        this.containerWrapRec = React.createRef()

        this.labelInputPopup = React.createRef()

        this.state = {
            province: [],
            statusUse: [],
            dataTable: this.records,
            dataGrid: [],
            dataGridRight: [],
            dataPopup: [],
            isRender: true,
            isShowPopup: false,
            dataWrapComponent: "",

            levelRight: "",

            building: [],
            departement: [],
            controller: [],
            controllerRight: "",

            levelPopup: "",
            controllerPopup: "",
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
        me.setState({
            isShowPopup: true,
        })
        me.nextPrePagePopup()
    }

    filterPagePopup(){
        this.nextPrePagePopup()
    }

    nextPrePagePopup(num = 1){
        let me = this, eCode = me.state.eCodeClick
        var param = {
            eCode: eCode,
            page: num,
            bId: me.buildingPopup.current ? me.buildingPopup.current.getValue():"",
            lvId: me.levelPopup.current ? me.levelPopup.current.getValue():"",
            imei: me.controllerPopup.current ? me.controllerPopup.current.getValue():"",
            label: me.labelPopup.current ? me.labelPopup.current.getValue():"",
        }
        debugger
        httpRequest.excuteFactory(param, 'locker', 'getLockerCanAddExistPermission').then(res => {
            res = JSON.parse(res)
            NgocAnh.CommonFunction.matchPropertiesOfListObject(res.items, me.state.building, "bId", 'bName')
            me.setState({
                dataPopup: res,
            })
        })
    }

    closePopup() {
        this.setState({
            isShowPopup: false,
        })
    }

    nextPrePage(num = 1) {
        const me = this, idContainer = me.tableManageEmployeeLocker.current.getID(),
            param = {
                page: num,
                eName: me.fullNameRef.current.getValue(),
                eCode: me.eCodeLeft.current.getValue(),
                label: me.labelLeft.current.getValue(),
                dId: me.departementLeft.current.getValue(),
                bId: me.buildingLeft.current.getValue(),
            }
        NgocAnh.CommonFunction.showMaskLoading(idContainer)
        httpRequest.excuteFactory(param, "user", "getLockerCanUse").then(res => {
            var paging = JSON.parse(res)
            me.setState({
                dataGrid: paging,
            })
            NgocAnh.CommonFunction.hideMaskLoading(idContainer)
        })
    }

    filterGridLeft() {
        this.nextPrePage()
    }

    onClickRowGrid(record) {
        var me = this
        me.setState({
            eCodeClick: record.eCode,
        }, () => {
            me.nextPrePageGridRight()
        })
    }

    onClickFilterGridRight() {
        this.nextPrePageGridRight()
    }

    nextPrePageGridRight(num = 1) {
        var me = this, idContainer = me.tableManageEmployeeLocker.current.getID(),
            idContainerRight = me.tableManageEmployeeLockerRight.current.getID(),
            eCode = me.state.eCodeClick,
            param = {
                eCode: eCode,
                page: num,
                label: me.labelRight.current.getValue(),
                imei: me.controllerRight.current.getValue(),
                lvId: me.levelRight.current.getValue(),
                bId: me.buildingRight.current.getValue(),
            }
        NgocAnh.CommonFunction.showMaskLoading(idContainer)
        NgocAnh.CommonFunction.showMaskLoading(idContainerRight)
        httpRequest.excuteFactory(param, 'locker', 'getUsage').then(res => {
            res = JSON.parse(res)
            NgocAnh.CommonFunction.matchPropertiesOfListObject(res.items, me.state.building, "bId", 'bName')
            me.setState({
                dataGridRight: res,
            })
            NgocAnh.CommonFunction.hideMaskLoading(idContainer)
            NgocAnh.CommonFunction.hideMaskLoading(idContainerRight)
        })
    }

    onClickCheckboxColumnPopup(controls, records) {
        this.setState({
            dataWrapComponent: JSON.stringify(records)
        })
    }

    onClickDeleteGridRight(id, rec) {
        var me = this, record = JSON.parse(rec),
        param = {
            lId: record.lId,
            all: false,
            eCode: me.state.eCodeClick,
        }
        httpRequest.excuteFactory(param, "user", "removePermissionUseLocker").then(res => {
            alert("Xóa thành công khóa!");
            this.setState({
                isRender: true,
            })
            window.location.reload();
        })

    }

    onClickDeleteGridLeft(id ,rec){
        var me = this, record = JSON.parse(rec),
        param = {
            all: true,
            eCode: me.state.eCodeClick,
        }
        httpRequest.excuteFactory(param, "user", "removePermissionUseLocker").then(res => {
            alert("Xóa thành công!");
            this.setState({
                isRender: true,
            })
            window.location.reload();
        })
    }

    addLockerToExistedPermission() {
        var me = this,
            listLockerObj = JSON.parse(me.containerWrapRec.current.props.data),
            listLockerID = []
        listLockerObj.forEach(locker => {
            listLockerID.push(locker.lId)
        });
        var param = {
            reuse: me.labelInputPopup.current.getValue(),
            listLk: listLockerID,
            eCode: me.state.eCodeClick,
        }
        httpRequest.excuteFactory(param, "user", "addLockerExistPermission").then(res => {
            alert("Thêm thành công khóa tủ cho nhân viên!");
            me.popup.current.closePopup()
            window.location.reload();
        })
    }

    componentDidUpdate(){
        let me = this
        // if(me.state.isShowPopup){
        // }
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
        httpRequest.excuteFactory({}, "controller", "get").then(res => {
            this.setState({
                controllerRight: JSON.parse(res).items,
                controllerPopup: JSON.parse(res).items,
            })
        })

        httpRequest.excuteFactory({}, "level", "get").then(res => {
            this.setState({
                levelRight: JSON.parse(res).items,
                levelPopup: JSON.parse(res).items,
            })
        })
        me.nextPrePage()
    }



    onChangeBuildingRight(controls, rec) {
        httpRequest.excuteFactory({ bId: rec.value }, "level", "get").then(res => {
            this.setState({
                levelRight: JSON.parse(res).items
            })
        })
    }

    onChangeLevelRight(control, rec) {
        httpRequest.excuteFactory({ lId: rec.value }, "controller", "get").then(res => {
            this.setState({
                controllerRight: JSON.parse(res).items
            })
        })
    }


    render() {
        const me = this
        let statusUse = JSON.stringify(me.state.statusUse),
            placeWork = JSON.stringify(me.province),
            listDataIndex = JSON.stringify(["lLb"])
        return (
            <General Title={'Quản lý sử dụng tủ'} className='manager-employee-locker-nguyen-ngoc-anh-feature'>
                <div className='col-6 manager-left padding-both-size-4'>
                    <BoxWrapNA Title="Thống kê số lượng tủ có thể sử dụng cho từng nhân viên" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxNA' textLabel='Bộ phận / phòng ban'
                                    placeholder="Chọn một bộ phận/ phòng ban" ref={me.departementLeft}
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    hasLabel={true} data={JSON.stringify(me.state.departement)} />
                                <InputNA ref={me.fullNameRef} className='col-4 padding-both-size-4'
                                    textLabel='Tên nhân viên' placeholder='ví dụ: NA'></InputNA>
                                <InputNA className='col-4 padding-both-size-4'
                                    ref={me.eCodeLeft}
                                    textLabel='Mã nhân viên' placeholder='ví dụ: nnanh'></InputNA>
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxBuilding' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà"
                                    ref={me.buildingLeft}
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    hasLabel={true} data={JSON.stringify(me.state.building)} />
                                <InputNA className='col-4 padding-both-size-4'
                                    ref={me.labelLeft} textLabel='Nhãn tủ' placeholder='ví dụ: 22.092'></InputNA>
                                <InputNA ref='filterResult' className='col-4 btn-filter padding-both-size-4'
                                    textLabel="" typeInput='button' value='Lọc kết quả' onClick={this.filterGridLeft.bind(this)}></InputNA>
                            </div>

                        </div>
                        <TableNA Height={500} ID={"tableManageEmployeeLocker"} data={JSON.stringify(me.state.dataGrid)}
                            NumPaging={5} changePaging={me.nextPrePage.bind(me)}
                            onClickDelete={me.onClickDeleteGridLeft.bind(me)}
                            ref={me.tableManageEmployeeLocker} onClickRowGrid={me.onClickRowGrid.bind(me)}>
                            <ColumnNA isLocked={true} Width={250} DataIndex='eName' text='Nhân viên' />
                            <ColumnNA MinWidth={150} Flex='1' text='Mã nhân viên' DataIndex='eCode' />
                            <ColumnNA Width={80} text='Số tủ' DataIndex='lNum' />
                            <ColumnNA Width={80} Command='Yes' DataIndex='Entertainment' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
                <div className='col-6 manager-right padding-both-size-4'>
                    <BoxWrapNA Title="Danh sách tủ trong nhóm" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxBuildingRight' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà" onChange={me.onChangeBuildingRight.bind(me)}
                                    ref={me.buildingRight}
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    hasLabel={true} data={JSON.stringify(me.state.building)} />
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxFloor' textLabel='Tầng'
                                    placeholder="Chọn một tầng" ref={me.levelRight}
                                    setField='lId' DisplayField="lLv" ValueField="lId"
                                    onChange={me.onChangeLevelRight.bind(me)}
                                    hasLabel={true} data={JSON.stringify(me.state.levelRight)} />
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxDeviceRemote' textLabel='Thiết bị điều khiển'
                                    placeholder="Chọn một mã thiết bị" ref={me.controllerRight}
                                    setField='cId' DisplayField="imei" ValueField="cId"
                                    hasLabel={true} data={JSON.stringify(me.state.controllerRight)} />
                                <InputNA className='col-4 padding-both-size-4' textLabel='Nhãn tủ'
                                    ref={me.labelRight} placeholder='ví dụ: 22.092'></InputNA>
                                <InputNA ref='filterResultRight' className='col-4 btn-filter padding-both-size-4'
                                    textLabel="" typeInput='button' value='Lọc kết quả' onClick={me.onClickFilterGridRight.bind(me)}></InputNA>
                                <InputNA ref='btnAddLocker' className='col-4 padding-both-size-4'
                                    textLabel="" typeInput='button' value='Thêm tủ' onClick={this.showPopupAddLocker.bind(this)}></InputNA>
                            </div>

                        </div>
                        <TableNA Height={500} ID={"tableManageEmployeeLockerRight"} data={JSON.stringify(me.state.dataGridRight)}
                            NumPaging={5} changePaging={me.nextPrePageGridRight.bind(me)}
                            onClickDelete={me.onClickDeleteGridRight.bind(me)}
                            ref={me.tableManageEmployeeLockerRight}>
                            <ColumnNA isLocked={true} Width={200} DataIndex='bName' text='Tòa nhà' />
                            <ColumnNA MinWidth={100} Flex='1' text='Tầng' DataIndex='lLv' />
                            <ColumnNA Width={100} text='Nhãn' DataIndex='lLb' />
                            <ColumnNA Width={100} text='Mô tả vị trí' DataIndex='lNum' />
                            <ColumnNA Width={80} Command='Yes' DataIndex='Entertainment' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
                {this.state.isShowPopup && <ComponentPopup className="pop-up-add-locker-to-group"
                    onClosePopup={me.closePopup.bind(me)}
                    ref={this.popup} Height={650} Width={900}>
                    <BoxWrapNA Title="Thêm tủ vào nhóm" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-12 padding-parent'>
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxBuildingPopup' textLabel='Toà nhà'
                                    placeholder="Chọn một tòa nhà"
                                    ref={me.buildingPopup}
                                    setField='bId' DisplayField="bName" ValueField="bId"
                                    hasLabel={true} data={JSON.stringify(me.state.building)} />
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxFloorPopup' textLabel='Tầng'
                                    placeholder="Chọn một tầng"
                                    ref={me.levelPopup}
                                    setField='lId' DisplayField="lLv" ValueField="lId"
                                    hasLabel={true} data={JSON.stringify(me.state.levelPopup)} />
                                <ComboboxNA className='col-4 padding-both-size-4' ID='ComboboxDeviceRemotePopup' textLabel='Thiết bị điều khiển'
                                    placeholder="Chọn một mã thiết bị"
                                    ref={me.controllerPopup}
                                    setField='cId' DisplayField="imei" ValueField="cId"
                                    hasLabel={true} data={JSON.stringify(me.state.controllerPopup)} />
                                <InputNA className='col-4 padding-both-size-4' textLabel='Nhãn tủ' ref={me.labelPopup} placeholder='ví dụ: 22.092'/>
                                <InputNA className='col-4 btn-filter padding-both-size-4' typeInput='button' onClick={me.filterPagePopup.bind(me)} value='Lọc danh sách' />
                                <InputNA className='col-4 padding-both-size-4' typeInput='button' value='Thêm tủ' onClick={me.addLockerToExistedPermission.bind(me)} />
                            </div>

                        </div>
                        <TableNA Height={250} ID={"tableManageEmployeeLockerPopup"} data={JSON.stringify(me.state.dataPopup)}
                            NumPaging={5} changePaging={me.nextPrePagePopup.bind(me)} isSelection={true}
                            ref={me.tableManageEmployeeLockerRight} onClickCheckboxColumn={me.onClickCheckboxColumnPopup.bind(me)}>
                            <ColumnNA isLocked={true} Width={100} DataIndex='bName' text='Tòa nhà' />
                            <ColumnNA MinWidth={100} Flex={1} text='Tầng' DataIndex='lLv' />
                            <ColumnNA MinWidth={120} Flex={1} text='Thứ tự' DataIndex='lId' />
                            <ColumnNA Width={100} text='Nhãn hiển thị' DataIndex='lLb' />
                            <ColumnNA Width={100} text='Mô tả vị trí' DataIndex='lNum' />
                            <ColumnNA Width={100} text='Nhóm tủ' DataIndex='aStatus' />
                        </TableNA>
                    </BoxWrapNA>
                    <ContainerWrapRecord data={me.state.dataWrapComponent} ref={me.containerWrapRec} sperator="-" listDataIndex={listDataIndex} textLabel={'Danh sách tủ trong nhóm'} />
                    <LabelInput ref={me.labelInputPopup} TextLabel="Cho phép các nhân viên đã được phân quyền sử dụng những tủ này tiếp tục sử dụng" />
                </ComponentPopup>}
            </General>
        )
    }
}

export default ManageEmployeeLocker