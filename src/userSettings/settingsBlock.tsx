interface settingsBlockProps {
    currentTab: string | null
    tabs: { id: number, name: string, parameterName: string, block: () => (...parameters: any[]) => JSX.Element }[],
}

export function SettingsBlock({currentTab, tabs}: settingsBlockProps) {
    return <div className='settings-block'>
        {tabs.map(tab => tab.block()(tab.parameterName === currentTab))}
    </div>
}