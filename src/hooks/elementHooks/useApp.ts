import {useTypedSelector} from "../useTypedSelector";
import {useActions} from "../useActions";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {dataStates} from "../../store/reducers/consts";
import {FetchActionTypes} from "../../store/reducers/fetchReducer";
import {Redirect} from "../../routes/redirect";
import {availableLanguages, getLang, getLangDict} from "../../lang/getLang";
import {LangActionTypes} from "../../store/reducers/langReducer";

export function useApp() {
    function fetchUserFunc() {
        if (userDataState === dataStates.notRequested) {
            fetchUser()
        }
    }

    function fetchChannelsFunc() {
        if (channelsDataState === dataStates.notRequested && userDataState === dataStates.received && user.id) {
            fetchChannels()
        }
    }

    function checkRedirect() {
        if (path && path !== location.pathname) {
            dispatch({type: FetchActionTypes.deleteFetches})
            Redirect(path, navigate, location)
        }
    }

    function setLang() {
        if (langCode === availableLanguages.undefined) {
            getLangDict(getLang()).then(language => {
                dispatch({
                    type: LangActionTypes.setLang,
                    payload: {lang: language.langDict, langCode: getLang()}
                })
            })
        }
    }

    const {user, userDataState} = useTypedSelector(state => state.user)
    const {channelsDataState} = useTypedSelector(state => state.channels)
    const {path, pathId} = useTypedSelector(state => state.path)
    const {langCode} = useTypedSelector(state => state.lang)

    const {fetchUser, fetchChannels} = useActions()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const loaded = userDataState === dataStates.received || userDataState === dataStates.error

    return {pathId, fetchUserFunc, fetchChannelsFunc, checkRedirect, setLang, loaded}
}
