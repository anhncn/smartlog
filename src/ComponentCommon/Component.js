import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import md5 from 'md5'
import uuidv4 from 'uuid/dist/v4'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import './component.css'

class ConfigsAPI {
    constructor() {
        this.server = 'http://203.171.20.94:8801/'
        this.apiUri = {
            login: this.server + 'api/v1/login/',
            statistic: this.server + 'api/v1/report/locker_statistical/',
            /** bô phận phòng ban */
            department: {
                get: this.server + 'api/v1/department/get_department/',
                getPaging: {
                    uri: this.server + 'api/v1/department/get_department/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { name: '', page: 1 }
                },
                create:{
                    uri: this.server + 'api/v1/department/create_department/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { name: '' }
                },
                remove: {
                    uri: this.server + 'api/v1/department/remove_department/',
                    method: NgocAnh.Enumeration.HttpMethod.DELETE,
                    parameters: { dId: '' }
                },
            },
            locker: {
                /* danh sách khóa tủ */
                getLocker: {
                    uri: this.server + 'api/v1/locker/get_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { bId: 0, lvId: 0, imei: '', label: '', gLocker: 0, gStatus: 0, page: 1 }
                },
                /* danh sách tủ đang được sử dụng */
                getUsage: {
                    uri: this.server + 'api/v1/locker/get_usage/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { bId: 0, lvId: 0, eCode: '', imei: '', label: '', page: 1 }
                },
                getManage: {
                    uri: this.server + 'api/v1/locker/get_manage_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { bId: 0, lId: 0, imei: '', label: '' }
                },
                getLockerCanAddExistPermission: {
                    uri: this.server + 'api/v1/locker/get_restrict_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { bId: 0, lvId: 0, imei: '', eCode: '', label: '', gStatus: 0, page: 1, }
                },
                create: {
                    uri: this.server + 'api/v1/locker/create_layout/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { lId: 0, lNum: 0, lCol: 0, lRow: 0, lPage: 0, label: '', imei: '' }
                },
                openExistLocker: {
                    uri: this.server + 'api/v1/locker/open_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { lId: 0 }
                },
                freeSessionOccupiedLocker: {
                    uri: this.server + 'api/v1/locker/free_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { lId: 0 }
                },
                freeLockerExistController: {
                    uri: this.server + 'api/v1/locker/free_all_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { imei: '' }
                },
                disabledExistLocker: {
                    uri: this.server + 'api/v1/locker/disable_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { lId: 0 }
                },
                enabledDisablingLocker: {
                    uri: this.server + 'api/v1/locker/enable_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { lId: 0 }
                },
                reportLockerHealth: {
                    uri: this.server + 'api/v1/locker/error_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { lId: 0 }
                },
                confirmOpenLocker: {
                    uri: this.server + 'api/v1/locker/confirm_open_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { lId: 0 }
                },
                remove: {
                    uri: this.server + 'api/v1/locker/remove_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.DELETE,
                    parameters: { lId: 0 },
                },
            },
            building: {
                get: {
                    uri: this.server + 'api/v1/building/get_building/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { name: '', addr: '', bId: 0, page: 0 }
                },
                create: {
                    uri: this.server + 'api/v1/building/create_building/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { name: '', addr: '', des: '' }
                },
                edit: {
                    uri: this.server + 'api/v1/building/modify_building/',
                    method: NgocAnh.Enumeration.HttpMethod.PUT,
                    parameters: { bId: 0, name: '', addr: '', des: '' }
                },
            },
            level: {
                get: {
                    uri: this.server + 'api/v1/level/get_level/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { bId: 0, page: 1 }
                },
                create: {
                    uri: this.server + 'api/v1/level/create_level/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { bId: 0, lLv: 0, des: '' }
                },
                edit: {
                    uri: this.server + 'api/v1/level/modify_level/',
                    method: NgocAnh.Enumeration.HttpMethod.PUT,
                    parameters: { bId: 0, lId: 0, lLv: 0, des: '', },
                },
                delete: {
                    uri: this.server + 'api/v1/level/remove_level/',
                    method: NgocAnh.Enumeration.HttpMethod.DELETE,
                    parameters: { lId: 0 },
                },
            },
            controller: {
                get: {
                    uri: this.server + 'api/v1/controller/get_controller/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { lId: 0, bId: 0, imei: '', mac: '', zone: '', page: 1 }
                },
                getExport: {
                    uri: this.server + 'api/v1/report/export_controller/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { lId: 0, bId: 0, imei: '', mac: '', zone: '', page: 1 }
                },
                create: {
                    uri: this.server + 'api/v1/controller/create_controller/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { bId: 0, lId: 0, imei: '', mac: 0, zone: '', des: '' }
                },
                edit: {
                    uri: this.server + 'api/v1/controller/modify_controller/',
                    method: NgocAnh.Enumeration.HttpMethod.PUT,
                    parameters: { cId: 0, bId: 0, lId: 0, imei: '', mac: '', zone: '', des: '' }
                },
                remove: {
                    uri: this.server + 'api/v1/controller/remove_controller/',
                    method: NgocAnh.Enumeration.HttpMethod.DELETE,
                    parameters: { cId: 0 }
                }
            },
            user: {
                get: {
                    uri: this.server + 'api/v1/employee/get_employee/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { name: '', dId: 0, code: '', email: '', tag: '', isTag: 0, isPin: 0, isGroup: 0, page: 1 },
                },
                getLockerCanUse: {
                    uri: this.server + 'api/v1/employee/get_usage/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { eName: '', eCode: '', label: '', dId: 0, bId: 0, page: 1 },
                },
                getExport: {
                    uri: this.server + 'api/v1/report/export_user/',
                    method: NgocAnh.Enumeration.HttpMethod.GET,
                    parameters: { name: '', dId: 0, code: '', email: '', tag: '', isTag: 0, isPin: 0, isGroup: 0 },
                },
                create: {
                    uri: this.server + 'api/v1/employee/create_employee/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { name: '', code: '', email: '', dId: 0, tag: '', pin: false }
                },
                sendPinCode: {
                    uri: this.server + 'api/v1/employee/send_pin/',
                    method: NgocAnh.Enumeration.HttpMethod.POST,
                    parameters: { eId: 0 },
                },
                edit: {
                    uri: this.server + 'api/v1/employee/modify_employee/',
                    method: NgocAnh.Enumeration.HttpMethod.PUT,
                    parameters: { 'eId': 0, 'name': '', 'email': '', 'dId': 0, }
                },
                remove: {
                    uri: this.server + 'api/v1/employee/remove_employee/',
                    method: NgocAnh.Enumeration.HttpMethod.DELETE,
                    parameters: { eId: 0 },
                },
                removePinCode: {
                    uri: this.server + 'api/v1/employee/unmap_pin/',
                    method: NgocAnh.Enumeration.HttpMethod.DELETE,
                    parameters: { eId: 0 },
                },
                removeRFIDTag: {
                    uri: this.server + 'api/v1/employee/unmap_tag/',
                    method: NgocAnh.Enumeration.HttpMethod.DELETE,
                    parameters: { eId: 0 },
                },
                removePermissionUseLocker: {
                    uri: this.server + 'api/v1/employee/unmap_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.DELETE,
                    parameters: { eCode: 0, lId: 0, all: false, },
                },
                createPINCode: {
                    uri: this.server + 'api/v1/employee/map_pin/',
                    method: NgocAnh.Enumeration.HttpMethod.PATCH,
                    parameters: { eId: 0, },
                },
                setPermissionUseLocker: {
                    uri: this.server + 'api/v2/employee/map_new_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.PATCH,
                    parameters: { listEmp: [], listLk: [], reuse: false, },
                },
                addLockerExistPermission: {
                    uri: this.server + 'api/v1/employee/map_existed_locker/',
                    method: NgocAnh.Enumeration.HttpMethod.PATCH,
                    parameters: { eCode: 0, listLk: [], reuse: false, },
                },
            },
        }
    }

    createURL({ url = this.apiUri.user.get.uri, objectParams }) {
        let parameters = '?'
        for (var key in objectParams) {
            let valKey = objectParams[key]
            if (valKey === '' || valKey === null || valKey === undefined) {
                valKey = '&'
            }
            else {
                valKey = '=' + valKey + '&'
            }
            parameters += key + valKey
        }
        let path = url + parameters
        return path
    }
}

/**
 * đối tượng lấy dữ liệu trả dữ liệu dạng stringify khi respone thành công
 * văng error khi gặp catch
 * nnanh 15.03.2020
 */
var httpRequest = {
    get({ method, data, url, async = true, token = "" }) {
        return new Promise((resolve, reject) => {
            try {
                let xhttp = new XMLHttpRequest(),
                    crfs_token = NgocAnh.CommonFunction.getCrfsToken()
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        resolve(this.response)
                    }
                    //this.status === 404 || this.status === 500 || this.status === 400
                    if ([404, 500, 400].includes(this.status) && this.readyState === 4) {
                        reject(this)
                    }
                    if (this.status === 401) {
                        localStorage.removeItem(NgocAnh.Enumeration.Token.LocalStorageName)
                        reject(this)
                    }
                }
                if (method === NgocAnh.Enumeration.HttpMethod.GET) {
                    url += 'token=' + crfs_token
                }
                else {
                    data.token = crfs_token

                }
                if (token === "") {
                    let tokenEl = document.getElementById("tokenNgocAnh")
                    if (tokenEl && tokenEl.getAttribute("token")) {
                        token = tokenEl.getAttribute("token")
                    } else {
                        const tokenName = NgocAnh.Enumeration.Token.LocalStorageName
                        token = localStorage.getItem(tokenName)
                    }
                }
                xhttp.open(method, url, async)
                xhttp.setRequestHeader('Access-Control-Allow-Origin', '*')
                xhttp.setRequestHeader('Content-type', "application/json")
                xhttp.setRequestHeader('Authorization', 'Bearer ' + token)
                // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                xhttp.send(JSON.stringify(data));
            }
            catch (e) {
                reject('Error')
            }
        })
    },

    /**
     * lấy token đăng nhập để thao tác dữ liệu
     * @param {object} data 
     * data là object có 'username' 'password'
     */
    getToken(data = { username: NgocAnh.Account.UserName, password: NgocAnh.Account.Password }) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(), url = configsAPI.apiUri.login
            let configs = {
                method: NgocAnh.Enumeration.HttpMethod.POST,
                url: configsAPI.createURL({ url: url }),
                data: data,
            }
            httpRequest.get(configs)
                .then(res => {
                    const token = JSON.parse(res).token
                    resolve(token)
                })
                .catch(res => {
                    reject(res)
                })
        })
    },

    /**
     * Lấy danh sách thông tin nhân viên
     * @param {*} employee 
     */
    getEmployee(employee) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(), inForPrimitive = configsAPI.apiUri.user.get
            let employeePrimitive = NgocAnh.CommonFunction.Clone(inForPrimitive.parameters), configs
            employeePrimitive = { ...employeePrimitive, ...employee }
            configs = {
                method: inForPrimitive.method,
                url: configsAPI.createURL({ objectParams: employeePrimitive })
            }
            httpRequest.get(configs)
                .then(res => {
                    resolve(res)
                })
                .catch(res => {
                    reject(res)
                })
        })
    },

    getEmployeeLockCanUse(object = {}) {
        const me = this, configsAPI = new ConfigsAPI(),
            inforPrimitive = configsAPI.apiUri.user.getLockerCanUse
        return me.excuteObject(object, inforPrimitive)
    },

    /**
     * Tạo mới một nhân viên
     * @param {object} employee 
     */
    saveEmployee(employee) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(), inForPrimitive = configsAPI.apiUri.user.create
            let employeePrimitive = NgocAnh.CommonFunction.Clone(inForPrimitive.parameters), configs
            employeePrimitive = { ...employeePrimitive, ...employee }
            configs = {
                method: inForPrimitive.method,
                data: employeePrimitive,
                url: inForPrimitive.uri
            }
            httpRequest.get(configs)
                .then(res => {
                    debugger
                })
                .catch(res => {
                    debugger
                })
        })
    },

    updateEmployee(employee) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(), inForPrimitive = configsAPI.apiUri.user.edit
            let employeePrimitive = NgocAnh.CommonFunction.Clone(inForPrimitive.parameters), configs
            employeePrimitive = { ...employeePrimitive, ...employee }
            configs = {
                method: inForPrimitive.method,
                data: employeePrimitive,
                url: inForPrimitive.uri
            }
            httpRequest.get(configs)
                .then(res => {
                    debugger
                })
                .catch(res => {
                    debugger
                })
        })
    },

    deleteEmployee(eId) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(), inForPrimitive = configsAPI.apiUri.user.remove,
                configs = {
                    method: inForPrimitive.method,
                    data: {
                        'eId': eId
                    },
                    url: inForPrimitive.uri
                }
            httpRequest.get(configs)
                .then(res => {
                    resolve(res)
                })
                .catch(res => {
                    reject(res)
                })
        })
    },

    getDepartement(department) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI()
            let configs = {
                method: NgocAnh.Enumeration.HttpMethod.GET,
                url: configsAPI.createURL({ url: configsAPI.apiUri.department.get, objectParams: department })
            }
            httpRequest.get(configs)
                .then(res => {
                    resolve(res)
                })
                .catch(res => {
                    reject(res)
                })
        })
    },

    getAllDepartement() {
        let me = this, departments = []
        return new Promise((resolve, reject) => {
            me.getDepartement({ page: 1 }).then(res => {
                let totalPage = JSON.parse(res).totalPage, listPromise = []
                departments = departments.concat(JSON.parse(res).items)
                for (let i = 2; i <= totalPage; i++) {
                    listPromise[i - 2] = me.getDepartement({ page: i })
                }
                Promise.all(listPromise).then(ress => {
                    for (let i = 0; i < ress.length; i++) {
                        departments = departments.concat(JSON.parse(ress[i]).items)
                    }
                    resolve(departments)
                })
            }).catch(res => {
                reject(departments)
            })
        })
    },

    getBuilding(building = {}) {
        const me = this, configsAPI = new ConfigsAPI(),
            inforPrimitive = configsAPI.apiUri.building.get
        return me.excuteObject(building, inforPrimitive)
    },

    createBuilding(building) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(),
                inforPrimitive = configsAPI.apiUri.building.create
            return this.excuteObject(building, inforPrimitive)
        })
    },

    editBuilding(object) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(),
                inforPrimitive = configsAPI.apiUri.building.edit
            return this.excuteObject(object, inforPrimitive)
        })
    },

    getLevel(object) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(),
                inforPrimitive = configsAPI.apiUri.level.get
            return this.excuteObject(object, inforPrimitive)
        })
    },

    createLevel(object) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(),
                inforPrimitive = configsAPI.apiUri.level.create
            return this.excuteObject(object, inforPrimitive)
        })
    },

    editLevel(object) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI(),
                inforPrimitive = configsAPI.apiUri.level.edit
            return this.excuteObject(object, inforPrimitive)
        })
    },


    getLocker(locker) {
        const me = this, configsAPI = new ConfigsAPI(),
            inforPrimitive = configsAPI.apiUri.locker.getLocker
        return me.excuteObject(locker, inforPrimitive)
    },

    getLockerUsage(object = {}) {
        const me = this, configsAPI = new ConfigsAPI(),
            inforPrimitive = configsAPI.apiUri.locker.getUsage
        return me.excuteObject(object, inforPrimitive)
    },

    getLockerManage(object = {}) {
        const me = this, configsAPI = new ConfigsAPI(),
            inforPrimitive = configsAPI.apiUri.locker.getManage
        return me.excuteObject(object, inforPrimitive)
    },

    /**
     * nnanh 05.02.2020
     * tạo 1 nhà máy sản xuất ra request với đầu vào là
     * @param {object} object 
     * object cần gửi xuống controller
     * @param {string} objectName 
     * tên đối tượng tham chiếu
     * @param {string} objectMethod 
     * tên phương thức và thông số mặc định mà request call
     */
    excuteFactory(object, objectName = 'user', objectMethod = 'get') {
        return new Promise((resolve, reject) => {
            try {
                const configsAPI = new ConfigsAPI(),
                    inforPrimitive = configsAPI.apiUri[objectName][objectMethod]
                if (!inforPrimitive) {
                    alert("Sai tên trong excuteFactory rồi!")
                    return
                }
                this.excuteObject(object, inforPrimitive).
                    then(res => {
                        resolve(res)
                    }).catch(res => {
                        reject(res)
                    })
            } catch (error) {
                alert("Sai tên trong excuteFactory rồi!")
            }
        })
    },

    /**
     * nnanh
     * call api với object do dev lấy,
     * infor là thông tin mặc định trong api document
     */
    excuteObject(object, inforPrimitive) {
        return new Promise((resolve, reject) => {
            const configsAPI = new ConfigsAPI()
            let objectPremitive = NgocAnh.CommonFunction.Clone(inforPrimitive.parameters), configs
            let keysObjectPremitive = Object.keys(objectPremitive)
            for (let i = 0; i < keysObjectPremitive.length; i++) {
                let key = keysObjectPremitive[i]
                if (!object[key]) {
                    object[key] = objectPremitive[key]
                }
            }
            objectPremitive = { ...objectPremitive, ...object }
            if (inforPrimitive.method === NgocAnh.Enumeration.HttpMethod.GET) {
                configs = {
                    method: inforPrimitive.method,
                    url: configsAPI.createURL({ url: inforPrimitive.uri, objectParams: objectPremitive })
                }
            }
            else {
                configs = {
                    method: inforPrimitive.method,
                    data: objectPremitive,
                    url: inforPrimitive.uri
                }
            }
            httpRequest.get(configs)
                .then(res => {
                    resolve(res)
                })
                .catch(res => {
                    reject(res)
                })
        })
    },

}

