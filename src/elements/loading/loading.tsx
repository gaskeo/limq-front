import './loading.css'
import React from "react";

interface loadingProps {
    diameter?: string
}
export function Loading({diameter}: loadingProps) {
    const style = {'--diameter': diameter ? diameter : '15px'} as React.CSSProperties
    return (
        <div className='loading' style={style}>
            <div className='circle circle-1'/>
            <div className='circle circle-2'/>
            <div className='circle circle-3'/>
        </div>
    )
}