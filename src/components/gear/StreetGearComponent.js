import React from 'react';
import WeaponsComponent from './WeaponsComponent';
import priorityData from '../data/priority.json';

import '../../styles/gear/StreetGear.scss';

class StreetGearComponent extends React.Component {
	render() {
		const {actions, purchaseGear, resourcesPriority} = this.props;
		const nuyen = priorityData[resourcesPriority].resources;
		return (
			<div className="streetgear-component">
				<p>Nuyen: <strong>{nuyen - (purchaseGear.nuyen)}&yen;</strong></p>
				<WeaponsComponent
					actions={actions}
					purchased={purchaseGear.weapons}/>
			</div>
		);
	}
}

StreetGearComponent.displayName = 'StreetGearComponent';

// Uncomment properties you need
// StreetGearComponent.propTypes = {};
// StreetGearComponent.defaultProps = {};

export default StreetGearComponent;
