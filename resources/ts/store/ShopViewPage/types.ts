import { CRUDPageDropdownValue } from '../../components/Common/CRUDPage';

export const SHOP_VIEW_PAGE_CHANGE_PROVINCE = 'SHOP_VIEW_PAGE_CHANGE_PROVINCE';
export const SHOP_VIEW_PAGE_CHANGE_DISTRICT = 'SHOP_VIEW_PAGE_CHANGE_DISTRICT';
export const SHOP_VIEW_PAGE_CHANGE_CITY = 'SHOP_VIEW_PAGE_CHANGE_CITY';
export const SHOP_VIEW_PAGE_CHANGE_DEALER_NAME = 'SHOP_VIEW_PAGE_CHANGE_DEALER_NAME';
export const SHOP_VIEW_PAGE_LOAD_RESULTS = 'SHOP_VIEW_PAGE_LOAD_RESULTS';
export const SHOP_VIEW_PAGE_CHANGE_PAGE = 'SHOP_VIEW_PAGE_CHANGE_PAGE';
export const SHOP_VIEW_PAGE_CHANGE_PER_PAGE = 'SHOP_VIEW_PAGE_CHANGE_PER_PAGE';
export const SHOP_VIEW_PAGE_VIEW_ORDER = 'SHOP_VIEW_PAGE_VIEW_ORDER';
export const SHOP_VIEW_PAGE_LOAD_ORDER = 'SHOP_VIEW_PAGE_LOAD_ORDER';

export interface ShopViewPageState {
    province?: CRUDPageDropdownValue;
    district?: CRUDPageDropdownValue;
    city?: CRUDPageDropdownValue;
    dealerName: string;
    results: ShopViewPageRow[];
    page: number;
    perPage: number;
    viewOrder: boolean;
    // order?: Order;
    count: number;
}

export interface ShopViewPageRow {
    provinceName: string;
    districtName: string;
    cityName: string;
    shopName: string;
    address: string
    createdAt: string;
}


export interface ShopViewPageChangeProvince {
    type: typeof SHOP_VIEW_PAGE_CHANGE_PROVINCE;
    province?: CRUDPageDropdownValue;
}

export interface ShopViewPageChangeDistrict {
    type: typeof SHOP_VIEW_PAGE_CHANGE_DISTRICT;
    district?: CRUDPageDropdownValue;
}

export interface ShopViewPageChangeCity {
    type: typeof SHOP_VIEW_PAGE_CHANGE_CITY;
    city?: CRUDPageDropdownValue;
}

export interface ShopViewPageChangeDealerName {
    type: typeof SHOP_VIEW_PAGE_CHANGE_DEALER_NAME;
    dealerName: string;
}

export interface ShopViewPageLoadResults {
    type: typeof SHOP_VIEW_PAGE_LOAD_RESULTS;
    results: ShopViewPageRow[];
    count: number;
}

export interface ShopViewPageChangePage {
    type: typeof SHOP_VIEW_PAGE_CHANGE_PAGE;
    page: number;
}

export interface ShopViewPageChangePerPage {
    type: typeof SHOP_VIEW_PAGE_CHANGE_PER_PAGE;
    perPage: number;
}

export interface ShopViewPageViewOrder {
    type: typeof SHOP_VIEW_PAGE_VIEW_ORDER;
    view: boolean;
}

export type ShopViewPageActions =
| ShopViewPageChangeProvince
| ShopViewPageChangeDistrict
| ShopViewPageChangeCity
| ShopViewPageChangeDealerName
| ShopViewPageLoadResults
| ShopViewPageChangePage
| ShopViewPageChangePerPage
| ShopViewPageViewOrder;
