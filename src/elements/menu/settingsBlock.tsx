import {menuTab} from "./menu";

interface settingsBlockProps {
    currentTab: string | null
    tabs: menuTab[]
}

function getCurrentTab(tabs: menuTab[], tabName: string) {
    const currentTab = tabs.filter(tab => tab.parameterName === tabName)[0]
    if (!currentTab) {
        return tabs[0].block()
    }
    return currentTab.block()
}


export function SettingsBlock({currentTab, tabs}: settingsBlockProps) {
    return <div className='settings-block'>
        {getCurrentTab(tabs, currentTab || '')}
    </div>
}