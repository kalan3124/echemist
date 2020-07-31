import {combineReducers} from "redux";
import core from "./store/Core/reducers";
import loginPage from "./store/LoginPage/reducers";
import orderPage from "./store/OrderPage/reducers";
import shopViewPage from "./store/ShopViewPage/reducers";
import AddProductPage from "./store/AddProductPage/reducers";
import EmailListPage from "./store/EmailListPage/reducers";
import PlaceOrderPage from "./store/PlaceOrderPage/reducers";

const rootReducer = combineReducers({
    core,
    loginPage,
    orderPage,
    shopViewPage,
    AddProductPage,
    EmailListPage,
    PlaceOrderPage
})

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
