import { CRUDPageDropdownValue } from "../../components/Common/CRUDPage";
import { SHOP_VIEW_PAGE_CHANGE_PROVINCE, SHOP_VIEW_PAGE_CHANGE_DISTRICT, SHOP_VIEW_PAGE_CHANGE_CITY, SHOP_VIEW_PAGE_CHANGE_DEALER_NAME, SHOP_VIEW_PAGE_LOAD_RESULTS, SHOP_VIEW_PAGE_CHANGE_PAGE, SHOP_VIEW_PAGE_CHANGE_PER_PAGE,ShopViewPageChangeProvince,ShopViewPageChangeDistrict,ShopViewPageChangeCity,ShopViewPageChangeDealerName,ShopViewPageLoadResults,ShopViewPageChangePage,ShopViewPageChangePerPage,ShopViewPageRow } from "./types";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { coreLoading, coreAddSnack } from '../Core/actions';
import HttpService from '../../services/HttpService';


export const shopViewPageChangeProvince = (province?: CRUDPageDropdownValue): ShopViewPageChangeProvince=>({
    type: SHOP_VIEW_PAGE_CHANGE_PROVINCE,
    province
});

export const shopViewPageChangeDistrict = (district?: CRUDPageDropdownValue): ShopViewPageChangeDistrict=>({
    type: SHOP_VIEW_PAGE_CHANGE_DISTRICT,
    district
});

export const shopViewPageChangeCity = (city?: CRUDPageDropdownValue): ShopViewPageChangeCity=> ({
    type: SHOP_VIEW_PAGE_CHANGE_CITY,
    city
});

export const shopViewPageChangeDealerName = (dealerName: string): ShopViewPageChangeDealerName=>({
    type: SHOP_VIEW_PAGE_CHANGE_DEALER_NAME,
    dealerName
});

export const shopViewPageLoadResults = (results: ShopViewPageRow[], count: number): ShopViewPageLoadResults=>({
    type: SHOP_VIEW_PAGE_LOAD_RESULTS,
    results,
    count
});

export const shopViewPageChangePage = (page: number): ShopViewPageChangePage=>({
    type: SHOP_VIEW_PAGE_CHANGE_PAGE,
    page
});

export const shopViewPageChangePerPage = (perPage: number): ShopViewPageChangePerPage=>({
    type: SHOP_VIEW_PAGE_CHANGE_PER_PAGE,
    perPage
});

export const shopViewPageSearch = (
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

    HttpService.shopView.search(parameters, page, perPage, userToken).then(response=>{
        if(response.success){
            dispatch(shopViewPageLoadResults(response.results, response.count));
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
