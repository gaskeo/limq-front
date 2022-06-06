import {useState} from "react";
import {useDispatch} from "react-redux";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {fetchChangeUsername} from "../../fetch/fetchChangeUsername";

export function NameBlock(props: {isCurrent: boolean}) {
    function submit() {
        if (id) {
            dispatch(fetchChangeUsername(newUsername) as any)
        }
    }

    const {id, username} = useTypedSelector(state => state.user)

    const [newUsername, changeNewUsername] = useState('')
    const dispatch = useDispatch()
    if (!props.isCurrent) {
        return null
    }

    const placeholder = username ? username : ''
    return (
        <div>
            <h1 className='header-1'>Main settings</h1>
            <form>
                <Input label='Name' state={newUsername} setState={changeNewUsername} placeholder={placeholder}
                       type='text'/>
                <Submit label='Submit' submit={submit}/>
            </form>
        </div>
    )
}