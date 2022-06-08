const Theme = 'theme'
export enum availableThemes {
    light = 'light',
    dark = 'dark'
}

type availableThemesType = availableThemes.light | availableThemes.dark

export function initTheme() {
    const currentTheme = getTheme()
    setTheme(currentTheme)
}


export function getTheme(): availableThemesType {
    const currentTheme = localStorage.getItem(Theme)
    if (currentTheme === availableThemes.light || currentTheme === availableThemes.dark) {
        return currentTheme
    }

    setTheme(availableThemes.light)
    return availableThemes.light
}

export function setTheme(theme: string) {
    if (!(theme === availableThemes.light || theme === availableThemes.dark)) {
        theme = availableThemes.light
    }

    localStorage.setItem(Theme, theme)
    document.documentElement.setAttribute("data-theme", theme);
}

export function toggleTheme() {
    const currentTheme = localStorage.getItem(Theme)
    const newTheme = currentTheme === availableThemes.dark ? availableThemes.light : availableThemes.dark

    setTheme(newTheme)
}

window.onload = initTheme