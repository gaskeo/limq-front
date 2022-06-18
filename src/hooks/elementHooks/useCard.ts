import {Channel} from "../../store/reducers/channelsReducer";
import {useTypedSelector} from "../useTypedSelector";
import {Key} from "../../store/reducers/keysReducer";
import {useActions} from "../useActions";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {dataStates} from "../../store/reducers/consts";
import {useParams} from "react-router-dom";
import {MixinTypeStates} from "../../store/reducers/mixinsReducer";

export function useChannelCard(channel: Channel) {
    const {lang} = useTypedSelector(state => state.lang)
    const activeChannel = Boolean(channel['write_keys'].active || channel['read_keys'].active)
    return {lang, activeChannel}
}

export function useKeyCard(channelKey: Key) {
    function toggleActiveKey() {
        fetchToggleKey(channelKey)
    }

    function deleteKey() {
        if (window.confirm(lang.DeleteKeyConfirmQuestion)) {
            fetchDeleteKey(channelKey.channel, channelKey)
        }
    }

    const {fetchDeleteKey, fetchToggleKey} = useActions()

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const toggleKey = states[ApiRoutes.ToggleKey + channelKey.key]
    const perm = channelKey.read ? lang.KeyTypeReadForm : lang.KeyTypeWriteForm

    const requested = toggleKey && toggleKey.dataState === dataStates.requested

    return {deleteKey, toggleActiveKey, perm, requested, lang}
}

export function useMixinCard (channel: Channel, mixinType: MixinTypeStates) {
    function deleteMixin() {
        if (channelId && window.confirm(lang.DeleteMixinConfirmQuestion)) {
            fetchRestrictMixin(channelId, channel['channel_id'], mixinType)
        }
    }

    const {channelId} = useParams()
    const {lang} = useTypedSelector(state => state.lang)
    const {fetchRestrictMixin} = useActions()
    return {deleteMixin, channelId, lang}
}