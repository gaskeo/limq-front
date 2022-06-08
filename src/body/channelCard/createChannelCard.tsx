import {Plus} from "../../svg/plus";
import {routes} from "../../routes/routes";
import {useNavigate} from "react-router-dom";

export function CreateChannelCard() {
    function onClick() {
        return function () {
            navigate(routes.addChannel)
        }
    }

    const navigate = useNavigate()

    return (
        <div onClick={onClick()}
             className='card add-channel-card'>
            <div className='add-channel-card-text'>
                <span className='channel-card-add-icon'><Plus/></span>
                <h1 className='card-header'>Add channel</h1>
            </div>
        </div>
    )
}