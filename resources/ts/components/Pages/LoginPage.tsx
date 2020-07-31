import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import red from '@material-ui/core/colors/red';
import { APP_URL } from '../../config';
import { AppState } from '../../rootReducer';
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import {
    loginPageChangeUsername,
    loginPageChangePassword,
    loginPageSubmit
} from "../../store/LoginPage/actions";
import { LoginPageState } from '../../store/LoginPage/types';

const styler = withStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	brandName: {
		color: '#3bb6eb',
		fontWeight: 500
    },
    mainErrorTypography: {
        color: red[900],
        textAlign: "center"
    }
}));

export interface LoginPageProps extends LoginPageState {
	classes: {
		paper: string;
		avatar: string;
		form: string;
		submit: string;
        brandName: string;
        mainErrorTypography: string;
    };
    onChangeUsername: (username:string)=> void;
    onChangePassword: (password:string)=> void;
    onSubmit: (username: string, password: string)=> void;
}

const mapStateToProps = (state:AppState)=>({
    ...state.loginPage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>)=>({
    onChangeUsername: (username: string)=> dispatch(loginPageChangeUsername(username)),
    onChangePassword: (password: string)=> dispatch(loginPageChangePassword(password)),
    onSubmit: (username: string, password: string)=> dispatch(loginPageSubmit(username, password))
});

class LoginPage extends React.Component<LoginPageProps> {
	public render() {
		const { classes , username, password, errors} = this.props;

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography className={classes.brandName} component="h1" variant="h2">
						E-chemist
					</Typography>
					<form className={classes.form} noValidate>
                        {errors.main&&(
                            <Typography className={classes.mainErrorTypography} variant="body1" align="center">{errors.main}</Typography>
                        )}
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
                            autoFocus
                            onChange={this.handleChangeUsername}
                            value={username}
                            error={!!errors.username}
                            helperText={errors.username}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
                            autoComplete="current-password"
                            onChange={this.handleChangePassoword}
                            value={password}
                            error={!!errors.password}
                            helperText={errors.password}
						/>
						<Grid container>
							<Grid style={{ textAlign: 'center' }} item xs>
								<Link href="/user/forgetPassword" variant="body2" style={{ color:'#2f3133' }}>
									Forgot password?
								</Link>
							</Grid>
						</Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            style={{backgroundColor:'#2f3133'}}
                        >
							Login
						</Button>
					</form>
				</div>
				<Box mt={8}>
					<Typography variant="body2" color="textSecondary" align="center">
						{'Copyright © '}
						<Link color="inherit" href={APP_URL}>
							E-chemist
						</Link>{' '}
						{new Date().getFullYear()}
						{'.'}
					</Typography>
				</Box>
			</Container>
		);
    }

    protected handleChangeUsername = (e:React.ChangeEvent<HTMLInputElement>)=>
        this.props.onChangeUsername(e.target.value);

    protected handleChangePassoword = (e:React.ChangeEvent<HTMLInputElement>)=>
        this.props.onChangePassword(e.target.value);

    protected handleSubmit = (e: React.FormEvent)=>{
        const {username, password, onSubmit} = this.props;

        e.preventDefault();

        onSubmit(username, password);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( styler(LoginPage));
