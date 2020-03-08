import React from 'react'
import InputField from './InputField'
import Logo from './source/image/Techcombank_logo.png'
import Brand from './source/image/brand.svg'
import './login.css'

/**
 * created by nnanh 
 * form đăng nhập bên trái màn
 * updated 08/03/2020
 * chuyển vào chung js với Login
 */
class FormLogin extends React.Component{
    render(){
        return(
            <div className={"form-login"}>
                <div>
                    <div className="img-logo">
                        <img alt="brand" src={Logo}></img>
                    </div>
                    <div className="form-detail">
                        <form>
                            <InputField id="name" textLabel="Tên đăng nhập" typeInput="text" padding="0 0 30 0" />
                            <InputField id="password" textLabel="Mật khẩu" typeInput="password" padding="0 0 30 0" />
                            <div style={{display:"none"}}>Tên đăng nhập hoặc mật khẩu không đúng</div>
                            <InputField id="submitBtn" value="Đăng nhập" hasLabel={false} typeInput="submit" clsInput="btn-custom" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * created by nnanh 
 * nhãn bên trái màn đăng nhập
 * updated 08/03/2020
 * chuyển vào chung js với Login
 */
class BrandCompany extends React.Component{
    constructor(){
        super()
        this.state = {
            classNameThis:"brand-company ",
            altImage:"No image",
            urlImage:Brand,
        }
    }
    render(){
        var altImage = this.props.altImage || this.state.altImage
        var urlImage = this.props.urlImage || this.state.urlImage
        var classNameThis = this.state.classNameThis + this.props.className
        return(
            <div className={classNameThis}>
                <div className={"container-brand"}>
                    <img alt={altImage} src={urlImage} className={"brand-techcombank"}></img>
                </div>
                <div className={"typing-run"}>
                    <span className="text-red" >SMART</span>
                    <span className="text-black">LOCKER</span>
                </div>
            </div>
        )
    }
}

/**
 * created by nnanh 
 */
class Login extends React.Component{
    render() {
        return (
            <div className={"login"}>
                <BrandCompany/>
                <FormLogin /> 
            </div>
        )
    }
}
export default Login;