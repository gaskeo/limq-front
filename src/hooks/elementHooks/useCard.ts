import {Channel} from "../../store/reducers/channelsReducer";
import {useTypedSelector} from "../useTypedSelector";
import {Key} from "../../store/reducers/keysReducer";
import {useActions} from "../useActions";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {dataStates} from "../../store/reducers/consts";
import {useParams} from "react-router-dom";
import {MixinTypeStates} from "../../store/reducers/mixinsReducer";
import {RefObject} from "react";

export function useChannelCard(channel: Channel) {
    const {lang} = useTypedSelector(state => state.lang)
    const activeChannel = Boolean(channel['write_keys'].active || channel['read_keys'].active)
    return {lang, activeChannel}
}

export function useKeyCard(channelKey: Key, ref: RefObject<HTMLDivElement> | null) {
    function copyCode() {
        navigator.clipboard.writeText(channelKey.key)
        }
    function toggleActiveKey() {
        fetchToggleKey(channelKey)
    }

    function deleteKey() {
        if (window.confirm(lang.DeleteKeyConfirmQuestion)) {
            if (ref) {
                ref.current?.classList.add('hide-card')
            }
            setTimeout(() => fetchDeleteKey(channelKey.channel, channelKey), 300)

        }
    }

    const {fetchDeleteKey, fetchToggleKey} = useActions()

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const toggleKey = states[ApiRoutes.ToggleKey + channelKey.key]
    const perm = channelKey.read ? lang.KeyTypeReadForm : lang.KeyTypeWriteForm

    const requested = toggleKey && toggleKey.dataState === dataStates.requested

    return {deleteKey, toggleActiveKey, perm, requested, lang, copyCode}
}

export function useMixinCard(channel: Channel, mixinType: MixinTypeStates, ref: RefObject<HTMLDivElement> | null) {
    function deleteMixin() {
        if (channelId && window.confirm(lang.DeleteMixinConfirmQuestion)) {
            if (ref) {
                ref.current?.classList.add('hide-card')
            }
            setTimeout(() => fetchRestrictMixin(channelId, channel['channel_id'], mixinType), 300)
        }
    }

    const {channelId} = useParams()
    const {lang} = useTypedSelector(state => state.lang)
    const {fetchRestrictMixin} = useActions()
    return {deleteMixin, channelId, lang}
}
