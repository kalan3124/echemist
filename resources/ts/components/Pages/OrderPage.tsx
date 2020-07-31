import * as React from "react";
import Layout from "../Layout/Layout";
import { Grid, Paper, Theme, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, Drawer, Toolbar, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, TablePagination } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Dropdown from "../Common/CRUDPage/Dropdown";
import SearchIcon from "@material-ui/icons/Search";
import LaunchIcon from "@material-ui/icons/Launch";
import CloseIcon from "@material-ui/icons/Close";
import { AppState } from "../../rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { OrderPageState } from "../../store/OrderPage/types";
import {orderPageChangeProvince, orderPageChangeCity, orderPageChangeDealerName, orderPageChangeDistrict, orderPageSearch, orderPageChangePage, orderPageChangePerPage, orderPageFetchOrder, orderPageViewOrder} from "../../store/OrderPage/actions";
import { CRUDPageDropdownValue } from "../Common/CRUDPage";
import { connect } from "react-redux";
import { CoreState } from "../../store/Core/types";

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

interface OrderPageProps extends OrderPageState {
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
    onChangePage: (page:number) => void;
    onChangePerPage: (perPage: number)=> void;
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
    onViewOrder: (orderId: number, userToken: string)=> void;
    onCloseOrder: ()=> void;
}

export const mapStateToProps = (state: AppState)=>({
    ...state.orderPage,
    ...state.core
});


export const mapDispatchToProps = (dispatch: ThunkDispatch<{},{},any>)=>({
    onChangeProvince: (province:CRUDPageDropdownValue)=>dispatch(orderPageChangeProvince(province)),
    onChangeDistrict: (district: CRUDPageDropdownValue)=> dispatch(orderPageChangeDistrict(district)),
    onChangeCity: (city: CRUDPageDropdownValue)=> dispatch(orderPageChangeCity(city)),
    onChangeDelaerName: (dealerName:string)=> dispatch(orderPageChangeDealerName(dealerName)),
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
    )=> dispatch(orderPageSearch(parameters, page, perPage, userToken)),
    onChangePage: (page:number) => dispatch(orderPageChangePage(page)),
    onChangePerPage: (perPage: number)=> dispatch(orderPageChangePerPage(perPage)),
    onViewOrder: (orderId: number, userToken: string)=> dispatch(orderPageFetchOrder(orderId, userToken)),
    onCloseOrder: ()=> dispatch(orderPageViewOrder(false))
})

class OrderPage extends React.Component <OrderPageProps& CoreState>{
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
            page,
            perPage,
            onCloseOrder,
            order,
            viewOrder,
            count
        } = this.props;

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
                                    Province
                                </TableCell>
                                <TableCell>
                                    District
                                </TableCell>
                                <TableCell>
                                    City
                                </TableCell>
                                <TableCell>
                                    Shop
                                </TableCell>
                                <TableCell>
                                    Number
                                </TableCell>
                                {/* <TableCell>
                                    Time
                                </TableCell> */}
                                <TableCell>
                                    View
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((row,rowKey)=>(
                                <TableRow key={rowKey} >
                                    <TableCell padding="none">{page* perPage + rowKey + 1}</TableCell>
                                    <TableCell padding="none">{row.provinceName}</TableCell>
                                    <TableCell padding="none">{row.districtName}</TableCell>
                                    <TableCell padding="none">{row.cityName}</TableCell>
                                    <TableCell padding="none">{row.shopName}</TableCell>
                                    <TableCell padding="none">{row.orderNumber}</TableCell>
                                    {/* <TableCell padding="none">{row.createdAt}</TableCell> */}
                                    <TableCell padding="none">
                                        <Button onClick={this.handleViewOrder(row.orderId)} className={classes.actionButton} variant="outlined" >
                                            <LaunchIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!results.length&&(
                                <TableRow>
                                    <TableCell colSpan={8} >
                                        <Typography align="center" variant="body1" >Please click search to search for orders.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={perPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Grid>
                <Drawer
                    variant="temporary"
                    BackdropProps={{className: classes.backdrop}}
                    PaperProps={{className: classes.drawer}}
                    open={viewOrder}
                    onClose={onCloseOrder}
                >
                    <Toolbar variant="dense">
                        <Typography variant="h6" >{order? order.number: "Please wait.."}</Typography>
                        <div className={classes.grow}/>
                        <Button onClick={onCloseOrder} className={classes.actionButton} variant="outlined">
                            <CloseIcon/>
                        </Button>
                    </Toolbar>
                    <Divider />
                    {order&&(
                        <List dense={true}>
                            {order.lines.map((line,lineKey)=>(
                                <ListItem key={lineKey} button={true} divider={true} dense={true}>
                                    <ListItemText primary={"PRODUCT: "+line.product.name} secondary={line.product.code}/>
                                    <ListItemSecondaryAction>
                                        <Typography>QTY: {line.qty} PRICE: {line.product.price}</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Drawer>
            </Layout>
        );
    }

    protected handleSearch = (e: React.FormEvent)=>{
        e.preventDefault();
        const {user,province,district, city, dealerName, onSearch, page, perPage} = this.props;

        onSearch({province, district, city, dealerName},page, perPage, user? user.token: "");
    }

    protected handleViewOrder = (orderId: number)=>()=>{
        const {onViewOrder, user} = this.props;

        onViewOrder(orderId, user? user.token:"");
    }

    protected handleChangePage = (e: any, page:number)=>{
        this.props.onChangePage(page);

        const {user,province,district, city, dealerName, onSearch, perPage} = this.props;

        onSearch({province, district, city, dealerName},page, perPage, user? user.token: "");
    }

    protected handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const perPage = parseInt(e.target.value);

        this.props.onChangePerPage(perPage);

        const {user,province,district, city, dealerName, onSearch, page} = this.props;

        onSearch({province, district, city, dealerName},page, perPage, user? user.token: "");
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( styler(OrderPage));
