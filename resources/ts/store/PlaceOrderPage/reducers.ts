import { PlaceOrderPageState,PlaceOrderPageActions,PLACE_ORDER_PAGE_PLUS_ORDER,PLACE_ORDER_PAGE_CHANGE_VALUES,PLACE_ORDER_PAGE_DROP_ORDER,PLACE_ORDER_PAGE_GET_PRICE } from "./types";

const initialState: PlaceOrderPageState = {
    product: {
        label: "Product",
        value: 0
    },
    price:0,
    qty:0,
    amount:0,
    orders:{},
    lastId:-1,
    pro_price:0
};

export default (state=initialState, action: PlaceOrderPageActions): PlaceOrderPageState=>{
    switch (action.type) {
        case PLACE_ORDER_PAGE_PLUS_ORDER:
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [state.lastId + 1]: {
                            product: action.product,
                            price: action.price,
                            qty: action.qty,
                            amount: action.amount,
                            lastId: state.lastId + 1
                        }
                    },
                    lastId: state.lastId + 1
                };
        case PLACE_ORDER_PAGE_CHANGE_VALUES:
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [action.lastId]: {
                            product: action.product,
                            price: action.price,
                            qty: action.qty,
                            amount: action.amount,
                            lastId: action.lastId
                        }
                    },
                };
        case PLACE_ORDER_PAGE_DROP_ORDER:
            let dropPro = {...state.orders};
            delete dropPro[action.lastId];
                return {
                    ...state,
                    orders:dropPro
                };
        case PLACE_ORDER_PAGE_GET_PRICE:
            return {
                ...state,
                pro_price: action.pro_price
            };
        default:
            return state;
    }
}
