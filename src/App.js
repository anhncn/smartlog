import React, { Component } from 'react'
import { UserContext, UserProvider, ComboboxNA, TableNA, ColumnNA } from './ComponentCommon/Component'
/**
 * updated nnanh 08/03/2020
 * Không sử dụng các hàm có dạng base nữa
 * ex : Folder LoginBase, Folder Base
 */

// import Login from './Code/LoginPage/Login'
// import Home from './Code/HomePage/Home'
// import Warn from './Code/WarningPage/WarningPage'
import ManagerCard from './Code/ManagerCardUsing/ManagerCard' 
class App extends Component {
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
  render() {
    return (
      <UserProvider>
        <ManagerCard/>
        {/* <TableNA Height={400} Width={600} data={JSON.stringify(this.records)}>
          <ColumnNA isLocked={true} Width={200} DataIndex='FullName' text='Họ và tên'>Hello</ColumnNA>
          <ColumnNA Width={200} text='Mã nhân viên' DataIndex='StudentCode'>Hello</ColumnNA>
          <ColumnNA Width={200} text='Bộ phận hiện thị' DataIndex='DisplayPath'>Hello</ColumnNA>
          <ColumnNA Width={200} text='Thẻ đang sử dụng' DataIndex='CardUsing'>Hello</ColumnNA>
          <ColumnNA Width={200} text='Tiện ích' DataIndex='Entertainment'>Hello</ColumnNA>
        </TableNA> */}
        {/* <ComboboxNA data={JSON.stringify(this.recordsComBobox)}/> */}
      </UserProvider>
    )
  }
}
class Sibling extends Component {
  constructor() {
    super()
    this.state = {
      countPP: 0,
    }
    this.onClickProp = this.onClickProp.bind(this)
  }
  onClickProp() {
    this.context.setState({
      count: this.context.state.count + 1,
    }, () => {
    })
    this.setState({
      countPP: this.context.state.count,
    })
  }
  render() {
    console.log('render')
    return (
      <div onClick={this.onClickProp}>
        clicked
        {this.state.countPP}
        {this.context.state.count}
      </div>
    )
  }
}
Sibling.contextType = UserContext
class Children extends Component {
  render() {
    return (
      <Sibling></Sibling>
    )
  }
}

class Parent extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }
  render() {
    return (
      <UserProvider value={this}>
        <Children></Children>
      </UserProvider>
    )
  }
}
export default App;