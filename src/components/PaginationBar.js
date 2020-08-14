import React,{useState} from 'react';
export const PaginationBar=(props)=>{
    const clickHandler=props.clickHandler;
    const icon=props.icon;
    return (
        <span style={{margin:"10px 10px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span onClick={clickHandler} style={{fontWeight:"bold",cursor:"pointer",paddingTop:"20px",fontSize:"20px"}}>
                {icon}
            </span>
        </span>
    )
}
