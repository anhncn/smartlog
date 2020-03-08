import React, { Component } from 'react';

/**
 * updated nnanh 08/03/2020
 * Không sử dụng các hàm có dạng base nữa
 * ex : Folder LoginBase, Folder Base
 */

import Login from './Code/LoginPage/Login'
import Home from './Code/HomePage/Home'
import Warn from './Code/WarningPage/WarningPage'
class App extends Component {
  render() {
    return (
      <Warn />
    )
  }
}
export default App;