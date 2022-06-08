import {Loading} from "../../elements/loading/loading";
import React from "react";

export function LoadingChannelCard() {
    return (
        <div className='card'>
            <div className='center height-100'>
                <Loading/>
            </div>
        </div>
    )
}