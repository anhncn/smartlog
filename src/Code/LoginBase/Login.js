import React from 'react'
import BaseContainer from '../../Base/Scripts/BaseContainer'
import TypingRun from './TypingRun'
import BrandCompany from './BrandCompany'
import FormLogin from './LoginForm'

class Login extends React.Component {
    render() {
        return (
            <BaseContainer layout="AbsoluteLayout" padding="0 120px" Top="0" Bottom="0" Left="0" Right="0">
                <BaseContainer layout="VBoxLayout" >
                    <BaseContainer Flex={1}></BaseContainer>
                    <BaseContainer height='525px' layout="HBoxLayout">

                        <BaseContainer Flex={1} layout="VBoxLayout" backgroundColor="#963">
                            <BaseContainer Flex={1} layout="VBoxLayout">
                                <BaseContainer Flex={3}></BaseContainer>
                                <BaseContainer Flex={14} width="70%" >
                                    <BrandCompany />
                                </BaseContainer>
                                <BaseContainer Flex={3}></BaseContainer>
                            </BaseContainer>

                            <BaseContainer height="115px" padding="0 0 25px 0">
                                <TypingRun />
                            </BaseContainer>
                        </BaseContainer>

                        <BaseContainer width="300px">
                            <FormLogin/>
                        </BaseContainer>

                    </BaseContainer>
                    <BaseContainer Flex={1}></BaseContainer>
                </BaseContainer>
            </BaseContainer>
        )
    }
}

export default Login
