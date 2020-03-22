import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, { BoxWrapNA, SelectFormNA, httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA } from '../../ComponentCommon/Component'
import './managerCard.css'
/**
 * Quản lý sử dụng thẻ từ
 * nnanh 15.03.2020
 */
class ManagerCard extends Component {
    /**
     * Danh sách các tỉnh...
     */
    province = [
        { value: 1, display: 'Hà Nội' },
        { value: 2, display: 'Vĩnh Phúc' },
        { value: 3, display: 'Mê Linh' },
        { value: 4, display: 'Vĩnh Phúcc' },
        { value: 5, display: 'Thái Bình' },
        { value: 6, display: 'Thanh Hóa' },
    ]
    records = [
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
        { FullName: 'Ngọc Anh', StudentCode:'1', DisplayPath:'Vĩnh Phúc', CardUsing:'16', Entertainment:'Xóa'},
    ]
    recordsComBobox =[
        {value:1, display:'Vĩnh Phúc'},
        {value:2, display:'Hà Nội'},
        {value:3, display:'Thái Bình'},
        {value:4, display:'Hải Dương'},
        {value:5, display:'Thanh Hóa'},
        {value:6, display:'HCM'},
    ]
    constructor() {
        super()
        this.state = {
            province: [],
            statusUse: [],
        }
        this.clickBtnFilter = this.clickBtnFilter.bind(this)
        this.getDataAccess = this.getDataAccess.bind(this)
    }
    getDataAccess() {
        let me = this,
            config = {
                method: 'GET',
                url: 'http://localhost:49884/api/CountProvince',
                async: false,
            }
        httpRequest.get(config)
        me.clickBtnFilter()
    }
    /**
     * Call API lấy danh sách tình trạng thẻ
     * Cần có một url hoạt động để get được data
     */
    clickBtnFilter() {
        console.log('clicked manager card')
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
                console.log(response)
            })
    }
    componentDidMount() {
        // let value = this.context
        this.clickBtnFilter()
        //debugger
        // document.querySelector('.col-2 input').dispatchEvent(new Event('click', { 'bubbles': true }))
    }
    render() {
        console.log('render manager card')
        let statusUse = JSON.stringify(this.state.statusUse),
            placeWork = JSON.stringify(this.province)
        return (
            <General Title={'Quản lý sử dụng thẻ từ'}>
                <div className='col-3 manager-left'>
                    <BoxWrapNA Title="Thêm thẻ cho nhân viên">
                        <InputNA textLabel="Bô phận / phòng ban" placeholder="Chọn một bộ phận/ phòng ban" ></InputNA>
                        <InputNA typeChild="footer" hasLabel={false} value={"Gán thẻ"} typeInput={'button'}></InputNA>
                    </BoxWrapNA>
                </div>
                <div className='col-9 manager-right'>
                    <BoxWrapNA Title="Danh sách thẻ từ hiện hành" className='box-wrap-custom' >
                        <div className='row' typeChild='header'>
                            <div className='col-10 padding-parent'>
                                <InputNA className='col-3' textLabel='Tên nhân viên' placeholder='ví dụ: NA'></InputNA>
                                <InputNA className='col-3' textLabel='Mã định danh' placeholder='ví dụ: nnanh'></InputNA>
                                <ComboboxNA className='col-3' ID='ComboboxNA' textLabel='Mã định danh' hasLabel={true} data={JSON.stringify(this.recordsComBobox)}/>
                                <SelectFormNA className='col-3' data={statusUse} textLabel='Tình trạng'></SelectFormNA>
                            </div>
                            <InputNA ref='filterResult' className='col-2 btn-filter' typeInput='button' value='Lọc kết quả' onClick={this.getDataAccess}></InputNA>
                        </div>
                        <TableNA Height={400} Width={920} data={JSON.stringify(this.records)}>
                            <ColumnNA isLocked={true} Width={200} DataIndex='FullName' text='Họ và tên'>Hello</ColumnNA>
                            <ColumnNA Width={200} text='Mã nhân viên' DataIndex='StudentCode'>Hello</ColumnNA>
                            <ColumnNA Width={200} text='Bộ phận hiện thị' DataIndex='DisplayPath'>Hello</ColumnNA>
                            <ColumnNA Width={200} text='Thẻ đang sử dụng' DataIndex='CardUsing'>Hello</ColumnNA>
                            <ColumnNA Width={200} text='Tiện ích' DataIndex='Entertainment'>Hello</ColumnNA>
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}
ManagerCard.contextType = UserContext

export default ManagerCard