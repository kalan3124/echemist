import { PLACE_ORDER_PAGE_PLUS_ORDER,PLACE_ORDER_PAGE_CHANGE_VALUES,PLACE_ORDER_PAGE_DROP_ORDER,PLACE_ORDER_PAGE_GET_PRICE,PlaceOrderPagePlusData,PlaceOrderPageChangeData,PlaceOrderPageDrop,PlaceOrderPageGetPrice } from "./types";
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { coreLoading, coreAddSnack } from '../Core/actions';
import HttpService from '../../services/HttpService';
import { CRUDPageDropdownValue } from '../../components/Common/CRUDPage';

export const placeOrderPagePlusData = (product: CRUDPageDropdownValue,price: number,qty: number,amount: number): PlaceOrderPagePlusData=>({
    type: PLACE_ORDER_PAGE_PLUS_ORDER,
    product,
    price,
    qty,
    amount
});

export const placeOrderPageChangeData = (product: CRUDPageDropdownValue,price: number,qty: number,amount: number,lastId:number): PlaceOrderPageChangeData=>({
    type: PLACE_ORDER_PAGE_CHANGE_VALUES,
    product,
    price,
    qty,
    amount,
    lastId
});

export const placeOrderPageDrop = (lastId: number): PlaceOrderPageDrop=>({
    type: PLACE_ORDER_PAGE_DROP_ORDER,
    lastId
});

export const placeOrderPageGetPrice = (pro_price: number): PlaceOrderPageGetPrice=>({
    type: PLACE_ORDER_PAGE_GET_PRICE,
    pro_price
});


export const addsaveData = (
    orders:any,
    userToken: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(coreLoading(true));

    HttpService.order.save(orders,userToken).then(response=>{
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


export const getProductPrice = (
    id:number,
    userToken: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(coreLoading(true));

    HttpService.order.getPrice(id,userToken).then(response=>{
        if(response.success){
            dispatch(placeOrderPageGetPrice(response.price));
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
