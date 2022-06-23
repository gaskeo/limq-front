import {Key} from "../../../store/reducers/keysReducer";
import React from "react";
import {Loading} from "../../../elements/loading/loading";
import {useKeyCard} from "../../../hooks/elementHooks/useCard";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

interface keyCardProps {
    channelKey: Key
}

function PauseButtonContent({requested, active}: { requested: boolean, active: boolean }) {
    const {lang} = useTypedSelector(state => state.lang)
    if (requested) {
        return <div className='warning-loading'><Loading diameter='10px'/></div>
    }
    if (active) {
        return <>{lang.PauseKeyButton}</>
    }
    return <>{lang.ResumeKeyButton}</>
}

export function KeyCard({channelKey}: keyCardProps) {
    const {deleteKey, toggleActiveKey, perm, requested, lang} = useKeyCard(channelKey)

    return (
        <div className='card card-100 horizontal-scroll'>
            <div className='card-header-container'>
                <h1 className='card-header'>{channelKey.name}</h1>
            </div>
            <div className='card-info-container'>
                <p className='card-text grey-text'>{perm}, {channelKey.created}</p>
                <code className='card-code card-background-text'>{channelKey.key}</code>
                <div className='card-inline-block'>
                    <button className='button mini-button warning-button' onClick={toggleActiveKey}>
                        <PauseButtonContent active={channelKey.active} requested={requested}/>
                    </button>
                    <button className='button mini-button error-button' onClick={deleteKey}>{lang.DeleteKeyButton}</button>
                </div>
            </div>
        </div>
    )
}
