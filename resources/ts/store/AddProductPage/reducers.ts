import { AddProductPageState,AddProductPageActions,ADD_PRODUCT_PAGE_PLUS_PRODUCTS,ADD_PRODUCT_PAGE_CHANGE_VALUES,ADD_PRODUCT_PAGE_DROP_PRODUCT } from "./types";

const initialState: AddProductPageState = {
    name:"",
    price:0,
    category:{
        label: "Category",
        value: 0
    },
    products:{},
    lastId:-1
};

export default (state=initialState, action: AddProductPageActions): AddProductPageState=>{
    switch (action.type) {
        case ADD_PRODUCT_PAGE_PLUS_PRODUCTS:
                return {
                    ...state,
                    products: {
                        ...state.products,
                        [state.lastId + 1]: {
                            name: action.name,
                            price: action.price,
                            category: action.category,
                            lastId: state.lastId + 1
                        }
                    },
                    lastId: state.lastId + 1
                };
        case ADD_PRODUCT_PAGE_CHANGE_VALUES:
                return {
                    ...state,
                    products: {
                        ...state.products,
                        [action.lastId]: {
                            name: action.name,
                            price: action.price,
                            category: action.category,
                            lastId: action.lastId
                        }
                    },
                };
        case ADD_PRODUCT_PAGE_DROP_PRODUCT:
            let dropPro = {...state.products};
            delete dropPro[action.lastId];
                return {
                    ...state,
                    products:dropPro
                };
        default:
            return state;
    }
}
