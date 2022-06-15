import React from "react";
import {MixinTypeStates} from "../../../store/reducers/mixinsReducer";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

interface noMixinsCardProps {
    mixinType: MixinTypeStates
}

export function NoMixinsCard({mixinType}: noMixinsCardProps) {
    const {lang} = useTypedSelector(state => state.lang)
    const cardText = mixinType === MixinTypeStates.in ? lang.NoMixinInCard : lang.NoMixinOutCard
    return (
        <div className='card add-channel-card card-100 horizontal-scroll'>
            <div className='add-channel-card-text width-100 center'>
                <h1 className='card-header'>{cardText}</h1>
            </div>
        </div>
    )
}
