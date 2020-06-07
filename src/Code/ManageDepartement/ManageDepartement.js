import React, { Component } from 'react'
import General from '../../General/General'
import uuidv4 from 'uuid/dist/v4'
import InputNA, { NgocAnh, ConfigsAPI, BoxWrapNA, SelectFormNA,
     httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA } from '../../ComponentCommon/Component'
import './manageDepartement.css'
/**
 * Quản lý bộ phận phòng ban
 * nnanh 16.04.2020
 */
class ManageDepartement extends Component {
    Token = ""
    constructor() {
        super()
        this.state = {
            placeWork: [],
            dataGrid: '',
            departement: [],
            currentPageGrid: 1,
            isRender: false,
            token: "",
            id: uuidv4()
        }
        this.btnSave = React.createRef()
        this.formBuilding = React.createRef()
        this.formDepartment = React.createRef()

        this.nameDepartment = React.createRef()
    }

    saveDepartment(){
        let me = this, param = {name: me.nameDepartment.current.getValue()},
        id = me.formDepartment.current.getID()
        NgocAnh.CommonFunction.showMaskLoading(id)
        httpRequest.excuteFactory(param, "department", "create").then(res=>{
            me.nextPrePage()
            alert("Thêm thành công bộ phận!")
        }).finally(()=>{
            NgocAnh.CommonFunction.hideMaskLoading(id)
        })
    }

    componentDidMount() {
        this.nextPrePage();
    }

    nextPrePage(num = 1){
        let me = this
        NgocAnh.CommonFunction.showMaskLoading(me.state.id)
        httpRequest.excuteFactory({page: num}, "department", "getPaging").then(res=>{
            this.setState({
                dataGrid: res
            })
        }).finally(()=>{
            NgocAnh.CommonFunction.hideMaskLoading(me.state.id)
        })
    }

    onClickDelDepartement(id ,rec){
        let me = this
        NgocAnh.CommonFunction.showMaskLoading(me.state.id)
        httpRequest.excuteFactory({dId: id}, "department", "remove").then(res=>{
            me.nextPrePage()
            alert("Xóa thành công bộ phận!")
        }).finally(()=>{
            NgocAnh.CommonFunction.hideMaskLoading(me.state.id)
        })
    }

    render() {
        let me = this
        return (
            <General Title={'Quản lý bộ phận'} className='manager-departement-nnanh'>
                <div className='col-3 left-panel'>
                    <BoxWrapNA ref={me.formDepartment} Title="Thêm bộ phận / phòng ban">
                        <InputNA textLabel="Tên bộ phận / phòng ban" ref={me.nameDepartment} setField="name" placeholder="Ví dụ: Thẩm định dự án" />
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm bộ phận / phòng ban"} typeInput={'button'}
                            ref={this.btnSave} onClick={this.saveDepartment.bind(this)} />
                    </BoxWrapNA>
                </div>
                <div className='col-9 right-panel'>
                    <BoxWrapNA Title="Danh sách bộ phận / phòng ban hiện hành" className='' >
                        <TableNA Height={500} NumPaging={20} ID={me.state.id}
                         changePaging={this.nextPrePage.bind(this)}
                         onClickDelete={me.onClickDelDepartement.bind(me)}
                         ItemId='dId' data={this.state.dataGrid}>
                            <ColumnNA  MinWidth={200} Flex={1} text='Bộ phận/ phòng ban' DataIndex='dName' />
                            <ColumnNA Width={80} Command='Yes' text='Tiện ích' DataIndex='Entertainment' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManageDepartement