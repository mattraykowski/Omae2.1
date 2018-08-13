import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mechType, mechModType } from './mechPropTypes';

import { purchaseGear, sellGear, moddingVehicle, demoddingVehicle } from '../../../actions';

import ModalButton from '../../ModalButtonComponent';
import FilterableTable from '../../FilterableTable';
import DisplayTable from '../../DisplayTableComponent';
import MechRow from './MechRowComponent';
import VehicleModModal from './VehicleModModalComponent';

const MechHeader = () => {
	return (
		<tr>
			<th>Buy</th>
			<th>Name</th>
			<th>Handling</th>
			<th>Accel</th>
			<th>Body</th>
			<th>Armor</th>
			<th>Pilot</th>
			<th>Sensor</th>
			<th>Cost</th>
			<th>Ref</th>
		</tr>
	);
};

class MechComponent extends React.Component {
	constructor(props) {
		super(props);

		this.generatePurchasedMechs = this.generatePurchasedMechs.bind(this);

		this.modsToNotDisplay = ['Vehicle Weapon Mount', 'Model-Specific'];
	}

	componentWillMount() {
		this.modalContent = {};
	}

	generateVehicleMods(mech, mechIndex) {
		const { mechMods, demodAction, modAction } = this.props;
		return Object.keys(mechMods).reduce(
			(memo, modType) => {
				return this.modsToNotDisplay.indexOf(modType) !== -1 ? memo : [
					...memo,
					(
						<VehicleModModal
							key={modType}
							modType={modType}
							mech={mech}
							mechMods={mechMods}
							mechIndex={mechIndex}
							modAction={modAction}
							demodAction={demodAction}
						/>
					),
				];
			}, [],
		);
	}

	generateMechTable(mechsByType, typeName) {
		const {purchaseMechAction, classOfMechs} = this.props;
		return (
			<FilterableTable
				header={<MechHeader />}
				>
				{mechsByType[typeName].map((mech) => {
					return (
						<MechRow
							key={`${typeName}-${mech.name}-${mech.source}`}
							mech={mech}
							mechButton={
								<button
									className="btn btn-success"
									onClick={
										() => {
											purchaseMechAction({
												gear: mech,
												category: classOfMechs,
											});
										}
									}
								>+</button>
							}
						/>
					);
				})}
			</FilterableTable>
		);
	}

	generatePurchasedMechs(mech, index) {
		const {classOfMechs, sellMechAction} = this.props;
		return (
			<MechRow
				key={`purchased-${classOfMechs}-${mech.name + index}`}
				mech={mech}
				mechButton={
					<button
						className="btn btn-warning"
						onClick={() => {
							sellMechAction({index, category: classOfMechs});
						}}
					>-</button>
				}
				mechMod={
					<ModalButton
						modalName={mech.name}
						modalContent={
							this.generateVehicleMods(mech, index)
						}
					/>
				}
			/>
		);
	}

	render() {
		const {classOfMechs, mechsByType, purchasedMech} = this.props;
		return (
			<div className="row">
				<div className="col">
					<h3>{classOfMechs}</h3>
					{ Object.keys(mechsByType).map((typeName) => {
						return (
							<ModalButton
								key={`${classOfMechs}-${typeName}`}
								modalName={typeName}
								modalContent={
									this.generateMechTable(mechsByType, typeName)
								}
							/>
						);
					}) }
				</div>
				{purchasedMech &&
					(
						<div className="col mech-purchared">
							<DisplayTable
								header={<MechHeader />}
							>
								{purchasedMech.map(this.generatePurchasedMechs)}
							</DisplayTable>
						</div>
					)
				}
			</div>
		);
	}
}

MechComponent.propTypes = {
	classOfMechs: PropTypes.oneOf(['Vehicles', 'Drones']).isRequired,
	mechsByType: PropTypes.objectOf(
		PropTypes.arrayOf(mechType).isRequired,
	).isRequired,
	purchaseMechAction: PropTypes.func.isRequired,
	sellMechAction: PropTypes.func.isRequired,
	purchasedMech: PropTypes.arrayOf(mechType),
	modAction: PropTypes.func.isRequired,
	demodAction: PropTypes.func.isRequired,
	mechMods: PropTypes.objectOf(
		PropTypes.arrayOf(mechModType.isRequired).isRequired,
	).isRequired,
};

MechComponent.defaultProps = {
	purchasedMech: null,
};

export {MechComponent};

export default connect(null, { purchaseMechAction: purchaseGear, sellMechAction: sellGear, modAction: moddingVehicle, demodAction: demoddingVehicle })(MechComponent);
