import {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchLogin} from "../fetch/fetchLogin";
import {Input} from "../elements/inputs/input";
import {Submit} from "../elements/inputs/submit";

export function Login() {
    function submit() {
        dispatch(fetchLogin(email, password, true) as any)
        return false;
    }

    const dispatch = useDispatch()

    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('')
    return (
        <div className='app-login'>
            <form className='app-form'>
                <Input state={email} setState={changeEmail} label='Email' type='email'/>
                <Input label='Password' state={password} setState={changePassword} type='password'/>
                <Submit label='Submit' submit={submit}/>
            </form>
        </div>
    )
}