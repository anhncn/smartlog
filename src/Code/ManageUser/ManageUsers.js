import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, { BoxWrapNA, SelectFormNA, httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA } from '../../ComponentCommon/Component'
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

        }
    }
    data = [
        { value: 1, display: 'Hà Nội' },
        { value: 2, display: 'Hà Nội' },
        { value: 3, display: 'Hà Nội' },
        { value: 4, display: 'Hà Nội' },
        { value: 5, display: 'Hà Nội' }
    ]
    componentDidMount() {
        this.setState({
            placeWork: this.data
        })
    }
    render() {
        return (
            <General Title={'Quản lý người dùng'} className='manager-user-nnanh'>
                <div className='col-3 left-panel'>
                    <BoxWrapNA Title="Thêm người dùng">
                        <InputNA textLabel="Họ" placeholder="Ví dụ: Nguyễn" ></InputNA>
                        <InputNA textLabel="Tên đệm và tên" placeholder="Ví dụ: Nguyễn Văn ABC" ></InputNA>
                        <InputNA textLabel="Mã nhân viên" placeholder="Ví dụ: ABCnv01" ></InputNA>
                        <ComboboxNA ID='ComboboxLeftPanel' placeholder="Chọn bộ phận/phòng ban"
                            textLabel='Bộ phân làm việc' data={JSON.stringify(this.state.placeWork)} 
                            DisplayField="display" ValueField="value"/>
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm người dùng mới"} typeInput={'button'}></InputNA>
                    </BoxWrapNA>
                    <div className='padding-bottom-20'></div>
                    <BoxWrapNA Title="Thêm email người dùng">
                        <InputNA textLabel="Mã nhân viên" placeholder="Ví dụ: 01-2345" ></InputNA>
                        <InputNA textLabel="Email" placeholder="Ví dụ: ABC@teckcombank.com.vn" ></InputNA>
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm email người dùng"} typeInput={'button'}></InputNA>
                    </BoxWrapNA>
                </div>
                <div className='col-9 right-panel'>
                    <BoxWrapNA Title="Danh người dùng hiện hành" className='' >
                        <div className='row' typeChild='header'>
                            <InputNA className='col-3 padding-10' textLabel='Tên nhân viên' placeholder='nhập tên nhân viên' />
                            <InputNA className='col-3 padding-10' textLabel='Mã định danh' placeholder='nhập mã nhân viên' />
                            <ComboboxNA className='col-3 padding-10' ID='ComboboxRightPanel' textLabel='Bộ phân làm việc'
                                placeholder="Chọn bộ phận/phòng ban" data={JSON.stringify(this.state.placeWork)} 
                                DisplayField="display" ValueField="value"/>
                            <InputNA className='col-3 padding-10' typeInput='button' value='Lọc kết quả' textLabel='&nbsp;'></InputNA>
                        </div>

                        <TableNA Height={500} NumPaging={20}>
                            <ColumnNA isLocked={true} Width={200} DataIndex='' text='Họ và tên' />
                            <ColumnNA Width={200} text='Mã nhân viên' DataIndex='' />
                            <ColumnNA MinWidth={200} Flex={1} text='Bộ phận làm việc' DataIndex='' />
                            <ColumnNA Width={300} text='Email cá nhận' DataIndex='' />
                            <ColumnNA Width={100} text='Tiện ích' Command='Yes' DataIndex='' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManageUsers