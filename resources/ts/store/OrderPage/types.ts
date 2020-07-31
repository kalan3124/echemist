import { CRUDPageDropdownValue } from 'resources/ts/components/Common/CRUDPage';

export const ORDER_PAGE_CHANGE_PROVINCE = 'ORDER_PAGE_CHANGE_PROVINCE';
export const ORDER_PAGE_CHANGE_DISTRICT = 'ORDER_PAGE_CHANGE_DISTRICT';
export const ORDER_PAGE_CHANGE_CITY = 'ORDER_PAGE_CHANGE_CITY';
export const ORDER_PAGE_CHANGE_DEALER_NAME = 'ORDER_PAGE_CHANGE_DEALER_NAME';
export const ORDER_PAGE_LOAD_RESULTS = 'ORDER_PAGE_LOAD_RESULTS';
export const ORDER_PAGE_CHANGE_PAGE = 'ORDER_PAGE_CHANGE_PAGE';
export const ORDER_PAGE_CHANGE_PER_PAGE = 'ORDER_PAGE_CHANGE_PER_PAGE';
export const ORDER_PAGE_VIEW_ORDER = 'ORDER_PAGE_VIEW_ORDER';
export const ORDER_PAGE_LOAD_ORDER = 'ORDER_PAGE_LOAD_ORDER';

export interface OrderPageState {
    province?: CRUDPageDropdownValue;
    district?: CRUDPageDropdownValue;
    city?: CRUDPageDropdownValue;
    dealerName: string;
    results: OrderPageRow[];
    page: number;
    perPage: number;
    viewOrder: boolean;
    order?: Order;
    count: number;
}

export interface OrderPageRow {
    provinceName: string;
    districtName: string;
    cityName: string;
    shopName: string;
    orderId: number;
    orderNumber: string;
    createdAt: string;
}

export interface Product {
    name: string;
    id: number;
    code: string;
    price: number;
}

export interface OrderLine {
    product: Product;
    qty: number;
}

export interface Order {
    number: string;
    time: string;
    lines: OrderLine[];
}

export interface OrderPageChangeProvince {
    type: typeof ORDER_PAGE_CHANGE_PROVINCE;
    province?: CRUDPageDropdownValue;
}

export interface OrderPageChangeDistrict {
    type: typeof ORDER_PAGE_CHANGE_DISTRICT;
    district?: CRUDPageDropdownValue;
}

export interface OrderPageChangeCity {
    type: typeof ORDER_PAGE_CHANGE_CITY;
    city?: CRUDPageDropdownValue;
}

export interface OrderPageChangeDealerName {
    type: typeof ORDER_PAGE_CHANGE_DEALER_NAME;
    dealerName: string;
}

export interface OrderPageLoadResults {
    type: typeof ORDER_PAGE_LOAD_RESULTS;
    results: OrderPageRow[];
    count: number;
}

export interface OrderPageChangePage {
    type: typeof ORDER_PAGE_CHANGE_PAGE;
    page: number;
}

export interface OrderPageChangePerPage {
    type: typeof ORDER_PAGE_CHANGE_PER_PAGE;
    perPage: number;
}

export interface OrderPageViewOrder {
    type: typeof ORDER_PAGE_VIEW_ORDER;
    view: boolean;
}

export interface OrderPageLoadOrder {
    type: typeof ORDER_PAGE_LOAD_ORDER;
    order?: Order;
}

export type OrderPageActions =
| OrderPageChangeProvince
| OrderPageChangeDistrict
| OrderPageChangeCity
| OrderPageChangeDealerName
| OrderPageLoadResults
| OrderPageChangePage
| OrderPageChangePerPage
| OrderPageViewOrder
| OrderPageLoadOrder;
