import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "./settingsBlock";
import {NameBlock} from "./blocks/nameBlock";
import {EmailBlock} from "./blocks/emailBlock";
import {PasswordBlock} from "./blocks/passwordBlock";
import {useTypedSelector} from "../hooks/useTypedSelector";


export const menuTabs = (names: { changeName: string, changeEmail: string, changePassword: string }) => [
    {
        name: names.changeName, parameterName: 'changeName',
        id: 1, block: () => ((isCurrent: boolean) => <NameBlock key='1' isCurrent={isCurrent}/>)
    },
    {
        name: names.changeEmail, parameterName: 'changeEmail',
        id: 2, block: () => ((isCurrent: boolean) => <EmailBlock key='2' isCurrent={isCurrent}/>)
    },
    {
        name: names.changePassword, parameterName: 'changePassword',
        id: 3, block: () => ((isCurrent: boolean) => <PasswordBlock key='3' isCurrent={isCurrent}/>)
    }
]


export function UserSettings() {
    function changeTab(tab: string) {
        return function () {
            changeSearchParams({'tab': tab})
        }
    }

    const [searchParams, changeSearchParams] = useSearchParams()
    const {lang} = useTypedSelector(state => state.lang)
    const tabs = menuTabs({
        changeName: lang.UserSettingsMenuUsername,
        changeEmail: lang.UserSettingsMenuEmail, changePassword: lang.UserSettingsMenuPassword
    })

    useEffect(() => {
        if (!searchParams.get('tab')) {
            changeTab(tabs[0].parameterName)()
        }
    })

    return (
        <div className='settings-container'>
            <h1 className='header-1'>{lang.UserSettingsHeader}</h1>

            <div className='settings'>
                <Menu active={searchParams.get('tab')} onClick={changeTab} tabs={tabs}/>
                <SettingsBlock currentTab={searchParams.get('tab')} tabs={tabs}/>
            </div>
        </div>
    )
}