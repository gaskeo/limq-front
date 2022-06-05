import {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchLogin} from "../fetch/fetchLogin";

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
                <label>
                    Email
                    <input className='app-input' id='email' type='email' value={email}
                           onChange={(e) => changeEmail(e.target.value)}/>
                </label>
                <label>
                    <input className='app-input' id='password' type='password' value={password}
                    onChange={(e) => changePassword(e.target.value)}/>
                </label>
                <input type='submit' onClick={submit}/>
            </form>
        </div>
    )
}