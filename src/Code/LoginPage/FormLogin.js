import React from 'react'
import InputField from './InputField'
import Logo from './source/image/Techcombank_logo.png'

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
export default FormLogin;