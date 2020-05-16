import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, { BoxWrapNA, SelectFormNA, httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA, NgocAnh } from '../../ComponentCommon/Component'
import './managerCard.css'
/**
 * Quản lý sử dụng thẻ từ
 * nnanh 15.03.2020
 */
class ManagerCard extends Component {

    province = [
        { value: 1, display: 'Hà Nội' },
    ]

    records = [
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '1' },
    ]

    recordsComBobox = [
        { value: 1, display: 'Vĩnh Phúc' },
    ]

    constructor() {
        super()
        this.fullNameRef = React.createRef()

        this.clickBtnFilter = this.clickBtnFilter.bind(this)
        this.getDataAccess = this.getDataAccess.bind(this)
        this.state = {
            province: [],
            statusUse: [],
            dataTable: this.records,
            isRender: true,
            departement: [],
        }
    }

    getDataAccess() {
        let me = this,
            config = {
                method: 'GET',
                url: 'http://localhost:49884/api/CountProvince',
                async: true,
            }
        httpRequest.get(config)
        me.clickBtnFilter()
        this.setState({
            isRender: true,
        })
    }
    /**
     * Call API lấy danh sách tình trạng thẻ
     * Cần có một url hoạt động để get được data
     */
    clickBtnFilter() {
        let me = this,
            config = {
                method: 'GET',
                url: 'http://localhost:49884/api/Province',
            }
        httpRequest.get(config)
            .then((response) => {
                let status = JSON.parse(response) || [], listStatus = []
                for (let i = 0; i < status.length; i++) {
                    listStatus.push({
                        value: status[i].ValueProvince,
                        display: status[i].NameProvince,
                    })
                }
                me.setState({
                    statusUse: listStatus,
                })
            })
            .catch((response) => {

            })
    }

    renderGridGain() {
        this.setState({
            isRender: true,
        })
    }
    componentDidMount() {
        var me = this;
        this.clickBtnFilter()
        document.getElementsByTagName("BODY")[0].onresize = this.renderGridGain.bind(this)

        httpRequest.getToken().then(token => {
            me.Token = token
            document.getElementById("tokenNgocAnh").setAttribute("token", token)
            httpRequest.getAllDepartement().then(departs => {
                this.setState({
                    departement: departs
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
            })
            httpRequest.getEmployeeLockCanUse({}).then(res => {
                this.setState({
                    dataGrid: res
                })
            })
        })
    }
    render() {
        let statusUse = JSON.stringify(this.state.statusUse),
            placeWork = JSON.stringify(this.province),
            filterGrid = {
                FullName: this.fullNameRef.current ? this.fullNameRef.current.getValue() : null
            }
        return (
            <General Title={'Quản lý sử dụng thẻ từ'} className='manager-card-nguyen-ngoc-anh-feature'>
                <div className='col-3 manager-left'>
                    <BoxWrapNA Title="Thêm thẻ cho nhân viên">
                        <ComboboxNA className='' ID='ComboboxDepartMent' textLabel='Bô phận / phòng ban'
                            setField='dId' DisplayField="dName" ValueField="dId" placeholder="Chọn một bộ phận/ phòng ban"
                            hasLabel={true} data={JSON.stringify(this.state.departement)} />
                        <InputNA typeChild="footer" hasLabel={false} value={"Gán thẻ"} typeInput={'button'}></InputNA>
                    </BoxWrapNA>
                </div>
                <div className='col-9 manager-right'>
                    <BoxWrapNA Title="Danh sách thẻ từ hiện hành" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-10 padding-parent'>
                                <InputNA ref={this.fullNameRef} className='col-3' textLabel='Tên nhân viên' placeholder='ví dụ: NA'></InputNA>
                                <InputNA className='col-3' textLabel='Mã định danh' placeholder='ví dụ: nnanh'></InputNA>
                                <ComboboxNA className='col-3' ID='ComboboxNA' textLabel='Bộ phân làm việc'
                                    placeholder="Chọn một bộ phận/ phòng ban"
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    hasLabel={true} data={JSON.stringify(this.state.departement)} />
                                <SelectFormNA className='col-3' data={statusUse} textLabel='Tình trạng'></SelectFormNA>
                            </div>
                            <InputNA ref='filterResult' className='col-2 btn-filter' typeInput='button' value='Lọc kết quả' onClick={this.getDataAccess}></InputNA>
                        </div>
                        <TableNA Height={500} data={JSON.stringify(this.records)} NumPaging={5} Filter={filterGrid}>
                            <ColumnNA isLocked={true} Width={200} DataIndex='FullName' text='Họ và tên'>Hello</ColumnNA>
                            <ColumnNA MinWidth={300} Flex={1} text='Mã nhân viên' DataIndex='StudentCode'>Hello</ColumnNA>
                            <ColumnNA Width={200} text='Bộ phận hiện thị' DataIndex='DisplayPath'>Hello</ColumnNA>
                            <ColumnNA Width={200} text='Thẻ đang sử dụng' DataIndex='CardUsing'>Hello</ColumnNA>
                            <ColumnNA Width={100} text='Tiện ích' Command='Yes' DataIndex='Entertainment'>Hello</ColumnNA>
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}
ManagerCard.contextType = UserContext

export default ManagerCard