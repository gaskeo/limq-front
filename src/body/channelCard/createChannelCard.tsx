import {Plus} from "../../svg/plus";
import {routes} from "../../routes/routes";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";


interface CreateChannelCardProps {
    usedChannels: number
    availableChannels: number
}

export function CreateChannelCard({usedChannels, availableChannels}: CreateChannelCardProps) {
    const {lang} = useTypedSelector(state => state.lang)
    if (usedChannels < availableChannels) {
        return (
            <Link to={routes.addChannel} className='card add-channel-card'>
                <div className='flex-column height-100'>
                    <div className='add-channel-card-text width-100 center'>
                        <span className='channel-card-add-icon'><Plus/></span>
                        <h1 className='card-header'>{lang.CreateChannelButton}</h1>
                        <div className=''/>

                    </div>
                    <div className='text width-100 center'>
                        <span>
                        {lang.UsingNOfMChannels2R.replace('{N}', usedChannels.toString())
                            .replace('{M}', availableChannels.toString())}
                        </span>.&nbsp;
                        <a onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = routes.apiDocsQuotas
                        }} className='link' href={routes.apiDocsQuotas}>{lang.GetMore}</a>
                    </div>
                </div>
            </Link>
        )
    }
    return (
        <Link to={routes.apiDocsQuotas} className='card add-channel-card'>
            <div className='upgrade-plan-card-content'>
                <span className='text center-text'>{lang.ChannelLimitOver}</span>
                <div className='gap'/>
                <button className='button mini-button success-button'>{lang.UpgradeYourPlan}</button>
            </div>

        </Link>
    )
}
