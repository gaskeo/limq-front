import {Plus} from "../../svg/plus";
import {routes} from "../../routes/routes";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";

export function CreateChannelCard() {
    const {lang} = useTypedSelector(state => state.lang)

    return (
        <Link to={routes.addChannel} className='card add-channel-card'>
            <div className='add-channel-card-text'>
                <span className='channel-card-add-icon'><Plus/></span>
                <h1 className='card-header'>{lang.CreateChannelButton}</h1>
            </div>
        </Link>
    )
}