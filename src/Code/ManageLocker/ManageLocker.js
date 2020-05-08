import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, { NgocAnh, ConfigsAPI, BoxWrapNA, SelectFormNA, httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA, FormSubmit } from '../../ComponentCommon/Component'
import './manageLocker.css'
/**
 * Quản lý tủ khóa
 * nnanh 04.04.2020
 */
class ManageLocker extends Component {
    Token = ""
    constructor() {
        super()
        this.state = {
            placeWork: [],
            dataGrid: '',
            building: [],
            departement: [],
            currentPageGrid: 1,
            token: "",
        }
        this.btnSave = React.createRef()
        this.formLocker = React.createRef()
        this.lockerHeader = React.createRef()
        this.comboboxRefDepartement = React.createRef()
        this.comboboxRefBuilding = React.createRef()
    }

    saveBuilding() {
        let me = this
        // me.formLocker.current.props.children[0].ref.current
        if (me && me.formLocker && me.formLocker.current.props.children.length > 0) {
            let childrens = me.formLocker.current.props.children
            let object = {}
            for (let i = 0; i < childrens.length; i++) {
                let child = childrens[i].ref.current;
                if (child && child.props.setField) {
                    object[child.props.setField] = child.getValue()
                }
            }
            httpRequest.createBuilding(object).then(res => {
                debugger
            }).catch(res => {
                debugger
            })
        }

    }

    onclickFilterGrid() {
        let me = this
        debugger
        if(me && me.lockerHeader && me.lockerHeader.current.props.children.length > 0){
            let childrens = me.lockerHeader.current.props.children, object = {}
            for(let i = 0 ; i < childrens.length ;i++){
                let child = childrens[i].ref.current;
                if(child && child.props.setField){
                    object[child.props.setField] = child.getValue()
                }
            }
            object.page = 1
            debugger
            httpRequest.getEmployeeLockCanUse(object).then(res => {
                me.setState({
                    dataGrid: res,
                    currentPageGrid: 1,
                })
            })
        }
    }

    changePaging(page) {
        debugger
        httpRequest.getEmployeeLockCanUse({ page: page }).then(res => {
            this.setState({
                dataGrid: res,
                currentPageGrid: page,
            })
        })
    }

    componentDidMount() {
        let me = this
        httpRequest.getToken().then(res => {
            me.Token = res
            document.getElementById("tokenNgocAnh").setAttribute("token", res)
            httpRequest.getAllDepartement().then(res => {
                this.setState({
                    departement: res
                })
            })
            httpRequest.getBuilding({}).then(res => {
                this.setState({
                    //dataGrid: res,
                    building: JSON.parse(res).items,
                })
                res = JSON.parse(res)
            })
            // httpRequest.getLockerUsage({}).then(res=>{
            //     debugger
            // })
            httpRequest.getLockerManage({}).then(res => {
                debugger
            })
            httpRequest.getEmployeeLockCanUse({}).then(res => {
                debugger
                this.setState({
                    dataGrid: res
                })
            })
        })
    }


    render() {
        let me = this
        return (
            <General Title={'Quản lý sử dụng tủ'} className='manager-locker-nnanh'>
                <div className='col-6 left-panel'>
                    <BoxWrapNA Title="Thống kê số lượng tủ có thể sử dụng cho từng nhân viên" ref={me.formLocker}>
                        <FormSubmit className='row' typeChild='header' ref={me.lockerHeader}>
                            <ComboboxNA className='col-4 padding-10' ID='comboboxDepartement' setField='dId' textLabel='Bộ phân làm việc'
                                placeholder="Chọn bộ phận/phòng ban" data={JSON.stringify(me.state.departement)}
                                DisplayField="dName" ValueField="dId" ref={me.comboboxRefDepartement} />
                            <InputNA className='col-4 padding-10' textLabel='Tên nhân viên' setField='eName' ref={React.createRef()} placeholder='Ví dụ: Anh' />
                            <InputNA className='col-4 padding-10' textLabel='Mã nhân viên' setField='eCode' ref={React.createRef()} placeholder='Ví dụ: nnanh' />
                            <ComboboxNA className='col-4 padding-10' ID='comboboxBuildingLeft' setField='bId' textLabel='Tòa nhà'
                                placeholder="Chọn một tòa nhà" data={JSON.stringify(me.state.building)}
                                DisplayField="bName" ValueField="bId" ref={me.comboboxRefBuilding} />
                            <InputNA className='col-4 padding-10' textLabel='Nhãn tủ' setField='label' ref={React.createRef()} placeholder='Ví dụ:22092' />
                            <InputNA className='col-4 padding-10' typeInput='button' value='Lọc danh sách' textLabel='&nbsp;' onClick={me.onclickFilterGrid.bind(me)} ref={React.createRef()}></InputNA>
                        </FormSubmit>
                        <TableNA Height={500} NumPaging={20} ItemId='eId' data={me.state.dataGrid} changePaging={me.changePaging.bind(me)}>
                            <ColumnNA Width={200} text='Nhân viên' DataIndex='eName' />
                            <ColumnNA Width={200} text='Mã nhân viên' DataIndex='eCode' />
                            <ColumnNA MinWidth={200} Flex={1} text='Số tủ' DataIndex='lNum' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
                <div className='col-6 right-panel'>
                    <BoxWrapNA Title="Danh sách tủ trong nhóm" className='' >
                        <div className='row' typeChild='header'>
                            <ComboboxNA className='col-4 padding-10' ID='comboboxBuildingRight' textLabel='Tòa nhà'
                                placeholder="Chọn một tòa nhà" data={JSON.stringify(me.state.building)}
                                DisplayField="bName" ValueField="bId" ref={me.comboboxRefBuildingRight} />
                            <InputNA className='col-4 padding-10' textLabel='Nhãn tủ' placeholder='Ví dụ:22092' />
                            <InputNA className='col-4 padding-10' typeInput='button' value='Lọc danh sách' textLabel='&nbsp;' onClick={me.onclickFilterGrid.bind(me)}></InputNA>
                        </div>
                        <TableNA Height={500} NumPaging={20} ItemId='eId' data={me.state.dataGrid} changePaging={me.changePaging.bind(me)}>
                            <ColumnNA Width={200} text='Tòa nhà' DataIndex='' />
                            <ColumnNA Width={200} text='Tầng' DataIndex='' />
                            <ColumnNA MinWidth={200} Flex={1} text='Nhãn' DataIndex='' />
                            <ColumnNA MinWidth={200} Flex={1} text='Mô tả vị trí' DataIndex='' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManageLocker