import * as React from "react";
import Layout from "../Layout/Layout";
import { withStyles } from "@material-ui/styles";
import { Theme, Grid, Typography, TextField, Button, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AppState } from "../../rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { EmailListPageState } from "../../store/EmailListPage/types";
import { connect } from "react-redux";
import { CoreState } from "../../store/Core/types";
import { emailListPagePlusData, emailListPageChangeData, emailListPageDrop, addsaveData } from "../../store/EmailListPage/actions";
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

interface EmailListPageProps extends EmailListPageState {
    classes: {
        padding: string;
        button: string;
        marginTop: string;
    },
    onChangePlus: (name: string, email: string, roll: CRUDPageDropdownValue) => void;
    onChangeChangeValues: (name: string, email: string, roll: CRUDPageDropdownValue, lastId: number) => void;
    onsave: (emails: any, userToken: string) => void;
    onDrop: (lastId: number) => void;
}

export const mapStateToProps = (state: AppState) => ({
    ...state.EmailListPage,
    ...state.core
});


export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangePlus: (name: string, email: string, roll: CRUDPageDropdownValue) => dispatch(emailListPagePlusData(name, email, roll)),
    onChangeChangeValues: (name: string, email: string, roll: CRUDPageDropdownValue, lastId: number) => dispatch(emailListPageChangeData(name, email, roll, lastId)),
    onsave: (emails: any, userToken: string) => dispatch(addsaveData(emails, userToken)),
    onDrop: (lastId: number) => dispatch(emailListPageDrop(lastId)),
})

class EmailListPage extends React.Component<EmailListPageProps & CoreState>{

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const { name, email, roll, onChangePlus } = this.props;
        onChangePlus(name, email, roll)
    }
    render() {
        const { classes } = this.props;
        return (
            <Layout header={true}><br></br>
                <Grid justify="center" container={true}>
                    <Grid item={true} md={8}>
                        <Typography variant="h5" align="center">Create E-mail List</Typography>
                    </Grid>
                </Grid>
                <Divider /><br></br>
                {
                    this.renderInputs()
                }
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
        const { classes ,emails } = this.props;

        return Object.values(emails).map((email, index) => {
            return [
                <Grid justify="center" container={true}>
                    <Grid className={classes.padding} item md={2}>
                        <TextField
                            type="email"
                            label="Email Address"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            // onChange={this.onChangeName}
                            onChange={this.handleChangeEmail.bind(this, email.lastId)}
                            value={email.email}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={2}>
                        <TextField
                            type="text"
                            label="Name"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            // onChange={e => onChangePrice(parseInt(e.target.value))}
                            onChange={this.handleChangeName.bind(this, email.lastId)}
                            value={email.name}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={2}>
                        <Dropdown
                            link="designation"
                            label="Designation"
                            name="designation"
                            onChange={this.handleChangeRoll.bind(this, email.lastId)}
                            parameters={{}}
                            className={classes.marginTop}
                            value={email.roll}
                        />
                    </Grid>
                    <Grid className={classes.padding} item md={1}>
                        <Button variant="contained" color="secondary" className={classes.button} style={{ backgroundColor: '#e61227' }} onClick={this.handleChangeDrop.bind(this, email.lastId)}>
                            <CloseIcon />
                        </Button>
                    </Grid>
                </Grid>
            ];
        });
    }

    handleChangeName(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { email, roll } = this.props.emails[lastId];
        onChangeChangeValues(e.target.value, email, roll, lastId)
    }

    handleChangeEmail(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { name, roll } = this.props.emails[lastId];
        onChangeChangeValues(name, e.target.value, roll, lastId)
    }

    handleChangeRoll(lastId: number, e: any) {
        const { onChangeChangeValues } = this.props;
        const { name, email } = this.props.emails[lastId];
        onChangeChangeValues(name, email, e, lastId)
    }

    handlePlus = () => {
        const { name, email, roll, onChangePlus } = this.props;
        onChangePlus(name, email, roll)
    }

    handleSubmit = () => {
        const { user, emails, onsave } = this.props;
        onsave(emails, user ? user.token : "")
    }

    handleChangeDrop(lastId: number, e: any) {
        const { onDrop } = this.props;
        onDrop(lastId)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(styler(EmailListPage));
