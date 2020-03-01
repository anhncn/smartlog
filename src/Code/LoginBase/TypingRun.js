import React from 'react'
import './css/typingrun.css'

class TypingRun extends React.Component{
    render(){
        return(
            <div className={"typing-run"}>
                <span className="text-red" >SMART</span>
                <span className="text-black">LOCKER</span>
            </div>
        )
    }
}
export default TypingRun;