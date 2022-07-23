import {Key} from "../../../store/reducers/keysReducer";
import React, {useRef} from "react";
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

export const KeyCard = ({channelKey}: keyCardProps) => {
    const myRef = useRef<HTMLDivElement>(null)

    const {deleteKey, toggleActiveKey, perm, requested, lang, copyCode} = useKeyCard(channelKey, myRef)

    return (
        <div className='show-card' ref={myRef}>
            <div className='card card-100 horizontal-scroll'>
                <div className='card-header-container'>
                    <h1 className='card-header'>{channelKey.name} {!channelKey.active && <span className='grey-text'>({lang.Paused})</span>}</h1>
                </div>
                <div className='card-info-container'>
                    <p className='card-text grey-text'>{perm}, {channelKey.created}</p>
                    <div className='code-container'>
                        <code className='card-code card-background-text' onClick={copyCode}>{channelKey.key}</code>
                    </div>
                    <div className='card-inline-block'>
                        <button className={`button mini-button ${channelKey.active ? 'warning-button' : 'success-button'}`}
                                onClick={toggleActiveKey}>
                            <PauseButtonContent active={channelKey.active} requested={requested}/>
                        </button>
                        <button className='button mini-button error-button'
                                onClick={deleteKey}>{lang.DeleteKeyButton}</button>
                    </div>
                </div>
            </div>
            <div className='gap'/>
        </div>
    )
}
