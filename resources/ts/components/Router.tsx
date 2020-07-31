import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import { AppState } from "../rootReducer";
import { connect } from "react-redux";
import { CoreState } from "../store/Core/types";
import DashboardPage from "./Pages/DashboardPage";
import { ThunkDispatch } from "redux-thunk";
import { coreFetchUser } from "../store/Core/actions";
import ProvincePage from "./Pages/ProvincePage";
import DistrictPage from "./Pages/DistrictPage";
import CityPage from "./Pages/CityPage";
import ProductCategoryPage from "./Pages/ProductCategoryPage";
import SupplierPage from "./Pages/SupplierPage";
import ProductPage from "./Pages/ProductPage";
import ShopPage from "./Pages/ShopPage";
import OrderPage from "./Pages/OrderPage";
import ShopViewPage from "./Pages/ShopViewPage";
import AddProductPage from "./Pages/AddProductPage";
import EmailListPage from "./Pages/EmailListPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import { APP_DIRECTORY } from "../config";

const mapStateToProps = (state: AppState) => ({
    ...state.core
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad: () => dispatch(coreFetchUser())
});

interface RouterProps extends CoreState {
    onLoad: () => void;
}

class Router extends React.Component<RouterProps> {

    componentDidMount() {
        this.props.onLoad();
    }

    public render() {
        const { user } = this.props;

        return (
            <BrowserRouter basename={APP_DIRECTORY} >
                {
                    user ? [
                        <Route key={0} path="/" exact={true} component={DashboardPage} />,
                        <Route key={1} path="/province" exact={true} component={ProvincePage} />,
                        <Route key={2} path="/district" exact={true} component={DistrictPage} />,
                        <Route key={3} path="/city" exact={true} component={CityPage} />,
                        <Route key={4} path="/productCategory" exact={true} component={ProductCategoryPage} />,
                        <Route key={5} path="/supplier" exact={true} component={SupplierPage} />,
                        <Route key={6} path="/product" exact={true} component={ProductPage} />,
                        <Route key={7} path="/shop" exact={true} component={ShopPage} />,
                        <Route key={8} path="/order" exact={true} component={OrderPage} />,
                        <Route key={9} path="/shop-view" exact={true} component={ShopViewPage} />,
                        <Route key={10} path="/add-product" exact={true} component={AddProductPage} />,
                        <Route key={11} path="/email-list" exact={true} component={EmailListPage} />,
                        <Route key={12} path="/place-order" exact={true} component={PlaceOrderPage} />,
                    ] : [
                            <Route key={0} path="/" exact={true} component={LoginPage} />
                        ]
                }
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
