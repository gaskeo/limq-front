import React from "react";

export function NoMixinsCard(props: {mixinType: string}) {
    return (
        <div className='card add-channel-card card-100 horizontal-scroll'>
            <div className='add-channel-card-text width-100 center'>
                <h1 className='card-header'>You haven't {props.mixinType} mixins</h1>
            </div>
        </div>
    )
}
