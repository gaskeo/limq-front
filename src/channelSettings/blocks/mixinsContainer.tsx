import {useMixinContainer} from "../../hooks/elementHooks/useChannelSettings";
import {dataStates} from "../../store/reducers/consts";
import {LoadingMixinCard} from "./mixinCard/loadingMixinCard";
import {NoMixinsCard} from "./mixinCard/noMixinsCard";
import {MixinCard} from "./mixinCard/mixinCard";
import React from "react";

export function MixinsContainer() {
    const {reversedMixins, mixinsDataState, mixinType} = useMixinContainer()

    if (mixinsDataState === dataStates.requested) {
        return <div className='card-container card-100-container'><LoadingMixinCard/></div>
    }
    if (mixinsDataState === dataStates.received && reversedMixins.length <= 0) {
        return <div className='card-container card-100-container'><NoMixinsCard mixinType={mixinType}/></div>
    }

    return <div className='card-100-container'>
        {reversedMixins && reversedMixins.map(channel => <MixinCard key={channel['channel_id']} channel={channel}
                                                                    mixinType={mixinType}/>)}
    </div>
}
