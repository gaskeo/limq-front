import {MixinTypeStates} from "../../../store/reducers/mixinsReducer";
import {Channel} from "../../../store/reducers/channelsReducer";
import {useMixinCard} from "../../../hooks/elementHooks/useCard";
import {useRef} from "react";

interface mixinCardProps {
    channel: Channel,
    mixinType: MixinTypeStates
}

export function MixinCard({channel, mixinType}: mixinCardProps) {
    const myRef = useRef(null)

    const {deleteMixin, lang, copyCode} = useMixinCard(channel, mixinType, myRef)

    return (
        <div className='show-card' ref={myRef}>
            <div className='card card-100 max-width-500-4rem' key={channel["channel_id"]}>
                <div className='card-header-container'>
                    <div className='card-header'>{channel['channel_name']}</div>
                </div>
                <div className='code-container copy-cursor'>
                    <code onClick={copyCode} className='card-code card-background-text'>{channel['channel_id']}</code>
                </div>

                <button className='button mini-button error-button'
                            onClick={deleteMixin}>{lang.DeleteMixinButton}</button>
            </div>
            <div className='gap'/>
        </div>
    )
}
