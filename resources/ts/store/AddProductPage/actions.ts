import { CRUDPageDropdownValue } from "../../components/Common/CRUDPage";
import { ADD_PRODUCT_PAGE_PLUS_PRODUCTS,ADD_PRODUCT_PAGE_DROP_PRODUCT,ADD_PRODUCT_PAGE_CHANGE_VALUES,AddProductPagePlusData,AddProductPageChangeData,AddProductPageDrop } from "./types";
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { coreLoading, coreAddSnack } from '../Core/actions';
import HttpService from '../../services/HttpService';

export const addProductPagePlusData = (name: string,price: number,category: CRUDPageDropdownValue): AddProductPagePlusData=>({
    type: ADD_PRODUCT_PAGE_PLUS_PRODUCTS,
    name,
    price,
    category
});

export const addProductPageChangeData = (name: string,price: number,category: CRUDPageDropdownValue,lastId:number): AddProductPageChangeData=>({
    type: ADD_PRODUCT_PAGE_CHANGE_VALUES,
    name,
    price,
    category,
    lastId
});

export const addProductPageDrop = (lastId: number): AddProductPageDrop=>({
    type: ADD_PRODUCT_PAGE_DROP_PRODUCT,
    lastId
});


export const addsaveData = (
    products:any,
    userToken: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(coreLoading(true));

    HttpService.addProduct.save(products,userToken).then(response=>{
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
