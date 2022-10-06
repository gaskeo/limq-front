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
    if (leftChannels > 0) {
        return (
            <Link to={routes.addChannel} className='card add-channel-card'>
                <div className='add-channel-card-text'>
                    <span className='channel-card-add-icon'><Plus/></span>
                    <h1 className='card-header'>{lang.CreateChannelButton}</h1>
                    <Badge classes={(leftChannels > 0 ? 'success-button' : 'error-button') +
                    ' margin-left-4px margin-bottom-4px cursor'}>{leftChannels}</Badge>
                </div>
            </Link>
        )
    }
    return (
        <Link to={routes.apiDocsQuotas} className='card add-channel-card'>
            <div className='upgrade-plan-card-content'>
                <span className='text center-text'>{lang.ChannelLimitOver}</span>
                <div className='gap'/>
                <button className='button mini-button success-button'>Upgrade your plan</button>
            </div>

        </Link>
    )
}
