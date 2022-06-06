import {channel} from "../../store/reducers/channelsReducer";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {useState} from "react";

export function MixinsSettingsBlock(props: { isCurrent: boolean, channel: channel | undefined }) {
    function submit() {

    }
    const [keyId, changeKeyId] = useState('')

    if (!props.isCurrent) {
        return null
    }

    return (
        <div>
            <h1 className='header-1'>Create mixin</h1>
            <form>
                <Input label='Read key' state={keyId} setState={changeKeyId} type='text' placeholder={'X'.repeat(32)}/>
                <Submit label='Submit' submit={submit}/>
            </form>
            <span className='gap'/>

        </div>
    )
}