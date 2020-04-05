import React, { Component } from 'react'
import General from '../../General/General'
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
import InputNA, { BoxWrapNA, SelectFormNA, httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA } from '../../ComponentCommon/Component'
import './manageUsePINCode.css'
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
        { ProvinceID: 1, ProvinceName: 'Hà Nội' },
        { ProvinceID: 3, ProvinceName: 'Thanh Hoas' },
    ]
    componentDidMount() {
        this.setState({
            placeWork: this.data
        })
    }
    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    render() {
        return (
            <General Title={'Quản lý sử dụng PINCode'} className='manager-user-PINCode-nnanh'>
                <div className='col-3 left-panel'>
                    <BoxWrapNA Title="Thêm PINcode">
                        <InputNA textLabel="Mã nhân viên" placeholder="Ví dụ: ABCnv01" />
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm người dùng mới"} typeInput={'button'} />
                    </BoxWrapNA>
                </div>
                <div className='col-9 right-panel'>
                    <BoxWrapNA Title="Danh người dùng hiện hành" className='' >
                        <div className='row' typeChild='header'>
                            <InputNA className='col-3 padding-10' textLabel='Tên nhân viên' placeholder='nhập tên nhân viên' />
                            <InputNA className='col-3 padding-10' textLabel='Mã định danh' placeholder='nhập mã nhân viên' />
                            <ComboboxNA className='col-3 padding-10' ID='ComboboxRightPanel1' textLabel='Bộ phân làm việc'
                                placeholder="Chọn bộ phận/phòng ban" data={JSON.stringify(this.state.placeWork)}
                                DisplayField="ProvinceName" ValueField="ProvinceID" />
                            <InputNA className='col-3 padding-10' typeInput='button' value='Lọc kết quả' textLabel='&nbsp;'></InputNA>
                        </div>

                        <TableNA Height={500} NumPaging={20}>
                            <ColumnNA isLocked={true} Width={200} DataIndex='' text='Họ và tên' />
                            <ColumnNA Width={200} text='Mã nhân viên' DataIndex='' />
                            <ColumnNA MinWidth={200} Flex={1} text='Bộ phận làm việc' DataIndex='' />
                            <ColumnNA Width={300} text='PINCode' DataIndex='' />
                            <ColumnNA Width={150} text='Tiện ích' Command='Yes' DataIndex='' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManageUsers