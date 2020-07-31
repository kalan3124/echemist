import * as React from "react";
import Layout from "../Layout/Layout";
import { withStyles } from "@material-ui/styles";
import { Theme, Grid, Typography, TextField, Button, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AppState } from "../../rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AddProductPageState } from "../../store/AddProductPage/types";
import { connect } from "react-redux";
import { CoreState } from "../../store/Core/types";
import { addProductPagePlusData, addProductPageChangeData, addsaveData, addProductPageDrop } from "../../store/AddProductPage/actions";
import Dropdown from "../Common/CRUDPage/Dropdown";
import { CRUDPageDropdownValue } from "../Common/CRUDPage";

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

interface AddProductPageProps extends AddProductPageState {
    classes: {
        padding: string;
        button: string;
        marginTop: string;
    },
    onChangePlus: (name: string, price: number, category: CRUDPageDropdownValue) => void;
    onChangeChangeValues: (name: string, price: number, category: CRUDPageDropdownValue, lastId: number) => void;
    onsave: (products: any, userToken: string) => void;
    onDrop: (lastId: number) => void;
}

export const mapStateToProps = (state: AppState) => ({
    ...state.AddProductPage,
    ...state.core
});


export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangePlus: (name: string, price: number, category: CRUDPageDropdownValue) => dispatch(addProductPagePlusData(name, price, category)),
    onChangeChangeValues: (name: string, price: number, category: CRUDPageDropdownValue, lastId: number) => dispatch(addProductPageChangeData(name, price, category, lastId)),
    onsave: (products: any, userToken: string) => dispatch(addsaveData(products, userToken)),
    onDrop: (lastId: number) => dispatch(addProductPageDrop(lastId)),
})

class AddProductPage extends React.Component<AddProductPageProps & CoreState>{
    componentDidMount() {
        const { name, price, category, onChangePlus } = this.props;
        onChangePlus(name, price, category)
    }
    render() {
        const { classes } = this.props;
        return (
            <Layout header={true}><br></br>
                <Grid justify="center" container={true}>
                    <Grid item={true} md={8}>
                        <Typography variant="h5" align="center">Create Products</Typography>
                    </Grid>
                </Grid>
                <Divider /><br></br>
                {
                    this.renderInputs()
                }
                <Grid justify="center" container={true}>
                    <Grid item md={2}>
                        <Button variant="contained" color="primary" style={{ backgroundColor: '#3bb6eb',marginRight:'50px' }} onClick={this.handlePlus}>
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
        const { classes, products } = this.props;

        return Object.values(products).map((product, index) => {
            return [
                <Grid justify="center" container={true}>
                    <Grid className={classes.padding} item md={2}>
                        <TextField
                            type="text"
                            label="Product Name"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            // onChange={this.onChangeName}
                            onChange={this.handleChangeName.bind(this, product.lastId)}
                            value={product.name}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={2}>
                        <TextField
                            type="number"
                            label="Price"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            // onChange={e => onChangePrice(parseInt(e.target.value))}
                            onChange={this.handleChangePrice.bind(this, product.lastId)}
                            value={product.price}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={2}>
                        <Dropdown
                            link="productCategory"
                            label="Category"
                            name="category"
                            onChange={this.handleChangeCategory.bind(this, product.lastId)}
                            parameters={{}}
                            className={classes.marginTop}
                            value={product.category}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={1}>
                        <Button variant="contained" color="secondary" className={classes.button} style={{ backgroundColor: '#e61227' }} onClick={this.handleChangeDrop.bind(this, product.lastId)}>
                            <CloseIcon />
                        </Button>
                    </Grid>
                </Grid>
            ];
        });
    }

    handleChangeName(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { price, category } = this.props.products[lastId];
        onChangeChangeValues(e.target.value, price, category, lastId)
    }

    handleChangePrice(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { name, category } = this.props.products[lastId];
        onChangeChangeValues(name, e.target.value, category, lastId)
    }

    handleChangeCategory(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { name, price } = this.props.products[lastId];
        onChangeChangeValues(name, price, e, lastId)
    }

    handlePlus = () => {
        const { name, price, category, onChangePlus } = this.props;
        onChangePlus(name, price, category)
    }

    handleSubmit = () => {
        const { user, products, onsave } = this.props;
        onsave(products, user ? user.token : "")
    }

    handleChangeDrop(lastId: number, e: any) {
        const { onDrop } = this.props;
        onDrop(lastId)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(styler(AddProductPage));
