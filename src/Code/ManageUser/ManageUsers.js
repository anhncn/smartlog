import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, {
    NgocAnh, ConfigsAPI, BoxWrapNA, SelectFormNA,
    httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA,
    ContainerWrapRecord
} from '../../ComponentCommon/Component'
import './manageUsers.css'
/**
 * Quản lý người dùng
 * nnanh 04.04.2020
 */
class ManageUsers extends Component {
    constructor() {
        super()
        this.state = {
            placeWork: [],
            dataGrid: '',
            departement: [],
            currentPageGrid: 1,
            token: "",
            dataWrapComponent: "",
        }
        this.txtFullName = React.createRef()
        this.txtEmployeeCode = React.createRef()
        this.comboboxRef = React.createRef()
        this.btnSaveEmployee = React.createRef()
        this.formCreateEmployee = React.createRef()
        this.dIdNewEmployee = React.createRef()
        this.newEmployeeCode = React.createRef()
        this.newEmployeeFullName = React.createRef()
        this.tableManageUser = React.createRef()
    }

    onClickFilterGrid() {
        this.getEmployees(1)
    }

    changePagingGrid(page) {
        this.getEmployees(page)
    }

    getEmployees(page = 1) {
        let me = this, employee = {},
            fullName = me.txtFullName.current.getValue(),
            employeeCode = me.txtEmployeeCode.current.getValue(),
            departement = me.comboboxRef.current.getRecordsSelected()
        if (fullName && fullName !== '') {
            employee.name = fullName
        }
        if (employeeCode && employeeCode !== '') {
            employee.code = employeeCode
        }
        if (departement && departement !== '') {
            employee.dId = departement.value
        }
        employee.page = page

        var containerID = me.tableManageUser.current.getID()
        NgocAnh.CommonFunction.showMaskLoading(containerID);
        httpRequest.getEmployee(employee)
            .then(res => {
                res = JSON.parse(res)
                let records = res.items
                if (res && records && records.length > 0) {
                    for (let i = 0; i < records.length; i++) {
                        let record = records[i]
                        const departementMatch = me.state.departement.filter(item => item.dId == record.dId)
                        if (departementMatch && departementMatch.length === 1) {
                            record.dName = departementMatch[0].dName
                        } else {
                            record.dName = ""
                        }
                    }
                }
                me.setState({
                    dataGrid: JSON.stringify(res),
                    currentPageGrid: employee.page,
                })
                // NgocAnh.CommonFunction.hideMaskLoading(containerID)
            })
            .catch(res=>{

            })
            .finally(()=>{
                setTimeout(function(){
                    NgocAnh.CommonFunction.hideMaskLoading(containerID)
                }, 300)
            })
    }

    saveEmployee() {
        let me = this,
            setFields = me.formCreateEmployee.current.props.children
                .filter(child => { return child.props.setField }),
            newEmployee = {}
        for (let i = 0; i < setFields.length; i++) {
            let value = setFields[i].ref.current.getValue(),
                setFieldObj = setFields[i].props.setField
            value = isNaN(value) ? value : parseInt(value)
            newEmployee[setFieldObj] = value
        }
        httpRequest.saveEmployee(newEmployee).then(res => {
            alert("Thêm mới người dùng thành công!");
            me.getEmployees(1);
        })
    }

    deleteEmployee(eId) {
        var me = this;
        httpRequest.deleteEmployee(eId).then(res => {
            alert("Xóa người dùng thành công!");
            me.getEmployees(1)
        }).catch(res => {
        })
    }

    onClickGridCell(controls, records) {
        var me = this
        me.setState({
            dataWrapComponent: JSON.stringify(records)
        })
    }

    componentDidMount() {
        let me = this
        httpRequest.getBuilding().then(res => {
            res = JSON.parse(res)

        })
        httpRequest.getAllDepartement().then(res => {
            this.setState({
                departement: res,
                placeWork: this.data
            })
            me.getEmployees()
        })
    }

