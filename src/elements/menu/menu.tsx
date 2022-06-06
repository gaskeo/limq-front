export function Menu(props: {
    active: string | null,
    onClick: (tab: string) => () => void,
    tabs: { id: number, name: string, parameterName: string, block: () => (...parameters: any[]) => JSX.Element }[],
    menuClasses?: string,
    menuTabClasses?: string
}) {
    const menuClasses = 'menu ' + props.menuClasses
    const menuTabClasses = 'menu-tab ' + props.menuTabClasses
    return (
        <div className={menuClasses}>
            {props.tabs.map(tab => <div key={tab.id}
                                  className={props.active === tab.parameterName ? menuTabClasses + ' active' : menuTabClasses}
                                  onClick={props.onClick(tab.parameterName)}>{tab.name}</div>)}
        </div>

    )
}