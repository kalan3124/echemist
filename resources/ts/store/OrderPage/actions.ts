import { CRUDPageDropdownValue } from "../../components/Common/CRUDPage";
import { ORDER_PAGE_CHANGE_PROVINCE, ORDER_PAGE_CHANGE_DISTRICT, ORDER_PAGE_CHANGE_CITY, ORDER_PAGE_CHANGE_DEALER_NAME, OrderPageRow, ORDER_PAGE_LOAD_RESULTS, OrderPageChangeProvince, OrderPageChangeDistrict, OrderPageChangeCity, OrderPageLoadResults, ORDER_PAGE_CHANGE_PAGE, OrderPageChangePage, OrderPageChangePerPage, ORDER_PAGE_CHANGE_PER_PAGE, OrderPageChangeDealerName, OrderPageViewOrder, ORDER_PAGE_VIEW_ORDER, Order, OrderPageLoadOrder, ORDER_PAGE_LOAD_ORDER } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { coreLoading, coreAddSnack } from '../Core/actions';
import HttpService from '../../services/HttpService';

export const orderPageChangeProvince = (province?: CRUDPageDropdownValue): OrderPageChangeProvince=>({
    type: ORDER_PAGE_CHANGE_PROVINCE,
    province
});

export const orderPageChangeDistrict = (district?: CRUDPageDropdownValue): OrderPageChangeDistrict=>({
    type: ORDER_PAGE_CHANGE_DISTRICT,
    district
});

export const orderPageChangeCity = (city?: CRUDPageDropdownValue): OrderPageChangeCity=> ({
    type: ORDER_PAGE_CHANGE_CITY,
    city
});

export const orderPageChangeDealerName = (dealerName: string): OrderPageChangeDealerName=>({
    type: ORDER_PAGE_CHANGE_DEALER_NAME,
    dealerName
});

export const orderPageLoadResults = (results: OrderPageRow[], count: number): OrderPageLoadResults=>({
    type: ORDER_PAGE_LOAD_RESULTS,
    results,
    count
});

export const orderPageChangePage = (page: number): OrderPageChangePage=>({
    type: ORDER_PAGE_CHANGE_PAGE,
    page
});

export const orderPageChangePerPage = (perPage: number): OrderPageChangePerPage=>({
    type: ORDER_PAGE_CHANGE_PER_PAGE,
    perPage
});

export const orderPageSearch = (
    parameters:{
        province?:CRUDPageDropdownValue,
        district?: CRUDPageDropdownValue,
        city?: CRUDPageDropdownValue,
        dealerName?: string
    },
    page: number,
    perPage: number,
    userToken: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(coreLoading(true));

    HttpService.order.search(parameters, page, perPage, userToken).then(response=>{
        if(response.success){
            dispatch(orderPageLoadResults(response.results, response.count));
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

export const orderPageViewOrder = (view: boolean): OrderPageViewOrder=> ({
    type: ORDER_PAGE_VIEW_ORDER,
    view
});

export const orderPageLoadOrder = (order: Order): OrderPageLoadOrder=>({
    type: ORDER_PAGE_LOAD_ORDER,
    order
});

export const orderPageFetchOrder = (
    orderId: number,
    userToken: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(orderPageViewOrder(true));
    dispatch(coreLoading(true));

    HttpService.order.details(orderId, userToken).then(response=>{
        dispatch(coreLoading(false));
        if(response.success){
            dispatch(orderPageLoadOrder(response.order));
        } else if(response.message) {
            dispatch(coreAddSnack({
                type: "error",
                title: "Can not get order details",
                body: response.message
            }));

            dispatch(orderPageViewOrder(false));
        }
    })
}
