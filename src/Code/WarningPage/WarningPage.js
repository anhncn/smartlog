import React from 'react'
import General from '../../General/General'
import './warningpage.css'
class WarningPage extends React.Component{
  constructor(){
    super()
    this.onClickToggleBoxContent = this.onClickToggleBoxContent.bind(this)
  }

  onClickToggleBoxContent(){
    this.refs.boxContent.classList.toggle('toggle-box')
  }
    render() {
        return (
          <General>
            <div className="col-12">
              <div className="box-header">
                <div className="title-box">Báo cáo trạng sự kiện tủ theo thời gian thực</div>
                <div className="box-tool">
                  <button onClick={this.onClickToggleBoxContent} className="btn btn-box-tool">
                    +
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
              </div>
              <div ref={'boxContent'} className="box-content">
                <div style={{ overflow: "auto" }}>
                  <table style={{ borderCollapse: 'collapse', width: '100%', }}>
                    <thead>
                      <tr>
                        <th>Toa nha</th>
                        <th>Tang</th>
                        <th>Nhan hien thi</th>
                        <th>Hanh dong</th>
                        <th>Trang thai</th>
                        <th>Nguoi dung cuoi</th>
                        <th>Ma nhan vien</th>
                        <th>Thoi gian</th>
                        <th>Toa nha</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="9">No data to dislay</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </General>
        )
      }
}

export default WarningPage