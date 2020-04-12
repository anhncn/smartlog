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
// import ManagerCard from './Code/ManagerCardUsing/ManagerCard' 
import ManageUsers from './Code/ManageUser/ManageUsers' 
//import ManagePINCode from './Code/ManageUsePINCode/ManagePINCode' 
class App extends Component {
  render() {
    return (
      <UserProvider>
        <ManageUsers/>
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