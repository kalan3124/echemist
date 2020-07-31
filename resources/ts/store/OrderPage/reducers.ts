import { OrderPageState, OrderPageActions, ORDER_PAGE_CHANGE_PROVINCE, ORDER_PAGE_CHANGE_DISTRICT, ORDER_PAGE_CHANGE_CITY, ORDER_PAGE_CHANGE_DEALER_NAME, ORDER_PAGE_LOAD_RESULTS, ORDER_PAGE_CHANGE_PAGE, ORDER_PAGE_CHANGE_PER_PAGE, ORDER_PAGE_VIEW_ORDER, ORDER_PAGE_LOAD_ORDER } from "./types";

const initialState: OrderPageState = {
    dealerName: "",
    results: [],
    page: 0,
    perPage: 25,
    viewOrder: false,
    count: 0
};

export default (state=initialState, action: OrderPageActions): OrderPageState=>{
    switch (action.type) {
        case ORDER_PAGE_CHANGE_PROVINCE:
            return {
                ...state,
                province: action.province
            };
        case ORDER_PAGE_CHANGE_DISTRICT:
            return {
                ...state,
                district: action.district
            };
        case ORDER_PAGE_CHANGE_CITY:
            return {
                ...state,
                city: action.city
            };
        case ORDER_PAGE_CHANGE_DEALER_NAME:
            return {
                ...state,
                dealerName: action.dealerName
            };
        case ORDER_PAGE_LOAD_RESULTS:
            return {
                ...state,
                results: action.results,
                count: action.count
            };
        case ORDER_PAGE_CHANGE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case ORDER_PAGE_CHANGE_PER_PAGE:
            return {
                ...state,
                perPage: action.perPage
            };
        case ORDER_PAGE_VIEW_ORDER:
            return {
                ...state,
                order: undefined,
                viewOrder: action.view
            };
        case ORDER_PAGE_LOAD_ORDER:
            return {
                ...state,
                order: action.order
            };
        default:
            return state;
    }
}
