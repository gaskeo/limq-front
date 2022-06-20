import {defaultLangValue, LangStruct} from "./langStruct";

interface codesStruct {
    [code: string]: string
}

const codes: codesStruct = {
    "700": defaultLangValue.ChannelNameError,
    "701": defaultLangValue.ChannelNotExistError,
    "702": defaultLangValue.NotChannelOwnerError,

    "800": defaultLangValue.KeyNameError,
    "801": defaultLangValue.KeyPermissionsError,
    "802": defaultLangValue.BadChannelIdError,
    "803": defaultLangValue.BadKeyError,

    "900": defaultLangValue.AlreadyMixedError,
    "901": defaultLangValue.BadThreadError,
    "902": defaultLangValue.BadKeyTypeError,
    "903": defaultLangValue.CircleMixinError,
    "904": defaultLangValue.SelfMixinError,

    "1000": defaultLangValue.EmailError,
    "1001": defaultLangValue.UsernameError,
    "1002": defaultLangValue.PasswordError,
    "1003": defaultLangValue.EmailExistError,
    "1004": defaultLangValue.BadUserError,
    '-1': defaultLangValue.UnknownError
}


export function getErrorDescription(lang: LangStruct, code: string) {
    if (!Object.keys(codes).includes(code)) {
        return lang[codes["-1"] as keyof LangStruct]
    }
    return lang[codes[code] as keyof LangStruct]
}