    data = [
        { name: 'Anh', full: 'Van' },
        { name: 'Anh2', full: 'Van' },
        { name: 'Anh2', full: 'Van' },
        { name: 'Anh2', full: 'Van' },
        { name: 'Anh2', full: 'Van' },
        { name: 'Anh2', full: 'Van' },
    ]

    render() {
        const me = this, data = JSON.stringify(me.data), listDataIndex = JSON.stringify(['name','eCode'])
        return (
            <General Title={'Quản lý người dùng'} className='manager-user-nnanh'>
                <div className='col-3 left-panel'>
                    <BoxWrapNA Title="Thêm người dùng" ref={me.formCreateEmployee}>
                        <InputNA textLabel="Họ" placeholder="Ví dụ: Nguyễn" ></InputNA>
                        <InputNA textLabel="Tên đệm và tên" ref={me.newEmployeeFullName} setField='name' placeholder="Ví dụ: Nguyễn Văn ABC" />
                        <InputNA textLabel="Mã nhân viên" ref={me.newEmployeeCode} setField='code' placeholder="Ví dụ: ABCnv01" />
                        <ComboboxNA ID='ComboboxLeftPanel' ref={me.dIdNewEmployee} setField='dId' placeholder="Chọn bộ phận/phòng ban"
                            textLabel='Bộ phân làm việc' data={JSON.stringify(me.state.departement)}
                            DisplayField="dName" ValueField="dId" />
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm người dùng mới"} typeInput={'button'}
                            ref={me.btnSaveEmployee} onClick={me.saveEmployee.bind(me)} />
                    </BoxWrapNA>
                    <div className='padding-bottom-20'></div>
                    {/* <BoxWrapNA Title="Thêm email người dùng">
                        <InputNA textLabel="Mã nhân viên" placeholder="Ví dụ: 01-2345" />
                        <InputNA textLabel="Email" placeholder="Ví dụ: ABC@teckcombank.com.vn" />
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm email người dùng"} typeInput={'button'} />
                    </BoxWrapNA> */}
                </div>
                <div className='col-9 right-panel'>
                    <BoxWrapNA Title="Danh người dùng hiện hành" className='' >
                        <div className='row' typeChild='header'>
                            <InputNA className='col-3 padding-10' ref={me.txtFullName} textLabel='Tên nhân viên' placeholder='nhập tên nhân viên' />
                            <InputNA className='col-3 padding-10' ref={me.txtEmployeeCode} textLabel='Mã nhân viên' placeholder='nhập mã nhân viên' />
                            <ComboboxNA className='col-3 padding-10' ID='ComboboxRightPanel' textLabel='Bộ phân làm việc'
                                placeholder="Chọn bộ phận/phòng ban" data={JSON.stringify(me.state.departement)}
                                DisplayField="dName" ValueField="dId" ref={me.comboboxRef} />
                            <InputNA className='col-3 padding-10' typeInput='button'
                                value='Lọc kết quả' textLabel='&nbsp;'
                                onClick={me.onClickFilterGrid.bind(me)} />
                        </div>

                        <TableNA Height={500} ref={this.tableManageUser} isSelection={true}
                            NumPaging={20} ID="tableManageUser" ItemId='eId' onClickDelete={this.deleteEmployee.bind(this)}
                            onClickCheckboxColumn={me.onClickGridCell.bind(me)}
                            data={this.state.dataGrid} changePaging={this.changePagingGrid.bind(this)}>
                            <ColumnNA isLocked={true} Width={200} DataIndex='name' text='Họ và tên' />
                            <ColumnNA Width={200} text='Mã nhân viên' DataIndex='eCode' />
                            <ColumnNA MinWidth={200} Flex={1} text='Bộ phận làm việc' DataIndex='dName' />
                            <ColumnNA Width={300} text='Email cá nhận' DataIndex='email' />
                            <ColumnNA Width={100} text='Tiện ích' Command='Yes' DataIndex='' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManageUsers