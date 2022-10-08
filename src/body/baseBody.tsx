import {Register} from "../register/register";
import {useMainBody} from "../hooks/elementHooks/useMainBody";

const learnMoreLink = '/helpdesk'

export function BaseBody() {
    const {lang, conveyorImage} = useMainBody()

    const {GreetingText, GreetingHeader, LearnMoreButton} = lang

    return (
        <div className='base-body'>
            <div className='greeting-window center center-text block-vertical-center'>
                <div>
                    <img className='body-image' src={conveyorImage} alt=''/>
                    <div className='gap'/>
                    <h1 className='center-text'>{GreetingHeader}</h1>
                    <p className='text'>{GreetingText}</p>
                    <div className='center'>
                        <a href={learnMoreLink} className='button mini-button'>{LearnMoreButton}</a>
                    </div>
                </div>
            </div>

            <div className='register-main-window right width-100'><Register/></div>
        </div>
    )
}
