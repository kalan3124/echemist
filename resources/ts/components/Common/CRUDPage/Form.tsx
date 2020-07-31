import * as React from "react";
import Modal from "@material-ui/core/Modal";
import { withStyles } from '@material-ui/styles';
import { Theme, Paper, Typography, TextField, Button, Divider, Grid } from '@material-ui/core';
import { CRUDInput, CRUDPageValue, CRUDPageDropdownValue } from '../CRUDPage';
import Dropdown from "./Dropdown";

const styler = withStyles((theme:Theme)=>({
    paper:{
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.grey[300],
        boxShadow: "0 0 4px #fff",
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    overlay: {
        background: "rgba(256,256,256,0.7)!important"
    },
    input: {
        background: theme.palette.common.white
    },
    toolBar: {
        textAlign: "center",
        paddingTop: 16,
    },
    inputContainer: {
        padding: 8
    }
}));

export interface FormProps {
    classes: {
        paper: string;
        overlay: string;
        input: string;
        toolBar: string;
        inputContainer: string;
    };
    title: string;
    inputs: {
        [x:string]: CRUDInput;
    };
    values: {
        [x:string]: CRUDPageValue;
    };
    onChangeValue?: (name: string, value: CRUDPageValue)=>void;
    mode?: "update"|"create";
    onCancel?: ()=>void;
    onSubmit?: ()=>void;
    structure: string[][];
}

class Form extends React.Component <FormProps>{
    public render(){
        const {classes, title, inputs, mode, onCancel, structure}  = this.props;

        return (
            <Modal
                BackdropProps={{
                    className: classes.overlay
                }}
                open={!!mode}
                onClose={onCancel}
            >
                <Paper style={{width: structure.filter(row=>row.length>1).length? 600: 300,backgroundColor:'#3bb6eb' }} className={classes.paper} >
                    <form onSubmit={this.handleSubmit}>
                        <Typography align="center" variant="h5" >
                            {title}
                        </Typography>
                        <Divider/>
                        {structure.map((row, rowKey)=>(
                            <Grid container={true} key={rowKey} >
                                {row.map((input,inputKey)=>(
                                    <Grid
                                        key={inputKey}
                                        className={classes.inputContainer}
                                        item={true}
                                        md={Math.round(12/row.length) as (1|2|3|4|5|6|7|8|9|10|11|12)}
                                    >
                                        {this.renderInput(inputs[input])}
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                        <div className={classes.toolBar} >
                            <Button type="submit" variant="contained" color="primary" style={{ backgroundColor:'#2f3133' }} >
                                {mode}
                            </Button>
                        </div>
                    </form>
                </Paper>
            </Modal>
        )
    }

    protected renderInput =(input: CRUDInput)=>{
        const {values, classes} = this.props;

        switch (input.type) {
            case "dropdown":
                let basedOnValues = {};
                if(input.basedOn){
                    let completed = true;
                    for (const name of input.basedOn){
                        if(values[name]){
                            basedOnValues[name] = (values[name] as CRUDPageDropdownValue).value;
                        } else {
                            completed = false;
                        }
                    }

                    if(!completed){
                        basedOnValues = {};
                    }
                }

                return (
                    <Dropdown
                        value={values[input.name] as CRUDPageDropdownValue}
                        link={input.link}
                        label={input.label}
                        name={input.name}
                        className={classes.input}
                        key={input.name+"-"+Object.values(basedOnValues).join("-")}
                        parameters={basedOnValues}
                        onChange={this.handleChangeDropdownInput(input.name)}
                    />
                );
            default:
                return (
                    <TextField
                        key={input.name}
                        value={typeof values[input.name]==='undefined'?"": values[input.name]}
                        type={input.type}
                        label={input.label}
                        onChange={this.handleChangeTextInput(input.name)}
                        fullWidth={true}
                        variant="outlined"
                        margin="dense"
                        classes={{
                            root: classes.input
                        }}
                    />
                )
        }
    }

    protected handleChangeTextInput = (name: string)=>(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.props.onChangeValue&&this.props.onChangeValue(name,e.target.value);
    }

    protected handleChangeDropdownInput = (name: string)=> (value?: CRUDPageDropdownValue)=>{
        this.props.onChangeValue&&value&&this.props.onChangeValue(name,value);
    }

    protected handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();

        this.props.onSubmit&&this.props.onSubmit();
    }
}

export default styler(Form);
