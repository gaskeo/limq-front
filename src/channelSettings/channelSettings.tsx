import {useParams, useSearchParams} from "react-router-dom";
import {Menu} from "./menu";
import {SettingsBlock} from "./settingsBlock";
import "./channelSettings.css"

export function ChannelSettings() {
    function changeTab(tab: string) {
        return function () {
            changeSearchParams({'tab': tab})
        }
    }

    const {channelId} = useParams()
    const [searchParams, changeSearchParams] = useSearchParams()

    return (
        <div className='channel-settings'>
            <Menu active={searchParams.get('tab')} onClick={changeTab}/>
            <SettingsBlock channelId={channelId} currentTab={searchParams.get('tab')}/>
        </div>
    )
}