var NgocAnh = {
    Enumeration: {
        KeyCode: {
            ArrowUp: 38,
            ArrowDown: 40,
            Enter: 13,
            KeyTab: 9,
        },
        HttpMethod: {
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE',
            PATCH: 'PATCH',
        },
        Token: {
            LocalStorageName: 'token_ngocanh',
        },
        Overay: {
            ID: 'overlayCutom',
        },
        PopupOptionLocker: {
            ID: 'popupOptionLocker',
        },
        EntityState: {
            Add: 1,
            Update: 2,
            Delete: 3,
        },
        OptionPopup: {
            Edit: 1,
            OpenLocker: 2,
            FreeLocker: 3,
            ConfirmOpenRightNow: 4,
            DisabledLocker: 5,
            ActiveLocker: 6,
            ReportErrorLocker: 7,
            StopReportErrorLocker: 8,
        },
        StatusClassify: [
            { gStatus: 0, gStatusName: "Chưa được phân nhóm" },
            { gStatus: 1, gStatusName: "Đã được phân nhóm" },
        ],
    },

    Account: {
        UserName: 'toannm01',
        Password: 'admin'
    },

    CommonFunction: {
        Clone: function (sourceObject) {
            return Object.assign({}, sourceObject)
        },

        getCrfsToken: function () {
            let time = new Date(), hourUTC = time.getUTCHours(), minutesUTC = time.getUTCMinutes(),
                hoursTime = hourUTC < 10 ? '0' + hourUTC : hourUTC,
                minutesTime = minutesUTC < 10 ? '0' + minutesUTC : minutesUTC
            time = hoursTime + ':' + minutesTime
            return md5(NgocAnh.Account.UserName + time)
        },

        getCrfsTokenLocalTime: function () {
            let time = new Date(), hourUTC = time.getHours(), minutesUTC = time.getMinutes(),
                hoursTime = hourUTC < 10 ? '0' + hourUTC : hourUTC,
                minutesTime = minutesUTC < 10 ? '0' + minutesUTC : minutesUTC
            time = hoursTime + ':' + minutesTime
            return md5(NgocAnh.Account.UserName + time)
        },

        showMaskLoading: function (id) {
            var container = document.getElementById(id)
            if (!container) {
                return;
            }
            if (container.style.position === "") {
                container.style.position = "relative"
            }
            container.insertAdjacentHTML('beforeend', "<div class='wrap-loader'><div class='loader'></div></div>");
        },

        hideMaskLoading: function (id) {
            var container = document.getElementById(id);
            container = container.querySelector('.wrap-loader');
            if (!container) {
                return;
            }
            container.remove();

            // NgocAnh.CommonFunction.showMaskLoading(idContainer)
            // NgocAnh.CommonFunction.hideMaskLoading(idContainer)
        },

        showOverlay: function () {
            var overlay = document.querySelector('#' + NgocAnh.Enumeration.Overay.ID)
            if (overlay) {
                overlay.style.display = 'block'
            }
        },

        hideOverlay: function () {
            var overlay = document.querySelector('#' + NgocAnh.Enumeration.Overay.ID)
            if (overlay) {
                overlay.style.display = 'none';
            }
        },

        matchPropertiesOfListObject(records, enumerations, propMatch, propNew) {
            if (!records || records.length === 0) {
                return
            }
            for (let i = 0; i < records.length; i++) {
                let record = records[i]
                const objectMatch = enumerations.filter(item => item[propMatch] == record[propMatch])
                if (objectMatch && objectMatch.length === 1) {
                    record[propNew] = objectMatch[0][propNew]
                } else {
                    record[propNew] = ""
                }
            }
        },
    }
}
/**
 * component cho form gồm thẻ input và label của thẻ
 * nnanh 13.03.2020
 */
class InputNA extends Component {
    constructor() {
        super()

        this.inputRef = React.createRef()
    }
    /**
     * textLabel nội dung của label
     * ID id của input để label for được
     * kiểm tra có label thì trả về label
     * hasLabel == false thì không hiển thị label
     */
    getElementLabel(id, hasLabel = true, contentLabel) {
        if (!hasLabel) {
            return
        }
        if (contentLabel) {
            return <div className="label-element">
                <label htmlFor={id} >{contentLabel}</label>
            </div>
        }
        return <div className="label-element">
            <label htmlFor={id} >&nbsp;</label>
        </div>
    }

    onClick() {
        let me = this
        if (me.props.onClick && typeof (me.props.onClick) == 'function') {
            me.props.onClick(me, me.props.data)
        }
    }

    getValue() {
        return this.inputRef.current.querySelector('.input-element input').value
    }

    setValue(val) {
        this.inputRef.current.querySelector('.input-element input').value = val
    }
    /**
     * className custom form
     * ID id của input để label for được
     * type kiểu dữ liệu, value dữ liệu của input
     */
    render() {
        let me = this, id = me.props.ID, value = me.props.value,
            classList = `${me.props.className || ''} form-inputna`,
            placeholder = me.props.placeholder, typeInput = me.props.typeInput,
            label = me.getElementLabel(id, me.props.hasLabel, me.props.textLabel)
        if (me.props.setField && me.props.data && JSON.parse(me.props.data)) {
            value = JSON.parse(me.props.data)[me.props.setField]
        }
        return (
            <div className={classList} ref={me.inputRef}>
                {label}
                <div className="input-element">
                    {me.props.isDisabled == true ? <input id={id} disabled type={typeInput} value={value} placeholder={placeholder} onClick={me.props.onClick} ></input> :
                        <input id={id} type={typeInput} value={value} placeholder={placeholder} onClick={me.onClick.bind(me)} ></input>}
                </div>
            </div>
        )
    }
}
/**
 * component cho form gồm thẻ select và label của thẻ
 * nnanh 13.03.2020
 */
class SelectFormNA extends Component {
    constructor() {
        super()
        this.state = {
            isRenderOption: false,
        }
    }
    /**
     * Đổ option vào từ props data dạng stringify
     */
    getOption() {
        try {
            let options = [], records = JSON.parse(this.props.data)
            if (records && records.length > 0) {
                for (let i = 0; i < records.length; i++) {
                    let record = records[i]
                    options.push(<option key={record.value} value={record.value}>{record.display}</option>)
                }
                return this.state.isRenderOption ? options : []
            }
            return []
        }
        catch (e) {
            return []
        }
    }
    /**
     * textLabel nội dung của label
     * ID id của input để label for được
     * kiểm tra có label thì trả về label
     * hasLabel == false thì không hiển thị label
     */
    getElementLabel(hasLabel = true, contentLabel) {
        return !hasLabel ||
            <div className="label-element">
                <label>{contentLabel}</label>
            </div>
    }
    componentDidMount() {
        let me = this
        me.setState({
            isRenderOption: true,
        });
        console.log('mouth select')
    }
    /**
     * className custom form
     * ID id của input để label for được
     * type kiểu dữ liệu, value dữ liệu của input
     */
    render() {
        let me = this,
            selection = me.getOption(),
            classList = `${this.props.className || ''} select-wrap-na`,
            label = me.getElementLabel(this.props.hasLabel, this.props.textLabel)
        return (
            <div className={classList}>
                {label}
                <div className="input-element">
                    <select ref={'selectionRef'} className='select-element'>
                        {selection}
                    </select>

                </div>
            </div>
        )
    }
}
/**
 * component cho box gồm title box
 * nội dung box và footer
 * nnanh 13.03.2020
 */
class BoxWrapNA extends Component {
    constructor() {
        super()
        this.onClickBox = this.onClickBox.bind(this)
        this.state = {
            id: uuidv4()
        }
    }
    onClickBox() {
        this.refs.boxBody.classList.toggle('toggle-box')
        this.refs.boxFooter.classList.toggle('toggle-box')
    }
    getChildren(children = []) {
        let body = [], footer = [], header = []
        children = [].concat(children)
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            switch (child.props.typeChild) {
                case 'body':
                    body.push(child)
                    break
                case 'header':
                    header.push(child)
                    break
                case 'footer':
                    footer.push(child)
                    break
                default:
                    body.push(child)
                    break
            }
        }
        return [header, body, footer]
    }
    getID() {
        return this.state.id
    }
    componentDidMount() {
        console.log('mouth BoxWrapNA')
    }
    /**
     * Title của box
     * Sự kiện click vào box
     */
    render() {
        let children = this.props.children,
            classList = `${this.props.className || ''} box-wrap`,
            [childHeader, childrenBody, childrenFooter] = this.getChildren(children)
        return (
            <div className={classList} id={this.state.id}>
                <div className="box-header">
                    <div className='head-box-header'>
                        {this.props.Title && <div className="title-box">{this.props.Title || 'Title props'}</div>}
                        <div className="box-tool">
                            <button onClick={this.onClickBox} className="btn btn-box-tool">
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>

                    </div>
                    <div className='content-header'>
                        {childHeader}
                    </div>
                </div>
                <div ref='boxBody' className='box-body'>
                    {childrenBody}
                </div>
                <div ref='boxFooter' className='box-footer'>
                    {childrenFooter}
                </div>
            </div>
        )
    }
}

/**
 * Hỗ trợ tìm kiếm theo data text,
 * Làm mượt các hiệu ứng tìm kiếm
 * Many Feature
 */
class ComboboxNA extends Component {
    constructor() {
        super()
        this.inputRef = React.createRef()
        this.ulRefs = React.createRef()
        this.bodyInputRef = React.createRef()

        this.keyDownSelectLi = this.keyDownSelectLi.bind(this)
        this.inputTextSearch = this.inputTextSearch.bind(this)
        this.mousedownDocument = this.mousedownDocument.bind(this)
        this.onClickSetValueInput = this.onClickSetValueInput.bind(this)
        this.onClickToggleBoundingList = this.onClickToggleBoundingList.bind(this)
    }
    // lấy dữ liệu từ prop dạng json
    getData() {
        let me = this, data = []
        try {
            return JSON.parse(me.props.data)
        }
        catch (e) {
            return data
        }
    }
    setData() {
        this.data = this.getData()
    }
    data = [
        { value: 1, display: 'Hà Nội' }
    ]
    // render danh sách combobox 
    renderCombobox(records, isShow = false) {
        let me = this, liElements = [], element,
            container = me.createContainerCombobox(),
            displayField = this.props.DisplayField || '',
            valueField = this.props.ValueField || ''
        for (let index = 0; index < records.length; index++) {
            let rec = records[index],
                text = rec[displayField],
                recordid = rec[valueField],
                recordindex = index,
                onClick = me.onClickSetValueInput,
                liElement = <li role='option' aria-selected={true} unselectable='on'
                    tabIndex='-1' data-recordindex={recordindex} record-data={JSON.stringify(rec)}
                    data-recordid={recordid} className='x-boundlist-item'
                    data-boundview={`${this.props.ID}-picker`}
                    onClick={onClick} key={recordindex}>{text}</li>
            if (recordid === undefined || recordid === null || recordid === '' || displayField === undefined || displayField === null) {
                continue
            }
            else {
                liElements.push(liElement)
            }
        }
        element = <div className="bound-list">
            <div className="picker-listWrap" >
                <ul ref={me.ulRefs} data-selectid={-1}>
                    {liElements}
                </ul>
            </div>
        </div>
        ReactDOM.render(element, container)
        isShow ? me.openBoundingList() : me.closeBoundingList()
        // trông có vẻ thừa nhưng trang web đang tính sai, chỉ tính đúng ở lần thứ 2 
        // cần thêm 1 lần tính âm thầm trước đó ở đây
        me.caculatePositionContainerCombobox()
    }
    // tạo một thùng chứa combobox
    createContainerCombobox() {
        let me = this
        if (!me.getContainerCombobox()) {
            let container = document.createElement('DIV')
            container.className = 'avenger mighty'
            container.style.width = this.bodyInputRef.current.getBoundingClientRect().width + 'px'
            container.setAttribute('data-componentid', this.props.ID)
            document.querySelector('body').appendChild(container)
        }
        else {
            me.getContainerCombobox().style.width = me.bodyInputRef.current.getBoundingClientRect().width + 'px'
        }
        return me.getContainerCombobox()
    }
    // lấy ra thùng chứa combobox
    getContainerCombobox() {
        return document.querySelector(`[data-componentid=${this.props.ID}]`)
    }
    // bật tắt danh sách combobox
    // xóa bỏ các class sinh ra khi sử dụng phím tắt trên li
    onClickToggleBoundingList() {
        let me = this, placeData = me.getContainerCombobox(),
            dataElement = placeData
        dataElement.classList.toggle('hidden-bound-list')
        if (!dataElement.classList.contains('hidden-bound-list')) {
            me.ulRefs.current.querySelectorAll('li').forEach(item => {
                item.classList.remove('active-movement')
            })
            let liActive = me.ulRefs.current.querySelector('li.active')
            if (liActive) {
                me.ulRefs.current.dataset.selectid = liActive.dataset.recordindex
            } else {
                me.ulRefs.current.dataset.selectid = -1
            }
        }
        me.inputRef.current.focus()
        me.caculatePositionContainerCombobox()
    }
    // đóng combobox
    closeBoundingList() {
        let me = this, placeData = me.getContainerCombobox()
        placeData.classList.add('hidden-bound-list')
    }
    // mở combobox
    openBoundingList() {
        let me = this, placeData = me.getContainerCombobox()
        placeData.classList.remove('hidden-bound-list')
        me.caculatePositionContainerCombobox()
    }
    // tính toán vị trí hiện cho combobox theo input
    caculatePositionContainerCombobox() {
        let me = this, placeData = me.getContainerCombobox(),
            bodyInput = me.bodyInputRef.current,
            boundBodyInput = bodyInput.getBoundingClientRect()
        /**fix bug ko hiện thi đúng khi bi scrool nnanh */
        placeData.style.top = boundBodyInput.top + boundBodyInput.height + document.documentElement.scrollTop + 'px'
        placeData.style.left = boundBodyInput.left + 'px'
    }
    onChangeValueCombobox(record) {
        let me = this;
        if (me.props.onChange && typeof (me.props.onChange) == 'function') {
            me.props.onChange(me, record)
        }
    }

    // đặt giá trị cho input khi click vào li
    onClickSetValueInput(element) {
        let me = this, dataRecord = {
            value: element.target.dataset.recordid,
            text: element.target.textContent,
            index: element.target.dataset.recordindex,
        }, recordOrigin = element.currentTarget.getAttribute('record-data')
        if (me.inputRef.current.value != dataRecord.text) {
            me.onChangeValueCombobox(dataRecord)
        }
        me.inputRef.current['data-record'] = JSON.stringify(dataRecord)
        me.inputRef.current['record-origin'] = recordOrigin
        me.inputRef.current.value = dataRecord.text

        // Thêm active cho phần tử được chọn
        me.ulRefs.current.querySelectorAll('li').forEach(item => { item.classList.remove('active') })
        element.target.classList.add('active')
        me.ulRefs.current.dataset.selectid = element.target.dataset.recordindex
        me.onClickToggleBoundingList()
    }

    getRecordOrigin() {
        let rec = this.inputRef.current['record-origin']
        if (rec) {
            return JSON.parse(rec)
        }
        else {
            return null
        }
    }

    getRecordsSelected() {
        let rec = this.inputRef.current['data-record']
        if (rec) {
            return JSON.parse(rec)
        }
        else {
            return null
        }
    }

    getValue() {
        return this.getRecordsSelected() ? this.getRecordsSelected().value : null
    }
    // sự kiện khi bấm trên input
    // lọc các giá trị xuất hiện trong combobox
    inputTextSearch(e) {
        const me = this,
            content = e.target.value.toLowerCase(),
            displayField = me.props.DisplayField,
            data = me.data.filter(item => { return item[displayField].toLowerCase().includes(content) })
        me.renderCombobox(data, true)
    }
    // nếu combobox ẩn và bấm nút xuống thì hiện
    // nếu combobox hiện thì todo
    keyDownSelectLi(e) {
        let me = this, idCurrent = 0, idNext = 0,
            allSelector = me.ulRefs.current.querySelectorAll('li'),
            lengthSelector = allSelector.length
        if (me.isVisblePlaceData()) {
            if (e.which === NgocAnh.Enumeration.KeyCode.ArrowDown || e.keyCode === NgocAnh.Enumeration.KeyCode.ArrowDown) {
                idCurrent = parseInt(me.ulRefs.current.dataset.selectid)
                idNext = idCurrent + 1
                if (idCurrent === lengthSelector - 1) {
                    idNext = 0
                }
                me.ulRefs.current.dataset.selectid = idNext
                if (idCurrent > - 1 && idCurrent < lengthSelector) {
                    allSelector[idCurrent].classList.remove('active-movement')
                }
                if (idNext > - 1 && idNext < lengthSelector) {
                    allSelector[idNext].classList.add('active-movement')
                }
                me.setScrollTopCombobox(false)
            }
            if (e.which === NgocAnh.Enumeration.KeyCode.ArrowUp || e.keyCode === NgocAnh.Enumeration.KeyCode.ArrowUp) {
                idCurrent = parseInt(me.ulRefs.current.dataset.selectid)
                idNext = idCurrent - 1
                if (idCurrent === 0) {
                    idNext = lengthSelector - 1
                }
                if (idCurrent === -1) {
                    idNext = 0
                }
                me.ulRefs.current.dataset.selectid = idNext
                if (idCurrent > - 1 && idCurrent < lengthSelector) {
                    allSelector[idCurrent].classList.remove('active-movement')
                }
                if (idNext > - 1 && idNext < lengthSelector) {
                    allSelector[idNext].classList.add('active-movement')
                }
                me.setScrollTopCombobox(true)
            }
            if (e.which === NgocAnh.Enumeration.KeyCode.Enter || e.keyCode === NgocAnh.Enumeration.KeyCode.Enter) {
                idCurrent = parseInt(me.ulRefs.current.dataset.selectid)
                if (idCurrent > - 1 && idCurrent < lengthSelector) {
                    allSelector[idCurrent].click()
                }
            }
            if (e.which === NgocAnh.Enumeration.KeyCode.KeyTab || e.keyCode === NgocAnh.Enumeration.KeyCode.KeyTab) {
                me.closeAllCombobox()
            }
        }
        else {
            if (e.which === NgocAnh.Enumeration.KeyCode.ArrowDown || e.keyCode === NgocAnh.Enumeration.KeyCode.ArrowDown) {
                this.openBoundingList()
            }
        }

    }
    /**
     * tính toán lại vị trí của scroll trong combobox
     * @param {boolean} isUp 
     * sự kiện bấm lên hay xuống trong combobox
     */
    setScrollTopCombobox(isUp) {
        let me = this, container = me.getContainerCombobox(),
            offsetTopELement = container.querySelector('.active-movement').offsetTop,
            heightCombobox = container.getBoundingClientRect().height,
            heightElement = container.querySelector('ul li').getBoundingClientRect().height
        if (isUp) {
            if (offsetTopELement < container.scrollTop) {
                container.scrollTop = offsetTopELement
            }
            else if (offsetTopELement >= container.querySelector('.bound-list').getBoundingClientRect().height - 2 * heightElement) {
                container.scrollTop = offsetTopELement - heightCombobox + heightElement
            }
        }
        else {
            if (offsetTopELement + heightElement > container.scrollTop + heightCombobox) {
                container.scrollTop = offsetTopELement - heightCombobox + heightElement
            }
            else if (offsetTopELement === 0) {
                container.scrollTop = offsetTopELement
            }
        }

    }
    // bấm chuột xuống ở màn hình
    // nếu bấm ra màn hình thì đóng combobox
    // updated thực thi tính toán cả những combobox khác
    mousedownDocument(e) {
        let me = this, idElement = e.target.getAttribute('id') || '',
            databound = e.target.getAttribute('data-boundview') || '',
            componentid = e.target.getAttribute('data-componentid') || '',
            listIdProps = me.getAllIdCombobox(),
            comboboxNotClose = []
        if (listIdProps.filter(item => { return databound.includes(item) || idElement.includes(item) || componentid.includes(item) }).length === 0) {
            me.closeAllCombobox()
            return
        }
        listIdProps.forEach((item, index) => {
            if (databound.includes(item + '-') || idElement.includes(item + '-') || componentid === item) {
                comboboxNotClose.push(item)
            }
        })
        me.closeAllCombobox(comboboxNotClose)
    }
    getAllIdCombobox() {
        let ids = []
        document.querySelectorAll('[data-componentid]').forEach(item => {
            ids.push(item.getAttribute('data-componentid'))
        })
        return ids
    }
    closeAllCombobox(listNotClose = []) {
        document.querySelectorAll('[data-componentid]').forEach(item => {
            let idItem = item.getAttribute('data-componentid')
            if (!listNotClose.includes(idItem)) {
                item.classList.add('hidden-bound-list')
            }
        })
    }
    // kiểm tra combobox có hiện ko
    isVisblePlaceData() {
        const placeData = this.getContainerCombobox()
        if (placeData.classList.contains('hidden-bound-list')) {
            return false
        }
        return true
    }
    // rendered
    componentDidMount() {
        const me = this;
        me.setData()
        me.renderCombobox(me.data)
        document.onmousedown = me.mousedownDocument
    }

