import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setStyle } from '../reducers/appControl';

const AppComponent = () => {
	const dispatch = useDispatch();

	return (
		<div className="row">
			<div className="program-title col">
				<h1>Omae v.2</h1>
				<p>Shadowrun 5<sup>th</sup> Edition Character Generator</p>
			</div>
			<div className="col-sm-2">
				<h4>Theme</h4>
				<select
					className="form-control"
					onChange={(e) => { dispatch(setStyle({styleTheme: e.target.value})); }}>
					<option value="">OutRun</option>
					<option value="mundane">Mundane</option>
					<option value="night-watch">Night Watch</option>
					<option value="cyber-terminal">CyberTerminal</option>
				</select>
			</div>
		</div>
	);
};

AppComponent.propTypes = {
	style: PropTypes.func.isRequired,
};

export default AppComponent;
