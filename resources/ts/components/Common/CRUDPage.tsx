import * as React from "react";
import Layout from "../Layout/Layout";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Theme} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DisableIcon from "@material-ui/icons/Close";
import HttpService from '../../services/HttpService';
import { AppState } from '../../rootReducer';
import { connect } from 'react-redux';
import { CoreState, Snack } from '../../store/Core/types';
import Form from "./CRUDPage/Form";
import { ThunkDispatch } from 'redux-thunk';
import { coreAddSnack, coreLoading } from '../../store/Core/actions';

export interface TextInput {
    type: "text"|"email"|"password"|"number";
    name: string;
    label: string;
}

export interface DropdownInput {
    type: "dropdown";
    name: string;
    label: string;
    link: string;
    basedOn?: string[];
}

export type CRUDInput = TextInput | DropdownInput;

export interface CRUDPageInfo {
    inputs: {
        [x:string]: CRUDInput
    };
    title: string;
    create: boolean;
    update: boolean;
    disable: boolean;
    structure?: string[][];
}

export type CRUDPageRow =  {
    [x:string]: CRUDPageValue|undefined
}& {
    id: number
};

export interface CRUDPageState extends CRUDPageInfo {
    formValues: {
        [x:string]: CRUDPageValue
    },
    searchResults: CRUDPageRow[];
    count: number;
    page: number;
    perPage: number;
    formMode?: "update"|"create";
    updatingId?: number;
    structure: string[][];
}

export interface CRUDPageProps extends CoreState {
    link: string;
    classes: {
        container: string;
        grow: string;
        tableHead: string;
        actionButton: string;
    }
    onSnack: (snack:Snack)=> void;
    onLoading: (loading: boolean)=> void;
}

export interface CRUDPageDropdownValue {
    label: string;
    value: number;
}

export type CRUDPageValue =
| CRUDPageDropdownValue
| string
| null;

const styler = withStyles((theme: Theme)=>({
    container: {
        marginTop: 32
    },
    grow: {
        flexGrow: 1
    },
    tableHead: {
        background: theme.palette.grey[300]
    },
    actionButton:{
        margin: theme.spacing(0.25)
    }
}));

