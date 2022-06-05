import {Input} from "../../elements/inputs/input";
import {useState} from "react";
import {Submit} from "../../elements/inputs/submit";
import {channel} from "../../store/reducers/channelsReducer";
import {useDispatch} from "react-redux";
import {fetchChangeChannelName} from "../../fetch/fetchChangeChannelName";

export function MainSettingsBlock(props: { isCurrent: boolean, channel: channel | undefined }) {
    function submit() {
        if (props.channel) {
            dispatch(fetchChangeChannelName(props.channel['channel_id'], channelName) as any)
        }
    }


    const [channelName, changeChannelName] = useState('')
    const dispatch = useDispatch()
    if (!props.isCurrent) {
        return null
    }

    const placeholder = props.channel ? props.channel['channel_name'] : ''
    return (
        <div>
            <h1 className='header-1'>Main settings</h1>
            <form>
                <Input label='Name' state={channelName} setState={changeChannelName} placeholder={placeholder}
                       type='text'/>
                <Submit label='Submit' submit={submit}/>
            </form>
        </div>
    )
}