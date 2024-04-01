import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import armorData from '../../../data/armor.json';
import Modal from '../../ModalButtonComponent';
import ArmorMods from './ArmorModsComponent';
import FilterTable from '../../FilterableTable';
import DisplayTable from '../../DisplayTableComponent';
import PropTypeChecking from '../../../config/propTypeChecking';
import ArmorTableRow from './ArmorDisplayTableRow';

import { purchaseGear, sellGear } from '../../../reducers/attributes';


// TODO: move this somewhere else, and give it a better name
export function modifyGear(armor, rating, cost) {
	if (cost !== null) {
		return {
			...armor,
			cost,
		};
	} else if (rating !== null) {
		return {
			...armor,
			armorcapacity: rating,
		};
	}
	return armor;
}


const ArmorsComponent = ({ purchased }) => {
	const dispatch = useDispatch();

	const armorRows = armorData.map((armor) => {
		return (
			<ArmorTableRow
				key={`armor-to-buy--${armor.name}`}
				armor={armor}
				btnClass="btn-success"
				btnSymbol="+"
				btnAction={({armor: armorPurchase, state}) => {
					return () => {
						const Rating = (state.Rating === null) ? null : state.Rating || 1,
							gear = modifyGear(armorPurchase, Rating, state.currentCost);
						dispatch(purchaseGear({
							gear,
							category: 'armors',
							Rating,
						}));
					};
				}}
			/>
		);
	});

	
	const armorModal = (
		<Modal
			modalName="Armor"
			modalContent={
				<FilterTable
					tableData={{
						header: <ArmorTableHeader />,
						body: armorRows,
					}} />
			} />
	);

	const purchasedTableRow = purchased && purchased.map((armor, index) => {
				return (
					<ArmorTableRow
						key={`${armor.name + index}-purchased`}
						armor={armor}
						mod={
							<Modal
								modalName={armor.name}
								modalContent={
									<ArmorMods
										index={index}
									/>
								} />
						}
						btnClass="btn-warning"
						btnSymbol="-"
						btnAction={() => {
							return () => {
								dispatch(sellGear({index, category: 'armors'}));
							};
						}}
						index={index}
					/>
				);
			});
		return (
			<div className="armor-component row">
				<div className="col-12">
					{armorModal}
				</div>
				{purchased &&
					<div className="purchased-armors col-12">
						<DisplayTable
							header={<ArmorTableHeader sell />}
							body={purchasedTableRow} />
					</div>
				}
			</div>
		);
}
class ArmorsComponentClazz extends React.PureComponent {
	componentWillMount() {
		const { purchaseGear } = this.props.actions,
			armorRows = armorData.map((armor) => {
				return (
					<ArmorTableRow
						key={`armor-to-buy--${armor.name}`}
						armor={armor}
						btnClass="btn-success"
						btnSymbol="+"
						btnAction={({armor: armorPurchase, state}) => {
							return () => {
								const Rating = (state.Rating === null) ? null : state.Rating || 1,
									gear = modifyGear(armorPurchase, Rating, state.currentCost);
								purchaseGear({
									gear,
									category: 'armors',
									Rating,
								});
							};
						}}
					/>
				);
			});

		this.armorModal = (
			<Modal
				modalName="Armor"
				modalContent={
					<FilterTable
						tableData={{
							header: <ArmorTableHeader />,
							body: armorRows,
						}} />
				} />
		);
	}

	render() {
		const {armorModal} = this,
			{ purchased, actions } = this.props,

			purchasedTableRow = purchased && purchased.map((armor, index) => {
				return (
					<ArmorTableRow
						key={`${armor.name + index}-purchased`}
						armor={armor}
						mod={
							<Modal
								modalName={armor.name}
								modalContent={
									<ArmorMods
										index={index}
									/>
								} />
						}
						btnClass="btn-warning"
						btnSymbol="-"
						btnAction={() => {
							return () => {
								actions.sellGear({index, category: 'armors'});
							};
						}}
						index={index}
					/>
				);
			});
		return (
			<div className="armor-component row">
				<div className="col-12">
					{armorModal}
				</div>
				{purchased &&
					<div className="purchased-armors col-12">
						<DisplayTable
							header={<ArmorTableHeader sell />}
							body={purchasedTableRow} />
					</div>
				}
			</div>
		);
	}
}

ArmorsComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	purchased: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		armorcapacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	})),
};

ArmorsComponent.defaultProps = {
	purchased: null,
};

function ArmorTableHeader({sell}) {
	return (
		<tr>
			<th>{sell ? 'Sell' : 'Buy'}</th>
			<th>Name</th>
			<th>Armor</th>
			<th>Capacity</th>
			<th>Avail</th>
			<th>&yen;</th>
			<th>Ref</th>
		</tr>
	);
}

ArmorTableHeader.propTypes = {
	sell: PropTypes.bool,
};

ArmorTableHeader.defaultProps = {
	sell: false,
};

export default ArmorsComponent;
