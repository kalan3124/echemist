import * as React from "react";
import Layout from "../Layout/Layout";
import { Grid, Paper, Theme, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, /*Typography, Drawer, Toolbar, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, TablePagination*/ } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Dropdown from "../Common/CRUDPage/Dropdown";
import SearchIcon from "@material-ui/icons/Search";
// import LaunchIcon from "@material-ui/icons/Launch";
// import CloseIcon from "@material-ui/icons/Close";
import { AppState } from "../../rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { CoreState } from "../../store/Core/types";
import { ShopViewPageState } from "../../store/ShopViewPage/types";
import {shopViewPageChangeProvince, shopViewPageChangeCity, shopViewPageChangeDealerName, shopViewPageChangeDistrict,shopViewPageSearch,/* shopViewPageSearch, orderPageChangePerPage, orderPageFetchOrder, orderPageViewOrder*/} from "../../store/ShopViewPage/actions";
import { CRUDPageDropdownValue } from "../Common/CRUDPage";
import { connect } from "react-redux";
// import { log } from "util";


const styler = withStyles((theme: Theme)=>({
    formPaper: {
        marginTop: theme.spacing(4),
        background: theme.palette.grey[300],
        padding: theme.spacing(2)
    },
    input: {
        background: theme.palette.common.white,
        margin: theme.spacing(1)
    },
    table: {
        marginTop: theme.spacing(2)
    },
    tableHead: {
        background: theme.palette.grey[300]
    },
    actionButton:{
        margin: theme.spacing(0.25)
    },
    drawer: {
        background: theme.palette.grey[300],
        boxShadow: "0 0 4px #fff",
        padding: theme.spacing(1),
        width: 360
    },
    backdrop: {
        background: "rgba(256,256,256,0.7)!important"
    },
    grow: {
        flexGrow: 1
    }
}))

interface ShopViewPageProps extends ShopViewPageState {
    classes: {
        formPaper: string;
        input: string;
        table: string;
        tableHead: string;
        actionButton: string;
        drawer: string;
        backdrop: string;
        grow: string;
    },
    onChangeProvince: (province:CRUDPageDropdownValue)=>void;
    onChangeDistrict: (district: CRUDPageDropdownValue)=> void;
    onChangeCity: (city: CRUDPageDropdownValue)=> void;
    onChangeDelaerName: (dealerName:string)=> void;
    onSearch: (
        parameters:{
            province?:CRUDPageDropdownValue,
            district?: CRUDPageDropdownValue,
            city?: CRUDPageDropdownValue,
            dealerName?: string
        },
        page: number,
        perPage: number,
        userToken: string
    )=> void;
}

export const mapStateToProps = (state: AppState)=>({
    ...state.shopViewPage,
    ...state.core
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<{},{},any>)=>({
    onChangeProvince: (province:CRUDPageDropdownValue)=>dispatch(shopViewPageChangeProvince(province)),
    onChangeDistrict: (district: CRUDPageDropdownValue)=> dispatch(shopViewPageChangeDistrict(district)),
    onChangeCity: (city: CRUDPageDropdownValue)=> dispatch(shopViewPageChangeCity(city)),
    onChangeDelaerName: (dealerName:string)=> dispatch(shopViewPageChangeDealerName(dealerName)),
    onSearch: (
        parameters:{
            province?:CRUDPageDropdownValue,
            district?: CRUDPageDropdownValue,
            city?: CRUDPageDropdownValue,
            dealerName?: string
        },
        page: number,
        perPage: number,
        userToken: string
    )=> dispatch(shopViewPageSearch(parameters, page, perPage, userToken)),
    // onChangePage: (page:number) => dispatch(orderPageChangePage(page)),
    // onChangePerPage: (perPage: number)=> dispatch(orderPageChangePerPage(perPage)),
    // onViewOrder: (orderId: number, userToken: string)=> dispatch(orderPageFetchOrder(orderId, userToken)),
    // onCloseOrder: ()=> dispatch(orderPageViewOrder(false))
})

class ShopViewPage extends React.Component <ShopViewPageProps& CoreState> {

    public render(){

        const {
            classes,
            onChangeProvince,
            onChangeDistrict,
            onChangeCity,
            province,
            district,
            city,
            onChangeDelaerName,
            dealerName,
            results,
            // page,
            // perPage,
            // onCloseOrder,
            // order,
            // viewOrder,
            // count
        } = this.props;

        // console.log(results);

        return (
            <Layout header={true} >
                <Grid justify="center" container={true}>
                    <Grid item={true} md={8}>
                        <Paper className={classes.formPaper} style={{backgroundColor:'#3bb6eb'}}>
                            <form>
                                <Grid container={true}>
                                    <Grid style={{paddingRight: 8}} item={true} md={4}>
                                        <Dropdown
                                            link="province"
                                            label="Province"
                                            name="province"
                                            className={classes.input}
                                            onChange={onChangeProvince}
                                            parameters={{}}
                                            value={province}
                                        />
                                        <Dropdown
                                            link="district"
                                            label="District"
                                            name="district"
                                            value={district}
                                            key={"district-"+(province? province.value:0)}
                                            className={classes.input}
                                            parameters={{province: province? province.value: undefined}}
                                            onChange={onChangeDistrict}
                                        />
                                    </Grid>
                                    <Grid style={{paddingRight: 8}} item={true} md={4}>
                                        <Dropdown
                                            link="city"
                                            label="City"
                                            name="city"
                                            value={city}
                                            key={"city-"+(district? district.value:0)}
                                            className={classes.input}
                                            parameters={{
                                                district: district? district.value: undefined
                                            }}
                                            onChange={onChangeCity}
                                        />
                                        <TextField
                                            type="text"
                                            label="Dealer Name"
                                            fullWidth={true}
                                            variant="outlined"
                                            margin="dense"
                                            onChange={e=>onChangeDelaerName(e.target.value)}
                                            value={dealerName}
                                            classes={{
                                                root: classes.input
                                            }}
                                        />
                                    </Grid>
                                    <Grid style={{textAlign: "center", lineHeight: "100px"}} item={true} md={4}>
                                        <Button onClick={this.handleSearch} type="submit" variant="contained" color="primary" style={{backgroundColor:'#2f3133'}}>
                                            <SearchIcon />
                                            Search
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid>
                    <Table className={classes.table} >
                        <TableHead className={classes.tableHead} >
                            <TableRow>
                                    <TableCell>
                                        #
                                    </TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Address
                                    </TableCell>
                                    <TableCell>
                                        Province
                                    </TableCell>
                                    <TableCell>
                                        District
                                    </TableCell>
                                    <TableCell>
                                        City
                                    </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((row,rowKey)=>(
                                <TableRow key={rowKey} >
                                    <TableCell padding="none">{rowKey + 1}</TableCell>
                                    <TableCell padding="none">{row.shopName}</TableCell>
                                    <TableCell padding="none">{row.address}</TableCell>
                                    <TableCell padding="none">{row.provinceName}</TableCell>
                                    <TableCell padding="none">{row.districtName}</TableCell>
                                    <TableCell padding="none">{row.cityName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Layout>
        );
    }

    protected handleSearch = (e: React.FormEvent)=>{
        e.preventDefault();
        const {user,province,district, city, dealerName, onSearch, page, perPage} = this.props;

        onSearch({province, district, city, dealerName},page, perPage, user? user.token: "");
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( styler(ShopViewPage));
