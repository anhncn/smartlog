import React, { Component } from 'react';
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
  render() {
    return (
      <ManagerCard />
    )
  }
}
export default App;