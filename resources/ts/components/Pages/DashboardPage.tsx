import * as React from "react";
import Layout from "../Layout/Layout";

export default class DashboardPage extends React.Component {
    public render(){
        return (
            <Layout header={true} >
                Dashboard
            </Layout>
        )
    }
}
