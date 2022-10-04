import {dataStates} from "./consts";

export interface Quota {
    name: string | null,
    buffered_data_persistency: number | null,
    bufferization: boolean | null,
    end_to_end_data_encryption: boolean | null,
    max_bufferred_message_count: number | null,
    max_channel_count: number | null,
    max_message_size: number | null
}

interface quotaState {
    quota: Quota,
    quotaDataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error

}

const defaultState: quotaState = {
    quota: {name: null,
        buffered_data_persistency: null,
        bufferization: null,
        end_to_end_data_encryption: null,
        max_bufferred_message_count: null,
        max_channel_count: null,
        max_message_size: null},
    quotaDataState: dataStates.notRequested
}

export enum QuotaActionTypes {
    setQuota = 'setQuota',
    setQuotaDataState = 'setQuotaDataState',
    deleteQuota = 'deleteQuota'
}

interface setQuotaAction {
    type: QuotaActionTypes.setQuota,
    payload: Quota
}

interface setQuotaDataAction {
    type: QuotaActionTypes.setQuotaDataState,
    payload: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

interface deleteQuota {
    type: QuotaActionTypes.deleteQuota
}

export type quotaAction = setQuotaAction | setQuotaDataAction | deleteQuota

export function QuotaReducer(state: quotaState = defaultState, action: quotaAction):quotaState {
    switch (action.type) {
        case QuotaActionTypes.setQuota:
            return {...state, quota: action.payload}
        case QuotaActionTypes.setQuotaDataState:
            return {...state, quotaDataState: action.payload}
        case QuotaActionTypes.deleteQuota:
            return {...state, ...defaultState}
        default:
            return state
    }
}
