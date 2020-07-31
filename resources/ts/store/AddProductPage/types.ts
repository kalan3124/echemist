import { CRUDPageDropdownValue } from 'resources/ts/components/Common/CRUDPage';

export const ADD_PRODUCT_PAGE_PLUS_PRODUCTS = 'ADD_PRODUCT_PAGE_PLUS_PRODUCTS';
export const ADD_PRODUCT_PAGE_CHANGE_VALUES = 'ADD_PRODUCT_PAGE_CHANGE_VALUES';
export const ADD_PRODUCT_PAGE_DROP_PRODUCT = 'ADD_PRODUCT_PAGE_DROP_PRODUCT';

export interface AddProductPageState {
    name:string;
    price:number;
    category:CRUDPageDropdownValue;
    products:{
        [x:string]:Product
    };
    lastId:number;
}

export interface Product {
    name: string;
    price: number;
    category: CRUDPageDropdownValue;
    lastId:number;
}

export interface AddProductPagePlusData {
    type: typeof ADD_PRODUCT_PAGE_PLUS_PRODUCTS;
    name: string;
    price: number;
    category: CRUDPageDropdownValue;
}

export interface AddProductPageChangeData {
    type: typeof ADD_PRODUCT_PAGE_CHANGE_VALUES;
    name: string;
    price: number;
    category: CRUDPageDropdownValue;
    lastId:number;
}

export interface AddProductPageDrop {
    type: typeof ADD_PRODUCT_PAGE_DROP_PRODUCT;
    lastId: number;
}



export type AddProductPageActions =
| AddProductPagePlusData
|AddProductPageChangeData
|AddProductPageDrop;
