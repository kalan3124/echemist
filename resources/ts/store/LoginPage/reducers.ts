import { LoginPageState, LoginPageActions, LOGIN_PAGE_CHANGE_USERNAME, LOGIN_PAGE_CHANGE_PASSWORD, LOGIN_PAGE_CLEAR, LOGIN_PAGE_ERROR } from './types';

const initialState:LoginPageState ={
    errors:{},
    username: "",
    password: ""
}

export default (state=initialState, action:LoginPageActions): LoginPageState=>{
    switch (action.type) {
        case LOGIN_PAGE_CHANGE_USERNAME:
            return {
                ...state,
                username: action.username,
                errors: {}
            };
        case LOGIN_PAGE_CHANGE_PASSWORD:
            return {
                ...state,
                password: action.password,
                errors: {}
            };
        case LOGIN_PAGE_CLEAR:
            return {
                ...state,
            };
        case LOGIN_PAGE_ERROR:
            return {
                ...state,
                errors:{
                    main: action.main,
                    ...action.details
                }
            };
        default:
            return state;
    }
}
