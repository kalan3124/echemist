import {
    LoggedUser,
    CoreChangeUser,
    CORE_CHANGE_USER,
    CoreLoading,
    CORE_LOADING,
    Snack,
    CoreAddSnack,
    CORE_ADD_SNACK,
    CoreRemoveSnack,
    CORE_REMOVE_SNACK
} from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { USER_TOKEN_KEY } from '../../config';
import HttpService from '../../services/HttpService';

export const coreChangeUser = (user?: LoggedUser): CoreChangeUser => ({
    type: CORE_CHANGE_USER,
    user
});

export const coreLoading = (loading: boolean): CoreLoading => ({
    type: CORE_LOADING,
    loading
});

export const coreAddSnack = (snack: Snack): CoreAddSnack => ({
    type: CORE_ADD_SNACK,
    snack
});

export const coreRemoveSnack = (snackKey: number): CoreRemoveSnack => ({
    type: CORE_REMOVE_SNACK,
    snackKey
});

export const coreFetchUser = (

): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    const token = localStorage.getItem(USER_TOKEN_KEY);

    if(token){
        dispatch(coreLoading(true));
        HttpService.user.status(token).then(response=>{
            dispatch(coreLoading(false));

            if(response.success){
                dispatch(coreChangeUser({...response.user, token}))
            } else {
                localStorage.removeItem(USER_TOKEN_KEY);
            }
        });
    }
}
