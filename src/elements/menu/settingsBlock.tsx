
interface settingsBlockProps {
    currentTab: string | null
    tabs: { id: number, name: string, parameterName: string, block: () => JSX.Element }[]
}

function getCurrentTab(tabs: { id: number, name: string, parameterName: string, block: () => JSX.Element }[], tabName: string) {
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