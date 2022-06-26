import {Register} from "../register/register";
import {availableThemes, getSystemTheme, getTheme} from "../theme";

const lightConveyor = require('../images/conveyor-light.png')
const darkConveyor = require('../images/conveyor-dark.png')

export function BaseBody() {
    const theme = getTheme()
    const conveyorImage = (theme === availableThemes.light ||
        (theme === availableThemes.system && getSystemTheme() === availableThemes.light)) ? darkConveyor : lightConveyor
    return (
        <div className='base-body'>
            <div className='greeting-window center center-text block-vertical-center'>
                <div>
                    <img className='body-image' src={conveyorImage} alt=''/>
                    <div className='gap'/>
                    <h1 className='header-1 center-text'>Introducing LiMQ functions</h1>
                    <p className='text'>LiMQ is a powerful SaaS cloud message broker</p>
                    <div className='center'>
                        <button className='button mini-button'>Learn more</button>
                    </div>
                </div>
            </div>

            <div className='register-main-window'><Register/></div>
        </div>
    )
}
