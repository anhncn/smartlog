import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, { BoxWrapNA, SelectFormNA, httpRequest } from '../../ComponentCommon/Component'
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
    // statusUse = [
    //     { value: 1, display: 'Chưa có thể' },
    //     { value: 2, display: 'Đã có thẻ' },
    // ]
    componentDidMount() {
    }
    constructor() {
        super()
        this.state = {
            province: [],
            statusUse: [],
        }
        this.clickBtnFilter = this.clickBtnFilter.bind(this)
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
                url: 'http://localhost:49884/api/StatusCard',
            }
        httpRequest.get(config)
            .then((response) => {
                debugger
                let status = JSON.parse(response) || [], listStatus = []
                for (let i = 0; i < status.length; i++) {
                    listStatus.push({
                        value: status[i].StatusCardValue,
                        display: status[i].NameStatusCard,
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
                                <SelectFormNA className='col-3' data={placeWork} textLabel='Bộ phân làm việc' placeholder='Chọn một bộ phân làm việc'></SelectFormNA>
                                <SelectFormNA className='col-3' data={statusUse} textLabel='Tình trạng'></SelectFormNA>
                            </div>
                            <InputNA className='col-2 btn-filter' typeInput='button' value='Lọc kết quả' onClick={this.clickBtnFilter}></InputNA>
                        </div>
                        <div ref={'boxContent'} className="box-content">
                            <div style={{ overflow: "auto" }}>
                                <table style={{ borderCollapse: 'collapse', width: '100%', }}>
                                    <thead>
                                        <tr>
                                            <th>Họ và tên</th>
                                            <th>Mã nhân viên</th>
                                            <th>Bộ phận hiện thị</th>
                                            <th>Thẻ đang sử dụng</th>
                                            <th>Tiện ích</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="5">No data to dislay</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManagerCard