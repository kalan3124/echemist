import { CRUDPageDropdownValue } from "../../components/Common/CRUDPage";
import { EMAIL_LIST_PAGE_PLUS_EMAIL,EMAIL_LIST_PAGE_CHANGE_VALUES,EMAIL_LIST_PAGE_DROP_EMAIL,EmailListPagePlusData,EmailListPageChangeData,EmailListPageDrop } from "./types";
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { coreLoading, coreAddSnack } from '../Core/actions';
import HttpService from '../../services/HttpService';

export const emailListPagePlusData = (name: string,email: string,roll: CRUDPageDropdownValue): EmailListPagePlusData=>({
    type: EMAIL_LIST_PAGE_PLUS_EMAIL,
    name,
    email,
    roll
});

export const emailListPageChangeData = (name: string,email: string,roll:CRUDPageDropdownValue,lastId:number): EmailListPageChangeData=>({
    type: EMAIL_LIST_PAGE_CHANGE_VALUES,
    name,
    email,
    roll,
    lastId
});

export const emailListPageDrop = (lastId: number): EmailListPageDrop=>({
    type: EMAIL_LIST_PAGE_DROP_EMAIL,
    lastId
});


export const addsaveData = (
    emails:any,
    userToken: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(coreLoading(true));

    HttpService.addEmail.save(emails,userToken).then(response=>{
        if(response.success){
            dispatch(coreAddSnack({
                type: "success",
                title: "Success",
                body: response.message
            }));
            dispatch(coreLoading(false));
        } else {
            dispatch(coreAddSnack({
                type: "error",
                title: "Search Error!",
                body: response.message
            }));
        }
    })
}
