interface menuProps {
    active: string | null,
    onClick: (tab: string) => () => void,
    tabs: { id: number, name: string, parameterName: string, block: () => (...parameters: any[]) => JSX.Element }[],
    menuClasses?: string,
    menuTabClasses?: string
}

export function Menu({active, menuClasses, menuTabClasses, tabs, onClick}: menuProps
) {
    const newMenuClasses = 'menu ' + menuClasses
    const newMenuTabClasses = 'menu-tab ' + menuTabClasses
    return (
        <div className={newMenuClasses}>
            {tabs.map(tab => <div key={tab.id}
                                  className={active === tab.parameterName ? newMenuTabClasses + ' active' : newMenuTabClasses}
                                  onClick={onClick(tab.parameterName)}>{tab.name}</div>)}
        </div>

    )
}