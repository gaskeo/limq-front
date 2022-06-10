export enum ApiRoutes {
    Login = '/do/login',
    Register = '/do/register',
    GetUser = '/do/get_user',
    RenameUser = '/do/rename_user',
    ChangeEmail = '/do/change_email',
    ChangePassword = '/do/change_password',
    Logout = '/do/logout',

    CreateChannel = '/do/create_channel',
    GetChannels = '/do/get_channels',
    RenameChannel = '/do/rename_channel',

    Grant = '/do/grant',
    GetKeys = '/do/get_keys',
    ToggleKey = '/do/toggle_key',
    DeleteKey = '/do/delete_key',

    GetMixins = '/do/get_mixins',
    CreateMixin = '/do/create_mixin',
    RestrictMixin = '/do/restrict_mixin'
}