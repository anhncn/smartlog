import React, { Component } from 'react'
import General from '../../General/General'
import InputNA, { NgocAnh, ConfigsAPI, BoxWrapNA, SelectFormNA, httpRequest, UserContext, TableNA, ComboboxNA, ColumnNA } from '../../ComponentCommon/Component'
import './manageBuilding.css'
/**
 * Quản lý người dùng
 * nnanh 04.04.2020
 */
class ManageBuilding extends Component {
    Token = ""
    constructor() {
        super()
        this.state = {
            placeWork: [],
            dataGrid: '',
            departement: [],
            currentPageGrid: 1,
            token: "",
        }
        this.btnSave = React.createRef()
        this.formBuilding = React.createRef()
        this.gridRef = React.createRef()
    }

    saveBuilding() {
        let me = this
        // me.formBuilding.current.props.children[0].ref.current
        if (me && me.formBuilding && me.formBuilding.current.props.children.length > 0) {
            let childrens = me.formBuilding.current.props.children
            let object = {}
            for (let i = 0; i < childrens.length; i++) {
                let child = childrens[i].ref.current;
                if (child && child.props.setField) {
                    object[child.props.setField] = child.getValue()
                }
            }
            var idContainer = me.formBuilding.current.getID()
            NgocAnh.CommonFunction.showMaskLoading(idContainer)
            httpRequest.excuteFactory(object, "building", "create").then(res => {
                alert("Thêm mới tòa nhà thành công!")
                me.getBuildingMain()
            }).catch(res => {

            }).finally(() => {
                NgocAnh.CommonFunction.hideMaskLoading(idContainer)
            })
            // httpRequest.createBuilding(object)
        }

    }

    componentDidMount() {
        let me = this;
        me.getBuildingMain();
    }

    getBuildingMain() {
        let me = this,
            idGrid = me.gridRef.current.getID()
        NgocAnh.CommonFunction.showMaskLoading(idGrid)
        httpRequest.excuteFactory({}, "building", 'get')
            .then(res => {
                this.setState({
                    dataGrid: res,
                })
                res = JSON.parse(res)
            })
            .finally(() => {
                NgocAnh.CommonFunction.hideMaskLoading(idGrid)
            })
    }

    render() {
        var me = this
        return (
            <General Title={'Quản lý tòa nhà'} className='manager-building-nnanh'>
                <div className='col-3 left-panel'>
                    <BoxWrapNA Title="Thêm tầng" ref={this.formBuilding}>
                        <InputNA textLabel="Tên toà nhà" ref={React.createRef()} setField="name" placeholder="Ví dụ: D'Capital" />
                        <InputNA textLabel="Địa chỉ" ref={React.createRef()} setField='addr' placeholder="Ví dụ: 119 Trần Duy Hưng" />
                        <InputNA textLabel="Mô tả chi tiết" ref={React.createRef()} setField='des' placeholder="Ví dụ: Hội sở chính" />
                        <InputNA typeChild="footer" hasLabel={false} value={"Thêm tòa nhà"} typeInput={'button'}
                            ref={this.btnSave} onClick={this.saveBuilding.bind(this)} />
                    </BoxWrapNA>
                </div>
                <div className='col-9 right-panel'>
                    <BoxWrapNA Title="Danh sách toà nhà hiện hành trong hệ thống" className='' ref={me.gridRef} >
                        <TableNA Height={500} NumPaging={20} ItemId='eId' data={this.state.dataGrid}>
                            <ColumnNA Width={200} text='Tòa nhà' DataIndex='bName' />
                            <ColumnNA Width={200} text='Địa chỉ' DataIndex='bAddr' />
                            <ColumnNA MinWidth={200} Flex={1} text='Mô tả' DataIndex='bDes' />
                        </TableNA>
                    </BoxWrapNA>
                </div>
            </General>
        )
    }
}

export default ManageBuilding