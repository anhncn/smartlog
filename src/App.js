import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { UserContext, UserProvider, ComboboxNA, TableNA, ColumnNA } from './ComponentCommon/Component'
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
//import ManagePINCode from './Code/ManageUsePINCode/ManagePINCode' 
const Index = () => <h2>Home</h2>
class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/Home/' exact component={Home}></Route>
        <Route path='/Manage/User/' exact component={ManageUsers}></Route>
        <Route path='/Manage/Card/' exact component={ManagerCard}></Route>
        <Route path='/Warn/Index/' exact component={Warn}></Route>
      </Router>
    )
  }
}


export default App;