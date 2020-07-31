import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import Snackbar from "@material-ui/core/Snackbar";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import {AppState} from "../../rootReducer";
import {coreRemoveSnack} from "../../store/Core/actions";
import { CoreState, Snack } from "../../store/Core/types";

const styles = withStyles(theme => ({
	close: {
		padding: theme.spacing(0.5),
		position: "absolute",
		right:0,
		top:0,
	},
	error:{
		color:red[500]
	},
	info:{
		color:theme.palette.common.white
	},
	snack: {
        maxWidth: theme.spacing(50)
	},
	success:{
		color: green[500]
	},
}));


const mapStateToProps = (state: AppState) => ({
	...state.core
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onCloseSnack:(key:number)=>dispatch(coreRemoveSnack(key))
});

interface SnacksProps extends CoreState {
	classes:{
		close:string,
		error:string,
		info:string,
		snack:string
		success:string,
	},
	onCloseSnack:(key:number)=>void
}

class Snacks extends React.Component<SnacksProps> {

	public render() {
		return (
			<div>
				{this.renderSnacks()}
			</div>
		);
	}

	protected renderSnacks() {
        const { snacks, classes, loading } = this.props;

        const formatedSnacks = [...snacks];

        if(loading){
            formatedSnacks.push({
                type: "info",
                title: "Please wait..."
            });
        }

		return formatedSnacks.slice(0, 3).map((snack, index) => (
			<Snackbar
				className={ classes.snack}
				style={{bottom:this.getNextPosition(formatedSnacks,index)}}
				message={<span className={classes[snack.type]}>
                    <Typography variant="body1" >{snack.title}</Typography>
                    {snack.body&&(
                        <Typography variant="body2">{snack.body}</Typography>
                    )}
                </span>}
				open={true}
                key={index}
				anchorOrigin={{
					horizontal: "right",
					vertical: "bottom",
				}}
				autoHideDuration={snack.time}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={this.handleClose(index,snack)}
					>
						<CloseIcon />
					</IconButton>
					,
					this.renderConfirmButton(index,snack)
				]}
			/>
		));
	}

	protected renderConfirmButton(key: number,currentSnack:Snack){
		if(currentSnack.type!=="confirm"){
			return null;
		}

		return (
			<Button variant="contained" key="confirm" color="primary" onClick={this.handleConfrim(key,currentSnack)}>Confirm</Button>
		);
	}

	protected getNextPosition(snacks:Snack[],index:number){

		let bottom = 32;

		snacks.slice(0,index).forEach(({title,type,body})=>{
            bottom += Math.ceil(title.length/46)*24;
            bottom +=42;
            if(body){
                bottom += Math.ceil(body.length/46)*24;
                bottom +=24;
            }
            if(type==="confirm"){
                bottom +=48;
            }
		});

		return bottom;
	}

	protected handleClose(key:number, snack:Snack){
		const {onCloseSnack} = this.props;
		return (e:React.MouseEvent)=>{

            if(snack.onCancel){
                snack.onCancel();
            }

			onCloseSnack(key);
		}
    }

    protected handleConfrim(key:number,snack:Snack){
        const {onCloseSnack} = this.props;

        return (e:React.MouseEvent)=>{
            if(snack.onConfirm){
                snack.onConfirm();
            }
			onCloseSnack(key);
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(styles(Snacks));
