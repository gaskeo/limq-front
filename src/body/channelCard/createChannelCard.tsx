import {Plus} from "../../svg/plus";
import {routes} from "../../routes/routes";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Badge} from "../../elements/badge/badge";


interface CreateChannelCardProps {
    leftChannels: number
}

export function CreateChannelCard({leftChannels}: CreateChannelCardProps) {
    const {lang} = useTypedSelector(state => state.lang)

    return (
        <Link to={routes.addChannel} className='card add-channel-card'>
            <div className='add-channel-card-text'>
                <span className='channel-card-add-icon'><Plus/></span>
                <h1 className='card-header'>{lang.CreateChannelButton}</h1>
                <Badge classes={(leftChannels !== 0 ? 'success-button' : 'error-button') +
                ' margin-left-4px margin-bottom-4px cursor'}>{leftChannels}</Badge>
            </div>
        </Link>
    )
}
