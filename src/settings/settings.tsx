import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {SettingsBlock} from "./settingsBlock";
import {MainBlock} from "./blocks/mainBlock";


export const menuTabs = (names: { main: string }) => [
    {
        name: names.main, parameterName: 'main',
        id: 1, block: () => ((isCurrent: boolean) => <MainBlock key='1' isCurrent={isCurrent}/>)
    },
]


export function MainSettings() {
    function changeTab(tab: string) {
        return function () {
            changeSearchParams({'tab': tab})
        }
    }

    const [searchParams, changeSearchParams] = useSearchParams()
    const tabs = menuTabs({main: ''})
    useEffect(() => {
        if (!searchParams.get('tab')) {
            changeTab(tabs[0].parameterName)()
        }
    })

    return (
        <div className='settings-without-menu'>
            <SettingsBlock currentTab={searchParams.get('tab')} tabs={tabs}/>
        </div>
    )
}