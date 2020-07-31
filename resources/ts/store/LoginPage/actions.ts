import { LoginPageChangeUsername, LOGIN_PAGE_CHANGE_USERNAME, LoginPageChangePassword, LOGIN_PAGE_CHANGE_PASSWORD, LoginPageError, LOGIN_PAGE_ERROR, LOGIN_PAGE_CLEAR, LoginPageClear } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import HttpService from '../../services/HttpService';
import { coreChangeUser } from '../Core/actions';
import { USER_TOKEN_KEY } from '../../config';

export const loginPageChangeUsername = (username: string):LoginPageChangeUsername=>({
    type: LOGIN_PAGE_CHANGE_USERNAME,
    username
});

export const loginPageChangePassword = (password: string):LoginPageChangePassword=>({
    type: LOGIN_PAGE_CHANGE_PASSWORD,
    password
});

export const loginPageError = (main:string, details: {username: string, password: string}): LoginPageError=>({
    type: LOGIN_PAGE_ERROR,
    main,
    details
});

export const loginPageClear = ():LoginPageClear=>({
    type: LOGIN_PAGE_CLEAR
});

export const loginPageSubmit =  (
    username: string,
    password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    HttpService.user.login(username, password).then(response=>{
        if(response.success&& response.message){
            localStorage.setItem(USER_TOKEN_KEY, response.user.token);
            dispatch(loginPageClear());
            dispatch(coreChangeUser(response.user));
        } else if(response.message){
            dispatch(loginPageError(response.message,{
                ...response.details
            }));

        }
    })
}
