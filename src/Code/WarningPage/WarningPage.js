import React from 'react'
import General from '../../General/General'
import InputNA, { NgocAnh, ConfigsAPI, BoxWrapNA, SelectFormNA, httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA } from '../../ComponentCommon/Component'
import './warningpage.css'
class WarningPage extends React.Component {
  constructor() {
    super()
    this.onClickToggleBoxContent = this.onClickToggleBoxContent.bind(this)
  }
  onClickToggleBoxContent() {
    this.refs.boxContent.classList.toggle('toggle-box')
  }
  render() {
    return (
      <General Title='Cảnh báo'>
        <div className="col-12">
          <BoxWrapNA Title="Báo cáo trạng sự kiện tủ theo thời gian thực" className='' >
            <div className='row' typeChild='header'>
            </div>

            <TableNA Height={500} NumPaging={20} ItemId='eId'>
              <ColumnNA isLocked={true} Width={200} DataIndex='' text='Toa nha' />
              <ColumnNA Width={200} text='Tang' DataIndex='' />
              <ColumnNA MinWidth={200} Flex={1} text='Nhan hien thi' DataIndex='' />
              <ColumnNA Width={300} text='Hanh dong' DataIndex='email' />
              <ColumnNA Width={300} text='Trang thai' DataIndex='email' />
              <ColumnNA Width={300} text='Nguoi dung cuoi' DataIndex='email' />
              <ColumnNA Width={300} text='Ma nhan vien' DataIndex='email' />
              <ColumnNA Width={100} text='Thoi gian' Command='Yes' DataIndex='' />
            </TableNA>
          </BoxWrapNA>
        </div>
      </General>
    )
  }
}

export default WarningPage