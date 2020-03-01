import React from 'react'
import TypingRun from './TypingRun'
import Brand from './source/image/brand.svg'
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
                <TypingRun />
            </div>
        )
    }
}
export default BrandCompany;
