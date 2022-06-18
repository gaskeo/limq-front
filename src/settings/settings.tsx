import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {SettingsBlock} from "../elements/menu/settingsBlock";
import {MainBlock} from "./blocks/mainBlock";


export const menuTabs = (names: { main: string }) => [
    {
        name: names.main, parameterName: 'main',
        id: 1, block: () => <MainBlock key='1'/>
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