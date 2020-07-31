import { CRUDPageDropdownValue } from 'resources/ts/components/Common/CRUDPage';

export const EMAIL_LIST_PAGE_PLUS_EMAIL = 'EMAIL_LIST_PAGE_PLUS_EMAIL';
export const EMAIL_LIST_PAGE_CHANGE_VALUES = 'EMAIL_LIST_PAGE_CHANGE_VALUES';
export const EMAIL_LIST_PAGE_DROP_EMAIL = 'EMAIL_LIST_PAGE_DROP_EMAIL';

export interface EmailListPageState {
    name:string;
    email:string;
    roll:CRUDPageDropdownValue;
    emails:{
        [x:string]:Email
    };
    lastId:number;
}

export interface Email {
    name:string;
    email:string;
    roll:CRUDPageDropdownValue;
    lastId:number;
}

export interface EmailListPagePlusData {
    type: typeof EMAIL_LIST_PAGE_PLUS_EMAIL;
    name:string;
    email:string;
    roll:CRUDPageDropdownValue;
}

export interface EmailListPageChangeData {
    type: typeof EMAIL_LIST_PAGE_CHANGE_VALUES;
    name:string;
    email:string;
    roll:CRUDPageDropdownValue;
    lastId:number;
}

export interface EmailListPageDrop {
    type: typeof EMAIL_LIST_PAGE_DROP_EMAIL;
    lastId: number;
}



export type EmailListPageActions =
| EmailListPagePlusData
| EmailListPageChangeData
| EmailListPageDrop;
