import React, { useState } from 'react';
export const SearchBox = (props) => {
    const keyUpHandler = (e) => {
        // keyCode==13 => enter 
        if (e.keyCode === 13) {
            console.log(input);
        }
    }
    let [input, changeInput] = useState("Search here");
    let [toggle, changeToggle] = useState(false)
    let onChange = (e) => {
        changeInput(e.target.value);
    }
    return (
        <div>
            <div>
                <input onKeyUp={keyUpHandler} value={input} onClick={() => {
                    if (!toggle) {
                        changeInput("");
                    }
                    changeToggle(true)
                }} onChange={onChange} type="text" ></input>
            </div>
        </div>

    )
}
