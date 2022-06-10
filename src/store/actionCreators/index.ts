import * as userActionCreators from "./user"
import * as channelActionCreators from "./channel"
import * as keyActionCreators from "./key"
import * as mixinActionCreators from "./mixin"

export const actionCreators = {
    ...userActionCreators,
    ...channelActionCreators,
    ...keyActionCreators,
    ...mixinActionCreators
}