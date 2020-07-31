import * as React from "react";
import CRUDPage from "../Common/CRUDPage";


export default class ProductCategoryPage extends React.Component {
    public render(){
        return (
            <CRUDPage
                link="productCategory"
            />
        );
    }
}
