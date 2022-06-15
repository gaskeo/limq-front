export enum availableLanguages {
    undefined = 'undefined',
    ru = 'ru',
    en = 'en'
}

export type availableLanguagesType = availableLanguages.ru | availableLanguages.en | availableLanguages.undefined


export function getLang(): availableLanguagesType {
    const storageLang = localStorage.getItem('lang') as availableLanguagesType

    if (storageLang && storageLang !== availableLanguages.undefined) {
        return storageLang
    }

    const language = navigator.language as availableLanguages
    if (Object.values(availableLanguages).includes(language)) {
        localStorage.setItem('lang', language)
        return language
    }
    localStorage.setItem('lang', availableLanguages.en)
    return availableLanguages.en
}

export function setLang(language: availableLanguagesType) {
    localStorage.setItem('lang', language)
}

export async function getLangDict(language: availableLanguagesType): Promise<typeof import("./languages/en")> {
    let lang;

    switch (language) {
        case availableLanguages.en:
            lang = await import("./languages/en")
            return lang
        case availableLanguages.ru:
            lang = await import("./languages/ru")
            return lang
        default:
            lang = await import("./languages/en")
            return lang
    }
}