    componentDidUpdate() {
        this.setData()
        this.renderCombobox(this.data)
    }
    getElementLabel(text, id, hasLabel = true) {
        return hasLabel && <div className='label-element'>
            <label id={`${id}-labelEl`}>{text}</label>
        </div>
    }
    render() {
        const me = this, id = me.props.ID, readonly = me.props.ReadOnly || false
        let className = me.props.className || '' + ' container-combobox',
            label = me.getElementLabel(me.props.textLabel, id, me.props.hasLabel)
        return (
            <div id={`${id}_Container`} className={className} style={{ paddingBottom: '10px' }}>
                {label}
                <div id={`${id}-bodyEl`} ref={me.bodyInputRef} className="combobox-body" tabIndex='-1' onKeyDown={me.keyDownSelectLi}>
                    <div id={`${id}-triggerWrap`} className="combobox-triggerWrap">
                        <div id={`${id}-inputWrap`} className="combobox-inputWrap">
                            <input id={`${id}-inputEl`} ref={me.inputRef}
                                placeholder={me.props.placeholder} onInput={me.inputTextSearch}
                                readOnly={readonly} type="text" className="combobox" />
                        </div>
                        <div id={`${id}-trigger-picker`} className="combobox-trigger-picker fa fa-caret-down" onClick={me.onClickToggleBoundingList}></div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * Table component
 * nnanh 22.03.2020
 */
class TableNA extends Component {
    static nameComponent = 'TableNA'
    pagingPre = null
    Paging = {
        records: [],
        totalRecords: 0,
        currentPaging: 0,
        totalPaging: 0,
        numPaging: 0,
    }
    constructor() {
        super()
        this.PagingGrid = React.createRef()
        this.tableWrapAll = React.createRef()
        this.headerNormal = React.createRef()
        this.headerLocked = React.createRef()
        this.bodyTable = React.createRef()
        this.bodyNormal = React.createRef()
        this.bodyLocked = React.createRef()
        this.scrollContainer = React.createRef()
        this.scrollLock = React.createRef()
        this.scrollNormal = React.createRef()

        this.onScrollTable = this.onScrollTable.bind(this)

        this.state = {
            clsCheckboxActive: 'selected-checked',
            isRender: true,
            widthGrid: null,
            widthGridLock: null,
            numberRecordsOfPage: 20,
            currentPaging: 1,
        }
    }

    getNumberPage() {
        return this.Paging.currentPaging
    }

    getDataGrid() {
        try {
            let me = this, records = [], totalRecords = 0,
                currentPaging = me.state.currentPaging, totalPaging = 0,
                numPaging = parseInt(me.props.NumPaging) || me.state.numberRecordsOfPage

            let res = JSON.parse(me.props.data)
            totalRecords = res.total
            numPaging = res.count
            currentPaging = res.currentPage
            records = res.items || []
            totalPaging = res.totalPage
            records = me.filterDataGrid(records)
            //items count: 20 total: 2769 currentPage: 2 totalPage: 139
            me.Paging = {
                records: records,
                totalRecords: totalRecords,
                currentPaging: currentPaging,
                totalPaging: totalPaging,
                numPaging: numPaging
            }
        } catch (e) {

        }
    }

    filterDataGrid(records = []) {
        let me = this, filterObject = me.props.Filter || {}, keys = Object.keys(filterObject)
        keys.forEach(key => {
            let valKey = filterObject[key]
            if (valKey && valKey !== '') {
                records = records.filter(rec => {
                    return rec[key].includes(valKey)
                })
            }
        })
        return records
    }

    /**
     * tính toán bottom của table chứa data
     * nếu chiều ngang của cột bị overflow thì cần 8px cho scroller => bottom 8px
     * và ẩn scroll đi..cái này tự vẽ ra không phải có sẵn nên cần ẩn
     * nếu không thì bottom 0
     */
    caculateBottomBodyTable() {
        let me = this
        if (me.isOverflowHorizontal(me.headerLocked) ||
            me.isOverflowHorizontal(me.headerNormal)) {
            me.scrollContainer.current.style.display = ''
            me.bodyTable.current.style.bottom = me.scrollLock.current.getBoundingClientRect().height + 'px'
        }
        else {
            me.bodyTable.current.style.bottom = '0'
            me.scrollContainer.current.style.display = 'none'
        }
    }

    /**
     * đây là 1 scroller ảo ...
     * nó sẽ là thanh overflow ngang của table để nhìn dữ liệu
     * và nó cần có một transform có độ rộng bằng độ rộng bị overflow
     */
    setSizeScrollerTable() {
        let me = this,
            scrollWidthNormal = me.headerNormal.current.scrollWidth - 1 + 'px',
            scrollWidthLocked = me.headerLocked.current.scrollWidth - 1 + 'px'
        me.scrollNormal.current.querySelector('.scroller-spacer').
            style.transform = `translate3d(${scrollWidthNormal}, 0px, 0px)`
        me.scrollLock.current.querySelector('.scroller-spacer').
            style.transform = `translate3d(${scrollWidthLocked}, 0px, 0px)`
    }

    /**
     * tính toán lại vị trí header, body, thanh scroll ngang
     * của cột đã đóng băng và cột bình thường
     */
    setPositionHeaderBodyScrollerNormalVsLocked() {
        let me = this,
            widthLocked = me.headerLocked.current.getBoundingClientRect().width + 'px'
        me.headerNormal.current.style.left = widthLocked
        me.bodyNormal.current.style.left = widthLocked
        me.scrollContainer.current.style.setProperty('--width-scroller-lock', widthLocked)
    }

    /* ref có bị overflow ko */
    isOverflow(ref) {
        return this.isOverflowHorizontal(ref) || this.isOverflowVertical(ref)
    }

    /* ref có bị overflow dọc ko */
    isOverflowVertical(ref) {
        let element = ref.current
        return element.clientHeight < element.scrollHeight
    }

    /* ref có bị overflow ngang ko */
    isOverflowHorizontal(ref) {
        let element = ref.current
        return element.clientWidth < element.scrollWidth
    }

    /* chỉnh scroll của ref head và body theo scroll của scroller */
    onScrollTable(head, body, scroller) {
        const scrollLeft = scroller.current.scrollLeft
        body.current.scrollLeft = scrollLeft
        head.current.scrollLeft = scrollLeft
    }

    onChangeToggleAllCheckbox(e) {
        let me = this, element = e.currentTarget, clsActive = me.state.clsCheckboxActive,
            listTable = me.tableWrapAll.current.querySelectorAll(`.table-item[data-recordid]`),
            listCheckbox = me.tableWrapAll.current.querySelectorAll(`.table-cell input[type='checkbox'][data-recordid]`)
        if (element.checked) {
            listTable.forEach(item => {
                item.classList.add(clsActive)
            })

        } else {
            listTable.forEach(item => {
                item.classList.remove(clsActive)
            })
        }
        listCheckbox.forEach(item => {
            item.checked = element.checked
        })
        me.onClickCheckboxGridCustomOutSize()
    }

    onChangeValueCellGrid(e) {
        let me = this, element = e.currentTarget, id = element.dataset.recordid, clsActive = me.state.clsCheckboxActive,
            listTable = me.tableWrapAll.current.querySelectorAll(`.table-item[data-recordid='${id}']`)
        if (element.checked) {
            listTable.forEach(item => {
                item.classList.add(clsActive)
            })
        } else {
            listTable.forEach(item => {
                item.classList.remove(clsActive)
            })
        }
        me.onClickCheckboxGridCustomOutSize()
    }

    /**
     * Hàm khi click vào checkbox thò ra để cho bên ngoài sử dụng
     * nnanh 28.05.2020
     */
    onClickCheckboxGridCustomOutSize() {
        let me = this, records = me.getSelectedRecords()
        if (me && me.props && typeof (me.props.onClickCheckboxColumn) == 'function') {
            me.props.onClickCheckboxColumn(me, records)
        }
    }

    /** Lấy ra các bản ghi đã checked bằng check box */
    getSelectedRecords() {
        let me = this, clsActive = me.state.clsCheckboxActive, records = [],
            listTable = me.tableWrapAll.current.querySelectorAll(`.table-item.${clsActive}[data-recordid] .checkbox-grid`)
        listTable.forEach((cell) => {
            records.push(JSON.parse(cell.dataset.rec))
        })
        return records
    }

    /* Danh sách các cột là child */
    getColumnGrid() {
        let me = this, columns = []
        if (me.props.children) {
            columns = columns.concat(me.props.children)
            columns = columns.filter(column => column.type.nameComponent === 'ColumnNA')
        }
        return columns
    }

    /* Trả về các danh sách thông tin cột đã đóng băng và cột bình thường */
    getColumnsLockAndNormal() {
        let me = this, columns = me.getColumnGrid(), columnsLock = [], columnsNormal = []
        columnsLock = columns.filter(cloumn => { return cloumn.props.isLocked === true })
        columnsNormal = columns.filter(cloumn => { return cloumn.props.isLocked !== true })
        return [columnsLock, columnsNormal]
    }

    /* Truyền vào thông tin cột trả ra header html cột */
    getHeaderTable(columns = [], widthCloumns, isLocked = false) {
        let me = this, header = []
        if (me.props.isSelection && isLocked) {
            let style = {
                width: 50
            }
            header.push(<th style={style} className='column-header'>
                <div className='column-header-inner'>
                    <input type="checkbox" onChange={me.onChangeToggleAllCheckbox.bind(me)} />
                </div>
            </th>)
        }
        columns.forEach((column, index) => {
            let text = column.props.text,
                style = {
                    width: isLocked ? column.props.Width : widthCloumns[index]
                }
            header.push(<th style={style} key={index} className='column-header'>
                <div className='column-header-inner' title={text}>{text}</div>
            </th>)
        })
        return <table className='table-item'><tbody><tr>{header}</tr></tbody></table>
    }

    /* Truyền vào thông tin cột trả ra body html cột */
    getBodyRecordTable(columns = [], widthCloumns, isLocked = false) {
        let me = this, rowsInTable = [], { records } = me.Paging
        records.forEach((rec, i) => {
            let dataInRow = []
            if (me.props.isSelection && isLocked) {
                let style = {
                    width: 50,
                },
                    styleCenter = {
                        textAlign: 'center',
                    }
                dataInRow.push(<td className='table-cell' style={style}>
                    <div className='table-cell-inner' style={styleCenter}>
                        <input type="checkbox" className="checkbox-grid"
                            data-rec={JSON.stringify(rec)} data-recordid={i}
                            recordid={rec[me.props.ItemId]}
                            onChange={me.onChangeValueCellGrid.bind(me)} /></div></td>)
            }
            columns.forEach((column, index) => {
                let text = rec[column.props.DataIndex],
                    style = {
                        width: isLocked ? column.props.Width : widthCloumns[index]
                    }
                if (column.props.Command) {
                    let styleBtn = {
                        boxSizing: 'border-box',
                        border: 'none',
                        padding: 0,
                        backgroundColor: 'transparent',
                        cursor: 'pointer'
                    }
                    style.textAlign = "center"
                    dataInRow.push(<td key={index} className='table-cell' style={style}>
                        <div className='table-cell-inner' title={text}>
                            <button style={styleBtn} delete-row onClick={me.onClickDeleteRecord.bind(me)} data-record={JSON.stringify(rec)} recordid={rec[me.props.ItemId]}><i className="fa fa-trash"></i> </button>
                        </div></td>)
                }
                else {
                    dataInRow.push(<td key={index} className='table-cell' style={style}>
                        <div className='table-cell-inner' title={text}>{text}</div></td>)
                }
            })
            rowsInTable.push(<table key={i} className='table-item' data-recordid={i}><tbody>
                <tr className='table-row'>{dataInRow}</tr></tbody></table>)
        })
        return <div className='table-item-container'>{rowsInTable}</div>
    }

    onClickDeleteRecord(e) {
        let me = this, id = e.currentTarget.getAttribute('recordid'),
            rec = e.currentTarget.dataset.record;
        if (typeof (me.props.onClickDelete) === 'function') {
            me.props.onClickDelete(id, rec)
        }
        // alert('Đã xóa bản ghi:' + id)

    }

    /* Ném vào thông tin cột lấy ra html của header và body cột */
    getBodyAndRecordTable(columns = [], isLocked = false) {
        let me = this
        if (me.checkWidthGrid()) {
            let widthCloumns = isLocked ? [] : me.caculateWidthColumns(columns)
            return [this.getHeaderTable(columns, widthCloumns, isLocked), this.getBodyRecordTable(columns, widthCloumns, isLocked)];
        } else {
            return [[], []]
        }
    }

    /* Tính toán width cho mỗi column normal */
    caculateWidthColumns(columns) {
        let me = this, widthCloumns = [], totalFlex = 0, totalWidth = 0,
            widthGrid = me.state.widthGrid - me.state.widthGridLock
        columns.forEach(column => {
            const flex = parseInt(column.props.Flex) || 0,
                width = parseInt(column.props.Width) || 0,
                minWidth = parseInt(column.props.MinWidth) || 0
            if (minWidth === 0 && flex === 0) {
                totalWidth += width
            }
            else {
                totalFlex += flex
            }
        })
        if (totalWidth > widthGrid || totalFlex === 0) {
            totalWidth = widthGrid
            totalFlex = 1
        }
        columns.forEach((column, index) => {
            let flex = parseInt(column.props.Flex) || 0,
                width = parseInt(column.props.Width) || 0,
                minWidth = parseInt(column.props.MinWidth) || 0
            flex = (widthGrid - totalWidth) / totalFlex * flex
            if (flex !== 0 || minWidth !== 0) {
                width = Math.max(flex, minWidth)
            }
            widthCloumns[index] = width
        })
        return widthCloumns
    }

    /* Nếu width của grid chưa có hay chưa được render thì ko render */
    checkWidthGrid() {
        let width = this.state.widthGrid || 0
        if (width === 0) {
            return false
        } else {
            return true
        }
    }

    /* Cập nhật lại width grid nếu có thay đổi */
    UpdateWidthGrid() {
        const me = this, widthGridUpdate = me.tableWrapAll.current.getBoundingClientRect().width
        if (me.state.widthGrid !== widthGridUpdate) {
            let [columnsLock,] = me.getColumnsLockAndNormal(), widthColunnsLock = 0
            columnsLock.forEach(column => {
                widthColunnsLock += column.props.Width
            })
            this.setState({
                widthGrid: widthGridUpdate,
                widthGridLock: widthColunnsLock,
            })
        }
    }

    /**
     * render html cho phân trang
     */
    renderPaging() {
        const me = this,
            { totalRecords, currentPaging, totalPaging } = me.Paging,
            currentPagingText = `Trang ${currentPaging} / ${totalPaging} `
        if (me.PagingGrid.current) {
            me.PagingGrid.current.querySelector('input').value = currentPaging
        }
        return <div ref={me.PagingGrid} className='tablePaging'>
            <div className='contentPaging'>
                <div className='leftPaging'>
                    <div className='titlePaging'>Tổng số bản ghi:&nbsp;</div>
                    <div className='statTotal'>{totalRecords}</div>
                </div>
                <div className='rightPaging'>
                    <div className='inputPaging child-rightPaging'>
                        <input defaultValue={currentPaging} onKeyPress={me.onKeypressSearchPage.bind(me)} type="text" />
                    </div>
                    <div onClick={me.changeNumberPaging.bind(me, false)} className='prePaging child-rightPaging'>
                        <i className="fa fa-fw fa-chevron-left"></i>
                    </div>
                    <div className='currentPaging child-rightPaging'>{currentPagingText}</div>
                    <div onClick={me.changeNumberPaging.bind(me, true)} className='nextPaging child-rightPaging'>
                        <i className="fa fa-fw fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    }

    onKeypressSearchPage(event) {
        if (event.charCode === NgocAnh.Enumeration.KeyCode.Enter ||
            event.which === NgocAnh.Enumeration.KeyCode.Enter ||
            event.keyCode === NgocAnh.Enumeration.KeyCode.Enter) {
            let value = event.target.value,
                numberValue = parseInt(value),
                { currentPaging, totalPaging } = this.Paging
            if (!isNaN(value) && 0 < numberValue && numberValue <= totalPaging) {
                this.props.changePaging(numberValue)
            }
            else {
                event.target.value = currentPaging
            }
        }
    }

    changeNumberPaging(isIncrease = false) {
        let { currentPage, totalPaging } = this.Paging
        currentPage = this.state.currentPaging + (isIncrease ? 1 : -1)
        if (currentPage > 0 && currentPage <= totalPaging) {
            this.props.changePaging(currentPage)
        }

    }

    initEventGrid() {
        let me = this,
            allRecords = me.tableWrapAll.current.querySelectorAll('.table-item[data-recordid]')
        if (me.pagingPre && me.pagingPre.currentPaging === me.Paging.currentPaging && me.pagingPre.totalRecords === me.Paging.totalRecords) {
            return
        }
        allRecords.forEach(table => {
            let id = table.getAttribute('data-recordid'),
                listTable = me.tableWrapAll.current.querySelectorAll(`.table-item[data-recordid='${id}']`)
            function mouseEnter(e) {
                listTable.forEach(item => {
                    item.classList.add('active')
                })
            }
            table.addEventListener("mouseenter", mouseEnter)

            function mouseLeave(e) {
                listTable.forEach(item => {
                    item.classList.remove('active')
                })
            }
            table.addEventListener("mouseleave", mouseLeave)

            function clickRowGrid(e) {
                allRecords.forEach(item => {
                    item.classList.remove('selected')
                })
                listTable.forEach(item => {
                    item.classList.add('selected')
                })
                if (e.target.nodeName != 'I') {
                    me.onClickRowGrid(me.Paging.records[id])
                }
                else {
                }
            }

            table.addEventListener("click", clickRowGrid)
        })
        me.pagingPre = me.Paging
    }

    /** Chọn 1 bản ghi trên grid bằng click chứ ko phải checkbox */
    onClickRowGrid(record) {
        let me = this
        if (me.props.onClickRowGrid && typeof (me.props.onClickRowGrid) === 'function') {
            me.props.onClickRowGrid(record)
        }
    }

    SyncValueCurrentPage() {
        if (this.Paging.currentPaging !== this.state.currentPaging) {
            this.setState({
                currentPaging: this.Paging.currentPaging
            })
        }
    }

    clearGrid() {
        let me = this,
            allRecords = me.tableWrapAll.current.querySelectorAll('.table-item[data-recordid]')
        allRecords.forEach(item => {
            item.classList.remove('selected')
        })
    }
    componentDidMount() {
        let me = this
        me.UpdateWidthGrid()
        me.setSizeScrollerTable()
        me.caculateBottomBodyTable()
        me.setPositionHeaderBodyScrollerNormalVsLocked()
        me.SyncValueCurrentPage()

    }

    componentDidUpdate() {
        let me = this
        me.UpdateWidthGrid()
        me.setSizeScrollerTable()
        me.clearGrid()
        me.initEventGrid()
        me.caculateBottomBodyTable()
        me.setPositionHeaderBodyScrollerNormalVsLocked()
        me.SyncValueCurrentPage()
    }

    shouldComponentUpdate(nextProp, nextState) {
        try {
            let isRender = true;
            for (let prop in this.props) {
                if (this.props[prop].toString() != nextProp[prop].toString()) {
                    return isRender;
                }
            }
            for (let state in this.state) {
                if (this.state[state].toString() != nextState[state].toString()) {
                    return isRender;
                }
            }
            return false
        } catch (error) {
            return true
        }
    }

    getID() {
        return this.tableWrapAll.current.getAttribute('id')
    }

    render() {
        this.getDataGrid()
        let me = this,
            [columnsLock, columnsNormal] = me.getColumnsLockAndNormal(),
            [headerTableLock, recordsTableLock] = me.getBodyAndRecordTable(columnsLock, true),
            [headerTableNormal, recordsTableNormal] = me.getBodyAndRecordTable(columnsNormal),
            styleTableWrap = {
                width: me.props.Width || '100%',
                height: me.props.Height || '100%',
            }, paging = me.renderPaging()
        return (
            <div className='tableContainer' ref={me.tableWrapAll} id={this.props.ID}>
                <div style={styleTableWrap} className='tableWrap'>
                    <div className='tableEl'>
                        <div className='theadEl'>
                            <div ref={me.headerLocked} className='header-lock'>
                                {headerTableLock}
                            </div>
                            <div ref={me.headerNormal} className='header-normal'>
                                {headerTableNormal}
                            </div>
                        </div>

                        <div className='tbodyEl'>
                            <div ref={me.bodyTable} className='table-scroll-body'>
                                <div ref={me.bodyLocked} className='table-scrollbar-clipped table-scrollbar-locked'>
                                    {recordsTableLock}
                                </div>
                                <div ref={me.bodyNormal} className='table-scrollbar-clipped table-scrollbar-normal'>
                                    {recordsTableNormal}
                                </div>
                            </div>

                            <div ref={me.scrollContainer} className='scroller'>
                                <div ref={me.scrollLock}
                                    className='table-scrollbarer table-scrollbarer-lock'
                                    onScroll={me.onScrollTable.bind(me, me.headerLocked, me.bodyLocked, me.scrollLock)}>
                                    <div className='scroller-spacer'></div>
                                </div>
                                <div ref={me.scrollNormal}
                                    className='table-scrollbarer table-scrollbarer-normal'
                                    onScroll={me.onScrollTable.bind(me, me.headerNormal, me.bodyNormal, me.scrollNormal)}>
                                    <div className='scroller-spacer'></div>
                                </div>
                            </div>
                        </div>

                        <div className='tfooterEl'></div>
                    </div>
                </div>
                {paging}
            </div>
        )
    }
}

/**
 * nnanh 20.03.2020
 * column trong table
 */
class ColumnNA extends Component {
    static nameComponent = 'ColumnNA'
    render() {
        return (
            <div>

            </div>
        )
    }
}

/**
 * nnanh 20.05.2020
 * tạo một component popup
 */
class ComponentPopup extends Component {
    constructor() {
        super()
        let id = uuidv4() + 'popup_container'
        this.state = {
            id: id,
            idContent: id + '_Content',
            isShouldRender: true,
        }
    }

    // tạo một thùng chứa combobox
    createContainerPopup() {
        let me = this
        if (!me.getContainerPopup()) {
            let container = document.createElement('DIV')
            container.className = 'popup popup-custom ' + me.props.className || ''
            container.setAttribute('id', this.state.id)
            document.querySelector('body').appendChild(container)
        }
        return me.getContainerPopup()
    }

    // lấy ra thùng chứa popup
    getContainerPopup() {
        return document.querySelector(`[id='${this.state.id}']`)
    }

    getContainerPopupContent() {
        return document.querySelector(`[id='${this.state.idContent}']`)
    }

    setWidth(value = 200) {
        var me = this, container = me.getContainerPopupContent()
        if (container) {
            container.style.width = value + 'px'
        }
    }

    setHeight(value = 200) {
        var me = this, container = me.getContainerPopupContent()
        if (container) {
            container.style.height = value + 'px'
        }
    }

    setCenter() {
        var me = this, container = me.getContainerPopupContent()
        if (container) {

        }
    }

    renderElementToPopup() {
        let me = this, container = me.getContainerPopup(), id = this.state.id + '_Content',
            style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                background: '#fff',
                zIndex: 199,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                width: me.props.Width ? me.props.Width + "px" : "",
                height: me.props.Height ? me.props.Height + "px" : "",
                boxShadow: '2px 2px 8px 2px #444',
                borderRadius: '4px',
            },
            styleHeader = {
                position: 'relative',
                height: '24px',
            },
            styleBtnClose = {
                position: 'absolute',
                right: '4px',
                top: '4px',
                fontSize: '12px',
                fontFamily: 'cursive',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '50%',
                width: '12px',
                height: '12px',
                textAlign: 'center',
                lineHeight: '12px'
            },
            styleBody = {
                maxHeight: '100%',
                flex: 1,
            },
            element = <div className='' id={id} style={style}>
                <div className='header' style={styleHeader}>
                    <div className='btn-close' style={styleBtnClose} onClick={this.closePopup.bind(this)}>X</div>
                </div>
                <div className='body-el' style={styleBody}>{this.props.children}</div>
            </div>
        ReactDOM.render(element, container)
    }

    closePopup() {
        this.hide()
        if (this.props.onClosePopup && typeof (this.props.onClosePopup) == 'function') {
            this.props.onClosePopup()
        }
    }

    hide() {
        document.getElementById(this.state.id).style.display = 'none'
        NgocAnh.CommonFunction.hideOverlay()
    }

    show() {
        let me = this
        document.getElementById(this.state.id).style.display = 'block'
        NgocAnh.CommonFunction.showOverlay()
    }

    componentWillUnmount() {
        NgocAnh.CommonFunction.hideOverlay()
    }

    componentDidUpdate() {
        var me = this
        me.renderElementToPopup()
        this.show()
        this.setWidth(me.props.Width)
        this.setHeight(me.props.Height)
        this.setCenter()
    }

    componentDidMount() {
        const me = this
        me.createContainerPopup()
        me.renderElementToPopup()
        me.show()
    }
    render() {
        let me = this
        return (
            <div></div>
        )
    }
}

class LayoutLocker extends Component {
    constructor() {
        super()
    }
    getData() {
        let me = this, items = []
        try {
            if (me.props.data && JSON.parse(me.props.data)) {
                items = JSON.parse(me.props.data).items
                if (items && items.length > 0) {
                    return items
                }
            }
        } catch (error) {

        }
        return []
    }
    onClickComponent(data) {
        let me = this
        if (me.props.onClickComponent && typeof (me.props.onClickComponent) == 'function') {
            me.props.onClickComponent(data)
        }
    }
    render() {
        let me = this, children = [],
            items = me.getData(), page = me.props.Page
        for (var row = 1; row <= 3; row++) {
            for (var col = 1; col <= 7; col++) {
                let data = null,
                    rec = items.filter(
                        item => {
                            return item.lPg == page &&
                                item.lRw == (row - 1) &&
                                item.lCl == (col - 1)
                        })
                if (rec.length == 1) {
                    data = rec[0]
                }
                children.push(<ComponentLayoutLocker
                    onClick={me.onClickComponent.bind(me)}
                    Row={row} Column={col} data={data} Page={page} />)
            }
        }
        return (
            < div className='layout-locker-wrap' >
                Trang {page}
                <div className='layout-locker-content'>
                    {children}
                </div>
            </div >

        )
    }
}


class ComponentLayoutLocker extends Component {
    onClick() {
        let me = this
        if (me.props.onClick && typeof (me.props.onClick) == 'function') {
            let data = me.props.data
            if (data) {
                data.entityState = NgocAnh.Enumeration.EntityState.Update
            }
            else {
                data = {
                    entityState: NgocAnh.Enumeration.EntityState.Add,
                    lRw: me.props.Row,
                    lCl: me.props.Column,
                    lPg: me.props.Page,
                }
            }
            me.props.onClick(data)
        }
    }
    render() {
        var me = this, order = me.props.Row + ' ' + me.props.Column,
            data = me.props.data, label = '', txtOrdered = ''
        if (data) {
            label = <div title={data.lLb} >{data.lLb}</div>
            txtOrdered = <div title={`Số thứ tự: ${data.lNum}`}>Số thứ tự: <span>{data.lNum}</span></div>
        }
        return (
            <div className='component-layout-locker-wrap' onClick={me.onClick.bind(this)}>
                <div className='component-layout-locker-content'>
                    <div className='txt-component-layout-locker-common'>
                        {label}
                    </div>
                    <div className='txt-component-layout-locker-common'>
                        {txtOrdered}
                    </div>
                </div>
            </div>
        )
    }
}

class LockerManage extends Component {
    constructor() {
        super()
    }
    getData() {
        let me = this, items = []
        try {
            if (me.props.data && JSON.parse(me.props.data)) {
                items = JSON.parse(me.props.data).items
                if (items && items.length > 0) {
                    return items
                }
            }
        } catch (error) {

        }
        return []
    }
    onClickComponent(data) {
        let me = this
        if (me.props.onClickComponent && typeof (me.props.onClickComponent) == 'function') {
            me.props.onClickComponent(data)
        }
    }

    onClickOption(childControl, stt) {
        let me = this
        if (me.props && typeof (me.props.onClickOption) == 'function') {
            me.props.onClickOption(childControl, stt)
        }
    }
    render() {
        let me = this, children = [],
            items = me.getData(), page = me.props.Page,
            isRenderPage = false // nếu ko có phần tử nào thuộc vào page đó thì ko render page đó
        for (var row = 1; row <= 3; row++) {
            for (var col = 1; col <= 7; col++) {
                let data = null,
                    rec = items.filter(
                        item => {
                            return item.lPg == page &&
                                item.lRw == (row - 1) &&
                                item.lCl == (col - 1)
                        })
                if (rec.length == 1) {
                    data = rec[0]
                    isRenderPage = true
                }
                children.push(<ComponentLockerManage
                    onClick={me.onClickComponent.bind(me)}
                    onClickOption={me.onClickOption.bind(me)}
                    Row={row} Column={col} data={data} Page={page} />)
            }
        }
        return (
            isRenderPage && < div className='layout-locker-wrap' >
                Trang {page}
                <div className='layout-locker-content'>
                    {children}
                </div>
            </div >

        )
    }
}


class ComponentLockerManage extends Component {
    items = [
        { stt: 1, icon: '', text: 'Chỉnh sửa', },
        { stt: 2, icon: '', text: 'Mở tủ', },
        { stt: 3, icon: '', text: 'Giải phóng tủ', },
        { stt: 4, icon: '', text: 'Xác nhận mở tại chỗ', },
        { stt: 5, icon: '', text: 'Vô hiệu hóa tủ', },
        { stt: 6, icon: '', text: 'Kích hoạt tủ', },
        { stt: 7, icon: '', text: 'Báo lỗi tủ', },
        { stt: 8, icon: '', text: 'Dừng báo lỗi tủ', },
    ]
    constructor() {
        super()
        this.state = {
            isShowPopupOption: false,
            currentData: null,
        }
    }
    onContextMenu(e) {
        e.preventDefault()
        let me = this
        me.renderOptionCombobox(e)
        this.setState({
            isShowPopupOption: true,
        })
    }
    renderOptionCombobox(e) {
        let me = this, listItems = []
        for (var i = 0; i < me.items.length; i++) {
            let item = me.items[i]
            listItems.push(<div className='popup-item-option-locker-wrap' data-id={item.stt} onClick={me.onClickOption.bind(me)}>
                <div className='popup-item-option-locker-content'>
                    <div className={'icon ' + item.icon}></div>
                    <div className={'txt-item-option-locker'}>{item.text}</div>
                </div>
            </div>)
        }
        let style = {
            top: e.clientY,
            left: e.clientX + 10,
        },
            x = <div style={style} className='popup-option-locker-wrap'>
                <div className='popup-option-locker-content'>
                    {listItems}
                </div>
            </div>
        me.renderToContainer(x)
    }

    onClickOption(e) {
        let me = this, stt = e.currentTarget.dataset.id
        if (me.props && typeof (me.props.onClickOption) == 'function') {
            me.props.onClickOption(me, stt)
        }
    }

    mousedownDocument(e) {
        let me = this, className = ''
        for (var i = 0; i < e.target.classList.length; i++) {
            let classes = e.target.classList[i]
            className += '.' + classes;
        }
        if (document.querySelectorAll("#" + NgocAnh.Enumeration.PopupOptionLocker.ID + ' ' + className).length > 0) {
        }
        else {
            me.renderToContainer(null)

        }
    }

    renderToContainer(el) {
        let container = document.getElementById(NgocAnh.Enumeration.PopupOptionLocker.ID)
        ReactDOM.render(el, container)
    }

    componentDidMount() {
        let me = this;
        document.onmousedown = me.mousedownDocument.bind(me)
    }

    render() {
        var me = this, order = me.props.Row + ' ' + me.props.Column,
            data = me.props.data, label = '', txtOrdered = '', className = 'component-locker-controller-wrap ',
            txtError = '', txtStatus = ''
        if (data) {
            label = <div title={data.lLb} >{data.lLb} - Zone: {data.lZone} </div>
            txtOrdered = <div title={`Số thứ tự: ${data.lNum}`}>Số thứ tự: <span>{data.lNum}</span></div>
            if (data.health == "ERROR") {
                txtError = <div>Tủ có lỗi kỹ thuật</div>
                className += 'color-gray'
            }
            if (data.aStatus == "DISABLED") {
                txtStatus = <div>Tủ bị vô hiệu hóa</div>
                className += 'color-gray-gray'
            } else {
                txtStatus = <div>Tủ chưa được phân</div>
            }
        } else {
            className += 'visibility-hidden'
        }

        return (
            <div className={className} onContextMenu={me.onContextMenu.bind(this)}>
                <div className='component-locker-controller-content'>
                    <div className='txt-component-locker-controller-common'>
                        {label}
                    </div>
                    <div className='txt-component-locker-controller-common'>
                        {txtOrdered}
                        {txtError}
                        {txtStatus}
                    </div>
                </div>
            </div>
        )
    }
}

class FormSubmit extends Component {
    render() {
        let me = this, className = me.props.className ? me.props.className : '',
            typeChild = me.props.typeChild ? me.props.typeChild : ''
        return (
            <div className={className} typeChild={typeChild} ref={me.lockerHeader}>
                {me.props.children}
            </div>
        )
    }
}

class ContainerWrapRecord extends Component {
    constructor() {
        super()
    }

    /**
     *  render ra danh sách các thẻ con bên trong 
     */
    renderListComponent() {
        try {
            let me = this, components = [], datas = JSON.parse(me.props.data),
                listDataIndex = JSON.parse(me.props.listDataIndex),
                sperator = me.props.sperator || ''
            if (datas && datas.length > 0 && listDataIndex && listDataIndex.length > 0) {
                for (let i = 0; i < datas.length; i++) {
                    let text = '', data = datas[i]
                    for (let j = 0; j < listDataIndex.length; j++) {
                        let dataIndex = listDataIndex[j],
                            valueIndex = data[dataIndex] || ''
                        if (j + 1 == listDataIndex.length) {
                            text += valueIndex
                        } else {
                            text += valueIndex + " " + sperator + " "

                        }
                    }
                    let component = <div className='item-container-wrap-record-wrap'>
                        <div className='item-container-wrap-record-content' title={text}>
                            {text}
                        </div>
                    </div>
                    components.push(component)
                }
            }
            return components
        } catch (error) {
            return null
        }
    }

    renderLabel() {
        try {
            let me = this
            if (me.props.isHasLabel == false) {
                return null
            } else {
                let text = me.props.textLabel || ' '
                return <div class="label-element"><label>{text}</label></div>
            }

        } catch (error) {
            return null
        }
    }

    render() {
        let me = this, listComponent = me.renderListComponent(),
            label = me.renderLabel()
        return (
            <div className='container-wrap-component-wrap-nnanh'>
                <div className='container-wrap-component-content-nnanh'>
                    {label}
                    <div className='menu-container-wrap-record-wrap'>
                        <div className='menu-container-wrap-record-content'>
                            {listComponent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class LabelInput extends Component {

    constructor() {
        super()
        this.state = {
            id: uuidv4()
        }
        this.input = React.createRef()
    }

    getValue() {
        return this.input.current.checked
    }

    getLabel() {
        let me = this
        if (me.props.TextLabel) {
            return me.props.TextLabel
        }
        return ""
    }
    render() {
        let me = this, txtLabel = me.getLabel(),
            divWrap = {
                paddingTop: '8px',
                paddingBottom: '16px',
            },
            divContent = {
                position: 'relative',
                height: '100%',
                display: 'flex',
            },
            labelStyle = {
                position: 'relative',
                top: '0px',
                left: '4px',
                fontSize: '14px',
            }
        return (
            <div style={divWrap} className="label-component-single-wrap">
                <div style={divContent} className='label-component-single-content'>
                    <input ref={me.input} type='checkbox' id={me.state.id} className='input-label-component-single'></input>
                    <label style={labelStyle} htmlFor={me.state.id} className='txt-label-component-single' title={txtLabel}>{txtLabel}</label>
                </div>
            </div>
        )
    }
}

const UserContext = React.createContext()
const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer
export default InputNA;
export {
    NgocAnh, ConfigsAPI, BoxWrapNA,
    SelectFormNA, httpRequest, UserProvider,
    UserConsumer, UserContext, ComboboxNA,
    TableNA, ColumnNA, FormSubmit,
    ComponentPopup, LayoutLocker, LockerManage,
    ContainerWrapRecord,
    LabelInput,
}


