import { ShopViewPageState, ShopViewPageActions, SHOP_VIEW_PAGE_CHANGE_PROVINCE, SHOP_VIEW_PAGE_CHANGE_DISTRICT, SHOP_VIEW_PAGE_CHANGE_CITY, SHOP_VIEW_PAGE_CHANGE_DEALER_NAME, SHOP_VIEW_PAGE_LOAD_RESULTS, SHOP_VIEW_PAGE_CHANGE_PAGE, SHOP_VIEW_PAGE_CHANGE_PER_PAGE } from "./types";

const initialState: ShopViewPageState = {
    dealerName: "",
    results: [],
    page: 0,
    perPage: 25,
    viewOrder: false,
    count: 0
};


export default (state=initialState, action: ShopViewPageActions): ShopViewPageState=>{
    switch (action.type) {
        case SHOP_VIEW_PAGE_CHANGE_PROVINCE:
            return {
                ...state,
                province: action.province
            };
        case SHOP_VIEW_PAGE_CHANGE_DISTRICT:
            return {
                ...state,
                district: action.district
            };
        case SHOP_VIEW_PAGE_CHANGE_CITY:
            return {
                ...state,
                city: action.city
            };
        case SHOP_VIEW_PAGE_CHANGE_DEALER_NAME:
            return {
                ...state,
                dealerName: action.dealerName
            };
        case SHOP_VIEW_PAGE_LOAD_RESULTS:
            return {
                ...state,
                results: action.results,
                count: action.count
            };
        case SHOP_VIEW_PAGE_CHANGE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case SHOP_VIEW_PAGE_CHANGE_PER_PAGE:
            return {
                ...state,
                perPage: action.perPage
            };
        default:
            return state;
    }
}
