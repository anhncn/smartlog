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
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '1' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '2' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '3' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '4' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '5' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '6' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '7' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '8' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '9' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '10' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '11' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '12' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '13' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '14' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '15' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '16' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '17' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '18' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '19' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '20' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '21' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '22' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '23' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '24' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '25' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '26' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '27' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '28' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '29' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '30' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '31' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '32' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '33' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '34' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '35' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '36' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '37' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '38' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '39' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '40' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '41' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '42' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '43' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '44' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '45' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '46' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '47' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '48' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '49' },
        { FullName: 'Ngọc Anh', StudentCode: '1', DisplayPath: 'Vĩnh Phúc', CardUsing: '16', Entertainment: 'Xóa', RecordID: '50' },

    ]
    recordsComBobox = [
        { value: 1, display: 'Vĩnh Phúc' },
        { value: 2, display: 'Hà Nội' },
        { value: 3, display: 'Thái Bình' },
        { value: 4, display: 'Hải Dương' },
        { value: 5, display: 'Thanh Hóa' },
        { value: 6, display: 'HCM' },
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
    renderGridGain() {
        this.setState({
            isRender: true,
        })
    }
    componentDidMount() {
        this.clickBtnFilter()
        document.getElementsByTagName("BODY")[0].onresize = this.renderGridGain.bind(this)
        // document.querySelector('.col-2 input').dispatchEvent(new Event('click', { 'bubbles': true }))
    }
    render() {
        console.log('render manager card')
        let statusUse = JSON.stringify(this.state.statusUse),
            placeWork = JSON.stringify(this.province),
            filterGrid = {
                FullName: this.fullNameRef.current ? this.fullNameRef.current.getValue() : null
            }
        return (
            <General Title={'Quản lý sử dụng thẻ từ'} className='manager-card-nguyen-ngoc-anh-feature'>
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
                                <InputNA ref={this.fullNameRef} className='col-3' textLabel='Tên nhân viên' placeholder='ví dụ: NA'></InputNA>
                                <InputNA className='col-3' textLabel='Mã định danh' placeholder='ví dụ: nnanh'></InputNA>
                                <ComboboxNA className='col-3' ID='ComboboxNA' textLabel='Bộ phân làm việc'
                                 hasLabel={true} data={JSON.stringify(this.recordsComBobox)} 
                                 DisplayField="display" ValueField="value" />
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