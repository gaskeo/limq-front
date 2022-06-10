import {Loading} from "../../../elements/loading/loading";
import React from "react";

export function LoadingMixinCard() {
    return (
        <div className='card card-100 horizontal-scroll'>
            <div className='center height-100'>
                <Loading/>
            </div>
        </div>
    )
}
