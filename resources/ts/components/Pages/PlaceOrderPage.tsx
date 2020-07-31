import * as React from "react";
import Layout from "../Layout/Layout";
import { withStyles } from "@material-ui/styles";
import { Theme, Grid, Typography, TextField, Button, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AppState } from "../../rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { PlaceOrderPageState } from "../../store/PlaceOrderPage/types";
import { connect } from "react-redux";
import { CoreState } from "../../store/Core/types";
import { placeOrderPagePlusData, placeOrderPageChangeData, placeOrderPageDrop, addsaveData,getProductPrice } from "../../store/PlaceOrderPage/actions";
import Dropdown from "../Common/CRUDPage/Dropdown";
import {CRUDPageDropdownValue} from "../Common/CRUDPage";


const styler = withStyles((theme: Theme) => ({
    padding: {
        padding: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    marginTop: {
        marginTop: theme.spacing(1)
    }
}))

interface PlaceOrderPageProps extends PlaceOrderPageState {
    classes: {
        padding: string;
        button: string;
        marginTop: string;
    },
    onChangePlus: (product: CRUDPageDropdownValue, price: number, qty: number, amount: number) => void;
    onChangeChangeValues: (product: CRUDPageDropdownValue, price: number, qty: number, amount: number, lastId: number) => void;
    onsave: (orders: any, userToken: string) => void;
    onDrop: (lastId: number) => void;
    onGetPrice: (id: number, userToken: string) => void;
}



export const mapStateToProps = (state: AppState) => ({
    ...state.PlaceOrderPage,
    ...state.core
});


export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangePlus: (product: CRUDPageDropdownValue, price: number, qty: number, amount: number) => dispatch(placeOrderPagePlusData(product, price, qty, amount)),
    onChangeChangeValues: (product: CRUDPageDropdownValue, price: number, qty: number, amount: number, lastId: number) => dispatch(placeOrderPageChangeData(product, price, qty, amount, lastId)),
    onsave: (orders: any, userToken: string) => dispatch(addsaveData(orders, userToken)),
    onDrop: (lastId: number) => dispatch(placeOrderPageDrop(lastId)),
    onGetPrice: (id: number, userToken: string) => dispatch(getProductPrice(id, userToken)),
})

class PlaceOrderPage extends React.Component<PlaceOrderPageProps & CoreState>{

    // private stepInput: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        // this.stepInput = React.createRef();
    }

    componentDidMount() {
        const { product, price, qty, amount, onChangePlus } = this.props;
        onChangePlus(product, price, qty, amount)
    }
    render() {
        const { classes } = this.props;
        const tar = this.getMainTargets();
        console.log(tar)
        return (
            <Layout header={true}><br></br>
                <Grid justify="center" container={true}>
                    <Grid item={true} md={8}>
                        <Typography variant="h5" align="center">Place Order</Typography>
                    </Grid>
                </Grid>
                <Divider /><br></br>
                {
                    this.renderInputs()
                }
                <Grid justify="center" container={true}>
                    <Grid className={classes.padding} item md={2}>

                    </Grid>
                    <Grid className={classes.padding} item md={2}>

                    </Grid>
                    <Grid className={classes.padding} item md={2}>

                    </Grid>
                    <Grid className={classes.padding} item md={2}>
                        <TextField
                            type="number"
                            label="Total Amount"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            value={tar.amountPre}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={1}>

                    </Grid>
                </Grid><Divider /><br></br>
                <Grid justify="center" container={true}>
                    <Grid item md={2}>
                        <Button variant="contained" color="primary" style={{ backgroundColor: '#3bb6eb' }} onClick={this.handlePlus}>
                            + Add Lines
                        </Button>
                    </Grid>
                    <Grid item md={1}>
                        <Button variant="contained" color="primary" style={{ backgroundColor: '#2f3133' }} onClick={this.handleSubmit}>
                            Create
                        </Button>
                    </Grid>
                    <Grid className={classes.padding} item md={2}>

                    </Grid>
                </Grid>
            </Layout>
        );
    }

    renderInputs = () => {
        const { classes, orders } = this.props;

        return Object.values(orders).map((order, index) => {
            return [
                <Grid justify="center" container={true}>
                    <Grid className={classes.padding} item md={2}>
                        <Dropdown
                            link="product"
                            label="Product"
                            name="product"
                            onChange={this.handleChangeProduct.bind(this, order.lastId)}
                            parameters={{}}
                            value={order.product}
                            className={classes.marginTop}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={2}>
                        <TextField
                            type="email"
                            label="Price"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            onChange={this.handleChangePrice.bind(this, order.lastId)}
                            value={order.price}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={2}>
                        <TextField
                            type="text"
                            label="Qty"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            onChange={this.handleChangeQty.bind(this, order.lastId)}
                            value={order.qty}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={2}>
                        <TextField
                            type="text"
                            label="Amount"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            onChange={this.handleChangeAmount.bind(this, order.lastId)}
                            value={order.amount}
                            disabled={true}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={1}>
                        <Button variant="contained" color="secondary" className={classes.button} style={{ backgroundColor: '#e61227' }} onClick={this.handleChangeDrop.bind(this, order.lastId)}>
                            <CloseIcon />
                        </Button>
                    </Grid>
                </Grid>
            ];
        });
    }

    handleChangeProduct(lastId: number, e: any) {
        const { onChangeChangeValues,onGetPrice,user } = this.props;
        const { price, qty, amount } = this.props.orders[lastId];
        onGetPrice(e.value,user ? user.token : "")
        onChangeChangeValues(e,price , qty, amount, lastId)
    }

    handleChangePrice(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { product, qty, amount } = this.props.orders[lastId];
        onChangeChangeValues(product, e.target.value, qty, amount, lastId)
    }

    handleChangeQty(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { product, price/*,amount*/ } = this.props.orders[lastId];

        let tot = price * e.target.value;
        onChangeChangeValues(product, price, e.target.value, tot, lastId)
    }

    handleChangeAmount(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { product, price, qty } = this.props.orders[lastId];
        onChangeChangeValues(product, price, qty, e.value, lastId)
    }

    handlePlus = () => {
        const { product, price, qty, amount, onChangePlus } = this.props;
        onChangePlus(product, price, qty, amount)
    }

    handleSubmit = () => {
        const { orders, user, onsave } = this.props;
        onsave(orders, user ? user.token : "")
    }

    handleChangeDrop(lastId: number, e: any) {
        const { onDrop } = this.props;
        onDrop(lastId)
    }

    getMainTargets() {
        const { orders } = this.props;

        let amountPre = 0;

        for (const id of Object.keys(orders)) {
            const { amount } = orders[id];

            if (amount) {
                amountPre += amount;
            }
        }

        return { amountPre };
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(styler(PlaceOrderPage));
