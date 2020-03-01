import React from 'react'
import './css/Login.css'
import BrandCompany from './BrandCompany'
import FormLogin from './FormLogin'
class Login extends React.Component{
    render() {
        return (
            <div className={"login"}>
                <BrandCompany className="" />
                <FormLogin /> 
            </div>
        )
    }
}
export default Login;