import { CRUDPageDropdownValue } from "../../components/Common/CRUDPage";

export const PLACE_ORDER_PAGE_PLUS_ORDER = 'PLACE_ORDER_PAGE_PLUS_ORDER';
export const PLACE_ORDER_PAGE_CHANGE_VALUES = 'PLACE_ORDER_PAGE_CHANGE_VALUES';
export const PLACE_ORDER_PAGE_DROP_ORDER = 'PLACE_ORDER_PAGE_DROP_ORDER';
export const PLACE_ORDER_PAGE_GET_PRICE = 'PLACE_ORDER_PAGE_GET_PRICE';

export interface PlaceOrderPageState {
    product:CRUDPageDropdownValue;
    price:number;
    qty:number;
    amount:number;
    orders:{
        [x:string]:order
    };
    lastId:number;
    pro_price:number;
}

export interface order {
    product:CRUDPageDropdownValue;
    price:number;
    qty:number;
    amount:number;
    lastId:number;
}

export interface PlaceOrderPagePlusData {
    type: typeof PLACE_ORDER_PAGE_PLUS_ORDER;
    product:CRUDPageDropdownValue;
    price:number;
    qty:number;
    amount:number;
}

export interface PlaceOrderPageChangeData {
    type: typeof PLACE_ORDER_PAGE_CHANGE_VALUES;
    product:CRUDPageDropdownValue;
    price:number;
    qty:number;
    amount:number;
    lastId:number;
}

export interface PlaceOrderPageDrop {
    type: typeof PLACE_ORDER_PAGE_DROP_ORDER;
    lastId: number;
}

export interface PlaceOrderPageGetPrice {
    type: typeof PLACE_ORDER_PAGE_GET_PRICE;
    pro_price: number;
}



export type PlaceOrderPageActions =
| PlaceOrderPagePlusData
| PlaceOrderPageChangeData
| PlaceOrderPageDrop
|PlaceOrderPageGetPrice;
