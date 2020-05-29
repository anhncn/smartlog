import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { UserContext, UserProvider, ComboboxNA, TableNA, ColumnNA, NgocAnh } from './ComponentCommon/Component'
/**
 * updated nnanh 08/03/2020
 * Không sử dụng các hàm có dạng base nữa
 * ex : Folder LoginBase, Folder Base
 */

import Login from './Code/LoginPage/Login'
import Warn from './Code/WarningPage/WarningPage'
import ManagerCard from './Code/ManagerCardUsing/ManagerCard'
import Home from './Code/HomePage/Home'
import ManageUsers from './Code/ManageUser/ManageUsers'
import ManageBuilding from './Code/ManageBuilding/ManageBuilding'
import ManageLocker from './Code/ManageLocker/ManageLocker'
import ManageDepartement from './Code/ManageDepartement/ManageDepartement'
import ManageEmployeeLocker from './Code/ManageEmployeeLocker/ManageEmployeeLocker'
import ManageLockerLayout from './Code/ManageLockerLayout/ManageLockerLayout'
import ManageLockerController from './Code/ManageLockerController/ManageLockerController'
//import ManagePINCode from './Code/ManageUsePINCode/ManagePINCode' 
class App extends Component {

  createContainerOverLay() {
    let me = this
    if (!me.getContainerOverLay()) {
      let container = document.createElement('DIV'), id = NgocAnh.Enumeration.Overay.ID
      container.className = 'overlay-cutom'
      container.setAttribute('id', id)
      document.querySelector('body').appendChild(container)
    }
    console.log('Create overlay succes!')
    NgocAnh.CommonFunction.hideOverlay()
    return me.getContainerOverLay()
  }

  createContainerPopupOptionLocker() {
    let me = this
    if (!me.getContainerPopupOptionLocker()) {
      let container = document.createElement('DIV'), id = NgocAnh.Enumeration.PopupOptionLocker.ID
      container.className = 'popup-option-locker-cutom'
      container.setAttribute('id', id)
      document.querySelector('body').appendChild(container)
    }
    return me.getContainerOverLay()
  }

  getContainerPopupOptionLocker() {
    const id = NgocAnh.Enumeration.PopupOptionLocker.ID
    return document.querySelector(`[id='${id}']`)
  }

  getContainerOverLay() {
    const id = NgocAnh.Enumeration.Overay.ID
    return document.querySelector(`[id='${id}']`)
  }

  componentDidMount() {
    this.createContainerOverLay()
    this.createContainerPopupOptionLocker()

  }
  render() {
    return (
      <Router>
        <Route path='/' exact component={ManageLocker}></Route>
        <Route path='/Login/' exact component={Login}></Route>
        <Route path='/Home/' exact component={Home}></Route>
        <Route path='/Manage/User/' exact component={ManageUsers}></Route>
        <Route path='/Manage/Card/' exact component={ManagerCard}></Route>
        <Route path='/Manage/Building/' exact component={ManageBuilding}></Route>
        <Route path='/Manage/Departement/' exact component={ManageDepartement}></Route>
        <Route path='/Manage/EmployeeLocker/' exact component={ManageEmployeeLocker}></Route>
        <Route path='/Manage/LockerLayout/' exact component={ManageLockerLayout}></Route>
        <Route path='/Manage/LockerController/' exact component={ManageLockerController}></Route>
        <Route path='/Warn/Index/' exact component={Warn}></Route>
      </Router>
    )
  }
}


export default App;