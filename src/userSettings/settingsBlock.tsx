import {menuTabs} from "./userSettings";

interface settingsBlockProps {
    currentTab: string | null
}

export function SettingsBlock({currentTab}: settingsBlockProps) {
    return <div className='settings-block'>
        {menuTabs.map(tab => tab.block()(tab.parameterName === currentTab))}
    </div>
}