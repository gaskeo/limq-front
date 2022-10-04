export type menuInner = string | JSX.Element

export type menuTab = { id: number, name: menuInner, parameterName: string, block: () => JSX.Element }


interface menuProps {
    active: string | null,
    onClick: (tab: string) => () => void,
    tabs: menuTab[],
    menuClasses?: string,
    menuTabClasses?: string
}

export function Menu({active, menuClasses, menuTabClasses, tabs, onClick}: menuProps
) {
    const newMenuClasses = 'menu ' + menuClasses
    const newMenuTabClasses = 'menu-tab ' + menuTabClasses

    return (
        <div className={newMenuClasses}>
            {tabs.map((tab, index) => <div key={tab.id}
                                  className={active === tab.parameterName || (!active?.length && index === 0) ? newMenuTabClasses + ' active' : newMenuTabClasses}
                                  onClick={onClick(tab.parameterName)}>{tab.name}</div>)}
        </div>

    )
}
