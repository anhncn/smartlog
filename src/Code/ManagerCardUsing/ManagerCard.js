import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, { BoxWrapNA, SelectFormNA, httpRequest, 
    UserContext, TableNA, ComboboxNA, ColumnNA, NgocAnh } from '../../ComponentCommon/Component'
import './managerCard.css'
/**
 * Quản lý sử dụng thẻ từ
 * nnanh 15.03.2020
 */
class ManagerCard extends Component {   

    constructor() {
        super()
        this.fullNameRef = React.createRef()
        this.tableManageCard = React.createRef()

        this.state = {
            province: [],
            statusUse: [],
            dataTable: this.records,
            dataGrid: [],
            isRender: true,
            departement: [],
        }
    }

    renderGridGain() {
        this.setState({
            isRender: true,
        })
    }

    nextPrePage(num = 1){
        const me = this, idContainer = me.tableManageCard.current.getID()
        NgocAnh.CommonFunction.showMaskLoading(idContainer)
        httpRequest.getEmployeeLockCanUse({page: num}).then(res => {
            var paging = JSON.parse(res)
            me.setState({
                dataGrid: paging,
            })
            NgocAnh.CommonFunction.hideMaskLoading(idContainer)
        })
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
        // httpRequest.getLockerUsage({}).then(res=>{
        //     debugger
        // })
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
                                <InputNA ref={me.fullNameRef} className='col-3' textLabel='Tên nhân viên' placeholder='ví dụ: NA'></InputNA>
                                <InputNA className='col-3' textLabel='Mã định danh' placeholder='ví dụ: nnanh'></InputNA>
                                <ComboboxNA className='col-3' ID='ComboboxNA' textLabel='Bộ phân làm việc'
                                    placeholder="Chọn một bộ phận/ phòng ban"
                                    setField='dId' DisplayField="dName" ValueField="dId"
                                    hasLabel={true} data={JSON.stringify(me.state.departement)} />
                                <SelectFormNA className='col-3' data={statusUse} textLabel='Tình trạng'></SelectFormNA>
                            </div>
                            <InputNA ref='filterResult' className='col-2 btn-filter' typeInput='button' value='Lọc kết quả' onClick={this.getDataAccess}></InputNA>
                        </div>
                        <TableNA Height={500} ID={"tableManageCard"} data={JSON.stringify(me.state.dataGrid)} 
                        NumPaging={5} Filter={filterGrid} changePaging={me.nextPrePage.bind(me)}
                        ref={me.tableManageCard}>
                            <ColumnNA isLocked={true} Width={200} DataIndex='eName' text='Họ và tên' />
                            <ColumnNA MinWidth={150} Flex={1} text='Mã nhân viên' DataIndex='eCode' />
                            <ColumnNA Width={200} text='Bộ phận hiện thị' DataIndex='dId' />
                            <ColumnNA Width={200} text='Thẻ đang sử dụng' DataIndex='lNum' />
                            <ColumnNA Width={100} text='Tiện ích' Command='Yes' DataIndex='Entertainment' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}
ManagerCard.contextType = UserContext

export default ManagerCard