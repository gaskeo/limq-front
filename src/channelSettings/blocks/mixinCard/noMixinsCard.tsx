import React from "react";
import {MixinTypeStates} from "../../../store/reducers/mixinsReducer";

interface noMixinsCardProps {
    mixinType: MixinTypeStates
}

export function NoMixinsCard({mixinType}: noMixinsCardProps) {
    return (
        <div className='card add-channel-card card-100 horizontal-scroll'>
            <div className='add-channel-card-text width-100 center'>
                <h1 className='card-header'>You haven't {mixinType} mixins</h1>
            </div>
        </div>
    )
}
