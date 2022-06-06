import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "./settingsBlock";
import {NameBlock} from "./blocks/nameBlock";
import {EmailBlock} from "./blocks/emailBlock";
import {PasswordBlock} from "./blocks/passwordBlock";


export const menuTabs = [
    {name: 'Change name', parameterName: 'changeName',
        id: 1, block: () => ((isCurrent: boolean) => <NameBlock key='1' isCurrent={isCurrent}/>)},
    {name: 'Change email', parameterName: 'changeEmail',
        id: 2, block: () => ((isCurrent: boolean) => <EmailBlock key='2' isCurrent={isCurrent}/>)},
    {name: 'Change password', parameterName: 'changePassword',
        id: 3, block: () => ((isCurrent: boolean) => <PasswordBlock key='3' isCurrent={isCurrent}/>)}
]


export function UserSettings() {
    function changeTab(tab: string) {
        return function () {
            changeSearchParams({'tab': tab})
        }
    }

    const [searchParams, changeSearchParams] = useSearchParams()

    useEffect(() => {
        if (!searchParams.get('tab')) {
            changeTab(menuTabs[0].parameterName)()
        }
    }, [])

    return (
        <div className='settings'>
            <Menu active={searchParams.get('tab')} onClick={changeTab} tabs={menuTabs}/>
            <SettingsBlock currentTab={searchParams.get('tab')}/>
        </div>
    )
}