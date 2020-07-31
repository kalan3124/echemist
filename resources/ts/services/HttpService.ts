import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '../config';
import { LoggedUser } from '../store/Core/types';
import {CRUDPageInfo, CRUDPageValue, CRUDPageRow, CRUDPageDropdownValue} from "../components/Common/CRUDPage";
import { OrderPageRow, Order } from '../store/OrderPage/types';
import { ShopViewPageRow } from '../store/ShopViewPage/types';
// import { Product } from '../store/AddProductPage/types';

export interface ErrorResponse {
	success: false;
	message: string;
	details: {
		[x: string]: string | undefined;
	};
}

export interface SuccessResponse {
	success: true;
	message?: string;
	[x: string]: any;
}

const request = <T>(
	url: string,
	parameters?: { [x in string]: any },
	userToken?: string,
	config: undefined | AxiosRequestConfig = {}
) =>
	axios
		.post(API_URL + url, parameters, {
			...config,
			headers: {
				...config.headers,
				[userToken ? 'Authorization' : 'Accept']: userToken ? 'Bearer ' + userToken : 'application/json'
			}
		})
		.then((response: AxiosResponse): T & SuccessResponse => ({
			success: true,
			...response.data
		}))
		.catch((err: AxiosError): ErrorResponse => ({
			message: typeof err.response !== 'undefined' ? (err.response.data.message?err.response.data.message:"Server Error!") : 'Network Error',
			success: false,
			details:
				err.response &&
				err.response.data &&
				err.response.data.details
					? err.response.data.details
					: {}
		}));

export interface LoginResponse {
    user: LoggedUser
}

export interface CRUDPageInfoResponse {
    info: CRUDPageInfo
}

export interface CRUDPageSearchResponse {
    results:CRUDPageRow[],
    count: number
}

export interface CRUDPageDropdownResponse {
    items: CRUDPageDropdownValue[]
}

export interface OrderPageSearchResponse {
    results: OrderPageRow[];
    count: number
}

export interface OrderPageOrderDetailsResponse {
    order: Order
}

export interface ShopViewPageSearchResponse {
    results: ShopViewPageRow[];
    count: number
}


export default class HttpService {
    public static user = {
        login: (username: string, password: string)=>
            request<LoginResponse>("user/login",{username, password}),
        status: (userToken: string)=>
            request<LoginResponse>("user/status",{},userToken)
    }

    public static crud = {
        info: (name: string, userToken: string)=>
            request<CRUDPageInfoResponse>("crud/"+name+"/info",{},userToken),
        search: (name: string, parameters: {[x:string]:CRUDPageValue}, page: number, perPage: number, userToken: string)=>
            request<CRUDPageSearchResponse>("crud/"+name+"/search",{parameters,page,perPage},userToken),
        update: (name: string, id: number, values: {[x:string]:CRUDPageValue}, userToken: string )=>
            request<{}>("crud/"+name+"/update", {id,values}, userToken),
        create: (name: string, values: {[x:string]:CRUDPageValue}, userToken: string )=>
            request<{}>("crud/"+name+"/create", {values}, userToken),
        delete: (name: string, id: number, userToken: string)=>
            request<{}>("crud/"+name+"/delete",{id}, userToken),
        dropdown: (name: string, parameters: {[x:string]: number|undefined}, userToken: string)=>
            request<CRUDPageDropdownResponse>("crud/"+name+"/dropdown",{parameters},userToken)
    }

    public static order = {
        search: (
            parameters:{
                province?:CRUDPageDropdownValue,
                district?: CRUDPageDropdownValue,
                city?: CRUDPageDropdownValue,
                dealerName?: string
            },
            page: number,
            perPage: number,
            userToken: string
        )=>
            request<OrderPageSearchResponse>("order/search",{parameters, page, perPage}, userToken),
        details: (orderId: number, userToken: string)=>
            request<OrderPageOrderDetailsResponse>("order/details",{orderId}, userToken),
        save: (orders: number, userToken: string)=>
            request<{}>("order/save",{orders}, userToken),
        getPrice: (id: number, userToken: string)=>
            request<{}>("order/price",{id}, userToken)
    }

    public static shopView = {
        search: (
            parameters:{
                province?:CRUDPageDropdownValue,
                district?: CRUDPageDropdownValue,
                city?: CRUDPageDropdownValue,
                dealerName?: string
            },
            page: number,
            perPage: number,
            userToken: string
        )=>
            request<ShopViewPageSearchResponse>("shop_view/search",{parameters, page, perPage}, userToken),
    }

    public static addProduct = {
        save: (
            products:any,
            userToken:string
        )=>
            request<{}>("add_product/save",{products},userToken)
    }

    public static addEmail = {
        save: (
            emails:any,
            userToken:string
        )=>
            request<{}>("add_email/save",{emails},userToken)
    }
}
