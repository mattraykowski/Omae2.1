import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores';

const store = configureStore();
const container =  document.getElementById('root');
const root = createRoot(container);
const	render = (Component) => {
		root.render(
				<Provider store={store}>
					<Component />
				</Provider>,
		);
	};

render(App);

// if (module.hot) {
// 	module.hot.accept('./containers/App', () => {
// 		const NextApp = require('./containers/App').default; // eslint-disable-line global-require
// 		render(NextApp);
// 	});
// }
