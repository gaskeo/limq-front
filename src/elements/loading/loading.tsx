import './loading.css'
import React from "react";

export function Loading(props: {diameter?: string}) {
    const style = {'--diameter': props.diameter ? props.diameter : '15px'} as React.CSSProperties
    return (
        <div className='loading' style={style}>
            <div className='circle circle-1'/>
            <div className='circle circle-2'/>
            <div className='circle circle-3'/>
        </div>
    )
}