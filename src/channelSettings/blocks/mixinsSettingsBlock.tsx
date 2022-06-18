import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React, {useEffect} from "react";
import {Menu} from "../../elements/menu/menu";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {dataStates} from "../../store/reducers/consts";
import {MixinTypeStates} from "../../store/reducers/mixinsReducer";
import {Loading} from "../../elements/loading/loading";
import {LoadingMixinCard} from "./mixinCard/loadingMixinCard";
import {NoMixinsCard} from "./mixinCard/noMixinsCard";
import {MixinCard} from "./mixinCard/mixinCard";
import {useParams, useSearchParams} from "react-router-dom";
import {SettingsBlock} from "../../elements/menu/settingsBlock";
import {useMixinsSettingsBlock} from "../../hooks/elementHooks/useChannelSettings";

export function checkMixinLength(mixin: string) {
    return mixin.length === 32
}


function MixinsContainer() {
    const {mixinsData} = useTypedSelector(state => state.mixins)
    const {channels} = useTypedSelector(state => state.channels)
    const {channelId} = useParams()

    const channel = channels.filter(channel => channel['channel_id'] === channelId)[0]
    const [searchParams, _] = useSearchParams()
    const mixinType = searchParams.get('mixin-tab') as MixinTypeStates || MixinTypeStates.in

    const currentMixins = mixinsData[channel ? channel['channel_id'] : '']
    const reversedMixins = currentMixins && (currentMixins[mixinType] ? [...currentMixins[mixinType]] : [])

    if (currentMixins && currentMixins.mixinsDataState === dataStates.requested) {
        return <div className='card-container card-100-container'><LoadingMixinCard/></div>
    }
    if (currentMixins && currentMixins.mixinsDataState === dataStates.received && currentMixins[mixinType] &&
        currentMixins[mixinType].length === 0) {
        return <div className='card-container card-100-container'><NoMixinsCard mixinType={mixinType}/></div>
    }

    return <div className='card-container card-100-container'>
        {currentMixins && reversedMixins.map(channel => <MixinCard key={channel['channel_id']} channel={channel}
                                                                   mixinType={mixinType}/>)}
    </div>
}

export const mixinTabs = (names: { in: string, out: string }) => [
    {
        name: names.in, parameterName: 'in',
        id: 1, block: () =>
            <MixinsContainer key='1'/>
    },
    {
        name: names.out, parameterName: 'out',
        id: 2, block: () =>
            <MixinsContainer key='2'/>
    },
]


export function MixinsSettingsBlock() {
    useEffect(() => {
        checkTabInParams()
    })

    const {
        submit,
        lang,
        keyId,
        changeKeyId,
        errors,
        checkMixin,
        errorMessage,
        requested,
        activeTab,
        changeTab,
        tabs,
        checkTabInParams
    } = useMixinsSettingsBlock()

    const {CreateMixinHeader, ReadKeyForm, EnterReadKey, CreateMixinButton, YourMixinsHeader} = lang

    return (
        <div>
            <form onSubmit={submit}>
                <h2 className='header-2'>{CreateMixinHeader}</h2>

                <Input state={keyId}
                       setState={changeKeyId}
                       label={ReadKeyForm}
                       type='text'
                       errorText={errors.mixin}
                       onChange={checkMixin}
                       placeholder={EnterReadKey}/>
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : CreateMixinButton}/>
            </form>
            <span className='gap'/>
            <h1 className='header-1'>{YourMixinsHeader}</h1>

            <div className='max-width-500'>
                <Menu active={activeTab} onClick={changeTab} tabs={tabs}
                      menuClasses='menu-horizontal' menuTabClasses='menu-tab-horizontal'/>
            </div>
            <span className='gap'/>
            <SettingsBlock currentTab={activeTab} tabs={tabs}/>
        </div>
    )
}