const mapStateToProps = (state:AppState)=>({
    ...state.core
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{},{},any>)=>({
    onSnack: (snack: Snack)=> dispatch(coreAddSnack(snack)),
    onLoading: (loading: boolean)=>dispatch(coreLoading(loading))
});

class CRUDPage extends React.Component<CRUDPageProps, CRUDPageState> {

    constructor(props: CRUDPageProps){
        super(props);

        this.state = {
            inputs: {},
            title: "Please wait",
            create: true,
            update: true,
            disable: true,
            formValues: {},
            searchResults: [],
            count: 0,
            page: 0,
            perPage: 25,
            structure:[]
        }
    }

    componentDidMount(){
        HttpService.crud.info(
            this.props.link,
            this.props.user?this.props.user.token:""
        ).then(response=>{
            if(response.success){
                this.setState({
                    ...response.info,
                    structure: response.info.structure?
                        response.info.structure:
                        Object.keys(response.info.inputs).map(input=>[input])
                });

                this.search();
            } else {
                this.setState({
                    title: "Permission Denied.."
                })
            }
        })
    }

    public render(){
        const {
            title,
            inputs,
            searchResults,
            perPage,
            page,
            count,
            update,
            disable,
            formValues,
            formMode,
            structure
        } = this.state;
        const {classes} = this.props;

        return (
            <Layout header={true} >
                <Grid justify="center" alignContent="center" container={true} >
                    <Grid item={true} className={classes.container} md={8}>
                        <Toolbar>
                            <Typography variant="h5">{title}</Typography>
                            <div className={classes.grow}/>
                            <Button onClick={this.handleClickAddButton} variant="contained" color="primary" style={{backgroundColor:'#3bb6eb'}} >
                                <AddIcon />
                                Add
                            </Button>
                        </Toolbar>
                        <Divider/>
                        <Table>
                            <TableHead className={classes.tableHead} >
                                <TableRow>
                                    <TableCell>
                                        #
                                    </TableCell>
                                    {Object.values(inputs).map((input,key)=>(
                                        input.type!=="password"?
                                        <TableCell style={{width: Math.round(100/(Object.keys(inputs).length+1))+"%"}} key={key} >
                                            {input.label}
                                        </TableCell>:null
                                    ))}
                                    <TableCell style={{width: Math.round(100/(Object.keys(inputs).length+1))+"%", textAlign: "center"}} >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((result,resultKey)=>(
                                    <TableRow key={resultKey} >
                                        <TableCell style={{padding:0,paddingLeft: 16}} >
                                            {page*perPage+ resultKey+1}
                                        </TableCell>
                                        {Object.values(inputs).map((input,key)=>(
                                            input.type!=="password"?<TableCell  padding="none" key={key} >
                                                {this.renderValue(input,result[input.name])}
                                            </TableCell>:null
                                        ))}
                                        <TableCell  padding="none" style={{textAlign: "center"}} >
                                            {update&&(
                                                <Button onClick={this.handleClickUpdate(result)} className={classes.actionButton} variant="outlined">
                                                    <EditIcon />
                                                </Button>
                                            )}
                                            {disable&&(
                                                <Button onClick={this.handleClickDeleteButton(result.id)} className={classes.actionButton} variant="outlined" >
                                                    <DisableIcon/>
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                </Grid>
                {title&&(
                    <Form
                        title={title}
                        mode={formMode}
                        inputs={inputs}
                        values={formValues}
                        onChangeValue={this.handleChangeValue}
                        onCancel={this.handleCancelForm}
                        onSubmit={this.handleSubmitForm}
                        structure={structure}
                    />
                )}
            </Layout>
        )
    }

    protected renderValue = (input:CRUDInput,value: CRUDPageValue|undefined)=>{
        if(!value){
            return null;
        }

        switch (input.type) {
            case "text":
                return value;
            case "dropdown":
                return (typeof value=="object")? value.label:null;
            default:
                return value;
        }
    }

    protected handleChangePage = (e:any, page:number)=>{
        this.setState({page},()=>{
            this.search();
        });

    }

    protected handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({perPage: parseInt(e.target.value)},()=>{
            this.search();
        });


    }

    protected handleChangeValue = (name: string, value: CRUDPageValue)=>{
        this.setState({
            formValues:{
                ...this.state.formValues,
                [name]:value
            }
        });
    }

    protected handleClickAddButton = ()=>{
        this.setState({
            formMode: "create"
        })
    }

    protected search = ()=>{

        this.props.onLoading(true);
        HttpService.crud.search(
            this.props.link,
            this.state.formValues,
            this.state.page,
            this.state.perPage,
            this.props.user?this.props.user.token:""
        ).then(response=>{
            this.props.onLoading(false);
            if(response.success){
                this.setState({
                    searchResults: response.results,
                    count: response.count
                });
            }
        })
    }

    protected handleCancelForm = ()=>{
        this.setState({
            formMode: undefined
        });
    }

    protected handleClickUpdate = (row: CRUDPageRow)=>()=>{
        this.setState({
            updatingId: row.id,
            formMode: "update",
            formValues: {
                ...row,
                id: null
            }
        });
    }

    protected handleSubmitForm =()=>{
        const {formMode, updatingId, formValues} = this.state;

        const {user, link, onSnack} = this.props;

        const async = formMode=="create"?
            HttpService.crud.create(link,formValues, user? user.token: "") :
            HttpService.crud.update(link,updatingId? updatingId: 0, formValues,user? user.token: "");
        this.props.onLoading(true);
        async.then(response=>{
            this.props.onLoading(false);
            if(response.success){
                onSnack({
                    type: "success",
                    title: "Success!",
                    body: response.message
                });
                this.setState({
                    formValues: {},
                    formMode: undefined,
                    updatingId: undefined
                });
                this.search();
            } else {
                onSnack({
                    type: "error",
                    title: "Error occured!",
                    body: response.message
                })
            }
        })
    }

    protected handleClickDeleteButton = (id:number)=>()=>{
        this.props.onSnack({
            type: "confirm",
            title: "Are you want to delete?",
            body: "Please click confirm button if you want to delete this record.",
            onConfirm: ()=> this.handleDelete(id)
        })
    }

    protected handleDelete = (id:number)=>{
        this.props.onLoading(true);
        HttpService.crud.delete(this.props.link, id, this.props.user? this.props.user.token: "").then(response=>{
            this.props.onLoading(false);
            if(response.success){
                this.props.onSnack({
                    type: "success",
                    title: "Successfully Deleted!",
                    body: response.message
                });

                this.search();
            } else {
                this.props.onSnack({
                    type: "error",
                    title: "Error Occured!",
                    body: response.message
                });

            }
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( styler(CRUDPage));
