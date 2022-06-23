import {TypedUseSelectorHook, useSelector} from "react-redux";
import {rootState} from "../store/reducers";

export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector
