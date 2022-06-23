const Theme = 'theme'
export enum availableThemes {
    light = 'light',
    dark = 'dark',
    system = 'system'
}

export type availableThemesType = availableThemes.light | availableThemes.dark | availableThemes.system

export function initTheme() {
    const currentTheme = getTheme()
    setTheme(currentTheme)
}


export function getTheme(): availableThemesType {
    const currentTheme = localStorage.getItem(Theme)
    if (currentTheme === availableThemes.light || currentTheme === availableThemes.dark || currentTheme === availableThemes.system) {
        return currentTheme
    }

    setTheme(availableThemes.system)
    return availableThemes.light
}

export function setTheme(theme: string) {
    let dataTheme;
    if (!(theme === availableThemes.light || theme === availableThemes.dark)) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            dataTheme = availableThemes.dark
        } else {
            dataTheme = availableThemes.light
        }
    } else {
        dataTheme = theme
    }

    localStorage.setItem(Theme, theme)
    document.documentElement.setAttribute("data-theme", dataTheme);
}

export function toggleTheme() {
    const currentTheme = localStorage.getItem(Theme)
    const newTheme = currentTheme === availableThemes.dark ? availableThemes.light : availableThemes.dark

    setTheme(newTheme)
}

window.onload = initTheme
