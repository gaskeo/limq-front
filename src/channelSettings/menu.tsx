import {MainSettingsBlock} from "./blocks/mainSettingsBlock";
import {KeysSettingsBlock} from "./blocks/keysSettingsBlock";
import {MixinsSettingsBlock} from "./blocks/mixinsSettingsBlock";
import {channel} from "../store/reducers/channelsReducer";

export const tabs = [
    {name: 'Main settings', parameterName: 'mainSettings',
        id: 1, block: () => ((isCurrent: boolean, channel: channel | undefined) => <MainSettingsBlock key='1' isCurrent={isCurrent} channel={channel}/>)},
    {name: 'Keys', parameterName: 'keys',
        id: 2, block: () => ((isCurrent: boolean, channel: channel | undefined) => <KeysSettingsBlock key='2' isCurrent={isCurrent} channel={channel}/>)},
    {name: 'Mixins', parameterName: 'mixins',
        id: 3, block: () => ((isCurrent: boolean, channel: channel | undefined) => <MixinsSettingsBlock key='3' isCurrent={isCurrent} channel={channel}/>)}
]


export function Menu(props: { active: string | null, onClick: (tab: string) => () => void }) {
    return (
        <div className='menu'>
            {tabs.map(tab => <div key={tab.id}
                                  className={props.active === tab.parameterName ? 'menu-tab active' : 'menu-tab'}
                                  onClick={props.onClick(tab.parameterName)}>{tab.name}</div>)}
        </div>

    )
}