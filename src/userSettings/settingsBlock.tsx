import {menuTabs} from "./userSettings";

export function SettingsBlock(props: {currentTab: string | null}) {
    return <div className='settings-block'>
        {menuTabs.map(tab => tab.block()(tab.parameterName === props.currentTab))}
    </div>
}