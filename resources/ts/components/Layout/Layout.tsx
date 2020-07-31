import * as React from "react";
import Header from "./Header";
import Snacks from "./Snacks";

export interface LayoutProp {
    header?: boolean;
    sidebar?: boolean;
    children: React.ReactNode|React.ReactNode[]
}

export default class Layout extends React.Component <LayoutProp>{
    public render(){
        const {header, children} = this.props;

        return (
            <div style={{marginTop: header? 48: undefined}} >
                {header&&(
                    <Header />
                )}
                {children}
                <Snacks/>
            </div>
        )
    }
}
