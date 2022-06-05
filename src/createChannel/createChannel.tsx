import {Input} from "../elements/inputs/input";
import {useState} from "react";
import {Submit} from "../elements/inputs/submit";
import {useDispatch} from "react-redux";
import {fetchCreateChannel} from "../fetch/fetchCreateChannel";

export function CreateChannel() {
    function submit() {
        dispatch(fetchCreateChannel(channelName) as any)
    }

    function checkData(text: string) {
        if (text.length > 40) {
            return 'Name too long'
        }
        return ''
    }

    const dispatch = useDispatch()

    const [channelName, changeChannelName] = useState('')
    return (
        <div>
            <form>
                <Input label='Name' state={channelName} setState={changeChannelName} checkData={checkData} type='text'/>
                <Submit label='Submit' submit={submit}/>
            </form>
        </div>
    )
}