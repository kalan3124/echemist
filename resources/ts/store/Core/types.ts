export const CORE_CHANGE_USER = 'CORE_CHANGE_USER';
export const CORE_LOADING = 'CORE_LOADING';
export const CORE_ADD_SNACK = 'CORE_ADD_SNACK';
export const CORE_REMOVE_SNACK = 'CORE_REMOVE_SNACK';

export interface Snack {
    title: string;
    body?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    time?: number;
    timeout?: number;
    type: "error" | "success" | "info" | "confirm" | "warning";
}

export interface LoggedUser {
    id: number;
    name: string;
    avatar: string;
    token: string;
    typeId:number
}

export interface CoreState {
    user?: LoggedUser;
    snacks: Snack[];
    loading: boolean;
}

export interface CoreChangeUser {
    type: typeof CORE_CHANGE_USER;
    user?: LoggedUser;
}

export interface CoreLoading {
    type: typeof CORE_LOADING;
    loading: boolean;
}

export interface CoreAddSnack {
    type: typeof CORE_ADD_SNACK;
    snack: Snack;
}

export interface CoreRemoveSnack {
    type: typeof CORE_REMOVE_SNACK;
    snackKey: number;
}

export type CoreActionTypes =
| CoreChangeUser
| CoreLoading
| CoreAddSnack
| CoreRemoveSnack;
