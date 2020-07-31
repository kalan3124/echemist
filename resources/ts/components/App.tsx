import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './Router';
import store from '../store';
import theme from '../theme';
import {MuiThemeProvider} from "@material-ui/core/styles";

export default class App extends React.Component<{}, {}> {
	render() {
		return (
            <MuiThemeProvider theme={theme} >
                <Provider store={store}>
                    <Router />
                </Provider>
            </MuiThemeProvider>
		);
	}
}

if (document.getElementById('root')) {
	ReactDOM.render(<App />, document.getElementById('root'));
}
