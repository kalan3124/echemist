export const LOGIN_PAGE_CHANGE_USERNAME = 'LOGIN_PAGE_CHANGE_USERNAME';
export const LOGIN_PAGE_CHANGE_PASSWORD = 'LOGIN_PAGE_CHANGE_PASSWORD';
export const LOGIN_PAGE_ERROR = 'LOGIN_PAGE_ERROR';
export const LOGIN_PAGE_CLEAR = 'LOGIN_PAGE_CLEAR';

export interface LoginPageErrors {
    username?: string;
    password?: string;
    main?: string;
}

export interface LoginPageState {
    username: string;
    password: string;
    errors: LoginPageErrors;
}

export interface LoginPageChangeUsername {
    type: typeof LOGIN_PAGE_CHANGE_USERNAME;
    username: string;
}

export interface LoginPageChangePassword {
    type: typeof LOGIN_PAGE_CHANGE_PASSWORD;
    password: string;
}

export interface LoginPageError {
    type: typeof LOGIN_PAGE_ERROR;
    main: string;
    details: {
        username?: string;
        password?: string;
    }
}

export interface LoginPageClear {
    type: typeof LOGIN_PAGE_CLEAR;
}

export type LoginPageActions =
| LoginPageChangeUsername
| LoginPageChangePassword
| LoginPageError
| LoginPageClear;
