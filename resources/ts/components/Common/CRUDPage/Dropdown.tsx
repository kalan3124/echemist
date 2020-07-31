import * as React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { CRUDPageDropdownValue } from "../CRUDPage";
import HttpService from "../../../services/HttpService";
import { CoreState } from "../../../store/Core/types";
import { AppState } from "../../../rootReducer";
import { connect } from "react-redux";

export interface DropdownProps extends CoreState {
    link: string;
    label: string;
    name: string;
    value?: CRUDPageDropdownValue;
    className?: string;
    parameters: {
        [x:string]: number|undefined
    };
    onChange?: (value?: CRUDPageDropdownValue)=> void;
}

export interface DropdownState {
    items: CRUDPageDropdownValue[]
}

const mapStateToProps = (state:AppState)=>({
    ...state.core
})

class Dropdown extends React.Component<DropdownProps, DropdownState> {

    constructor(props: DropdownProps){
        super(props);

        this.state = {
            items: this.props.value? [this.props.value]:[]
        }
    }

    componentDidMount(){
        HttpService.crud.dropdown(
            this.props.link,
            this.props.parameters,
            this.props.user? this.props.user.token: ""
        ).then(response=>{
            if(response.success){
                this.setState({
                    items: response.items
                });
            }
        })
    }

    public render(){
        const {value,label, className} = this.props;

        const {items} = this.state;

        return (
            <Select
                value={value?value.value:0}
                variant="outlined"
                onChange={this.handleChangeValue}
                className={className}
                margin="dense"
                fullWidth={true}
            >
                <MenuItem key={0} value={0} >{label}</MenuItem>
                {items.map((item,key)=>(
                    <MenuItem key={key+1} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        )
    }

    protected handleChangeValue = (e:React.ChangeEvent<{name?: string; value: number}>)=>{
        if(this.props.onChange){
            this.props.onChange(this.state.items.filter(item=> item.value==e.target.value)[0]);
        }
    }
}

export default connect(mapStateToProps) (Dropdown);
