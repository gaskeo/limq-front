import {LangStruct} from "../langStruct";

export const langDict: LangStruct = {
    RegisterChannelsHeader: "Channels",
    ChannelCardActive: "Active",
    ChannelCardInactive: "Inactive",
    ChannelCardRead: "R",
    ChannelCardWrite: "W",
    ChannelCardAdd: "Add Channel",
    SomethingWentWrongError: "Something went wrong",
    ChannelSettingsMenuMainSettings: "Main settings",
    ChannelSettingsMenuKeys: "Keys",
    ChannelSettingsMenuMixins: "Mixins",
    MixinsIn: "In",
    MixinsOut: "Out",
    WrongKeyError: "Wrong key",
    ReadKeyForm: "Read key",
    CreateMixinButton: "Create",
    YourMixinsHeader: "Your mixins",
    ChannelNameForm: "Channel name",
    ChannelNameTooLong: "Channel name is too long",
    RenameChannelButton: "Rename",
    KeyNameTooLongError: "Key name is too long",
    KeyNameForm: "Name",
    KeyTypeReadForm: "Listen the queue for a new messages",
    KeyTypeWriteForm: "Publish messages to the queue",
    KeyAllowInfoForm: "Allow info",
    KeyAllowMixinsForm: "Allow mixins",
    CreateKeyButton: "Create",
    Paused: "paused",
    PauseKeyButton: "Pause",
    ResumeKeyButton: "Resume",
    DeleteKeyButton: "Delete",
    DeleteMixinConfirmQuestion: "Are you sure to delete mixin?",
    DeleteMixinButton: "Delete",
    NoMixinInCard: "No incoming mixin channels",
    NoMixinOutCard: "No outgoing mixin channels",
    CreateChannelButton: "Create channel",
    LoginButton: "Login",
    ExitButton: "Exit",
    SettingsButton: "Settings",
    PasswordTooShortError: "Password is too short",
    InvalidEmailError: "Invalid email address",
    EmailForm: "Email",
    PasswordForm: "Password",
    RememberMeForm: "Remember me",
    PasswordsNotMatchError: "Passwords don't match",
    UsernameTooLongError: "Username is too long",
    UsernameForm: "Username",
    PasswordAgainForm: "Password again",
    RegisterButton: "Register",
    UserSettingsMenuUsername: "Change username",
    UserSettingsMenuEmail: "Change email",
    UserSettingsMenuPassword: "Change password",
    UserSettingsMenuQuota: "My plan",
    ChangeEmailButton: "Change email",
    RenameUserButton: "Rename",
    OldPasswordForm: "Old password",
    NewPasswordForm: "New password",
    NewPasswordAgainForm: "New password again",
    ChangePasswordButton: "Change password",
    CreateKeyHeader: "Create key",
    RenameChannelHeader: "Rename channel",
    CreateMixinHeader: "Create mixin",
    YourKeysHeader: 'Your keys',
    DeleteKeyConfirmQuestion: "Are you sure to delete this key?",
    RenameUserHeader: 'Rename user',
    ChangeEmailHeader: 'Change email',
    ChangePasswordHeader: 'Change password',
    MainSettings: 'Settings',
    ChangeLanguage: 'Language',
    ChangeTheme: 'Theme',
    DarkTheme: 'Dark',
    LightTheme: 'Light',
    SystemTheme: 'System',
    English: 'English',
    Russian: 'Русский',

    EnterEmail: 'Enter Email',
    EnterPassword: 'Enter password',
    EnterUsername: 'Enter username',
    EnterPasswordAgain: 'Enter password again',
    EnterOldPassword: 'Enter old password',
    EnterNewPassword: 'Enter new password',
    EnterNewPasswordAgain: 'Enter new password again',
    EnterKeyName: 'Enter key name',
    EnterReadKey: 'Enter read key',
    EnterChannelName: 'Enter channel name',
    LoginHeader: 'Sign in with email',
    RegisterHeader: 'Sign up with email',
    UserSettingsHeader: 'User settings',
    ChannelSettingsHeader: 'Channel settings',
    CreateChannelHeader: 'Create channel',

    ChannelNameError: 'Bad channel name',
    ChannelNotExistError: "Channel doesn't exist",
    NotChannelOwnerError: "You do not have access to this channel",

    KeyNameError: 'Bad key name',
    KeyPermissionsError: 'Bad permissions',
    BadChannelIdError: 'Bad channel ID',
    BadKeyError: 'Bad key',

    AlreadyMixedError: 'Channels are already mixed',
    BadThreadError: 'Bad thread',
    BadKeyTypeError: 'Bad key type',
    CircleMixinError: "You can't create circular mixins recursively referencing one another",
    SelfMixinError: "You can't create mixin referencing the same channel",

    EmailError: 'Bad Email',
    UsernameError: 'Bad username',
    PasswordError: 'Bad password',
    EmailExistError: 'User with this e-mail already exist',
    BadUserError: 'Bad user',
    UnknownError: 'Unknown error',
    TooManyRequests: 'Too many requests. Try again later',

    GreetingHeader: 'Introducing LiMQ features',
    GreetingText: 'LiMQ is a powerful SaaS cloud message broker',
    LearnMoreButton: 'Learn more',
    TrySandbox: 'Try out our web sandbox',


    Free: 'free',
    Pro: 'Pro',

    FreeMenu: 'free',
    ProMenu: 'Pro',

    YourPlanTextR: 'Тариф вашего аккаунта — {planName}. Про квоты и ограничения можете прочитать {docs}. ' +
        'Перейти на Pro версию можно по ссылке в источнике.',
    InDocsLink: 'в документации'
}
