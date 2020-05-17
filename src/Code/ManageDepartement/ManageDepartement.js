import React, { Component } from 'react'
import General from '../../General/General'
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
            token: "",
        }
        this.btnSave = React.createRef()
        this.formBuilding = React.createRef()
    }

    saveBuilding(){

    }

    componentDidMount() {
        let me = this
        httpRequest.getAllDepartement().then(departs => {
            this.setState({
                dataGrid: departs
            })
        })

    }

    render() {
        return (
            <General Title={'Quản lý bộ phận'} className='manager-departement-nnanh'>
                <div className='col-3 left-panel'>
                    <BoxWrapNA Title="Thêm bộ phận / phòng ban" ref={this.formBuilding}>
                        <InputNA textLabel="Tên bộ phận / phòng ban" ref={React.createRef()} setField="name" placeholder="Ví dụ: Thẩm định dự án" />
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm bộ phận / phòng ban"} typeInput={'button'}
                            ref={this.btnSave} onClick={this.saveBuilding.bind(this)} />
                    </BoxWrapNA>
                </div>
                <div className='col-9 right-panel'>
                    <BoxWrapNA Title="Danh sách bộ phận / phòng ban hiện hành" className='' >
                        <TableNA Height={500} NumPaging={20} ItemId='dId' data={this.state.dataGrid}>
                            <ColumnNA Width={200} text='Bộ phận/ phòng ban' DataIndex='dName' />
                            <ColumnNA MinWidth={200} Flex={1} text='Tiện ích' DataIndex='bDes' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManageDepartement