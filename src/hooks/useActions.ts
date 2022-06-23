import {useDispatch} from "react-redux";
import {actionCreators} from "../store/actionCreators"
import {bindActionCreators} from "@reduxjs/toolkit";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreators, dispatch)
}
