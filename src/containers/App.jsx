/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
// require('normalize.css');
import '../styles/bootstrap-overwrite.scss';
import '../styles/App.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	selectMagictype,
	incrementSkill,
	decrementSkill,
	incrementSkillgroup,
	decrementSkillgroup,
	setSpec,
	setMagicSkills,
	addSpell,
	removeSpell,
	addComplexform,
	removeComplexform,
	addPower,
	removePower,
	raisePower,
	lowerPower,
	resetAbility,
	purchaseGear,
	sellGear,
	addSkill,
	removeSkill,
	weaponModding,
	moddingMulti,
	demoddingMulti,
	moddingCapacity,
	demoddingCapacity,
	modalClose,
} from '../actions/';

import Main from '../components/Main';
import PriorityTableComponent from '../components/priorityTable/PriorityTableComponent';
import MetatypeSelector from '../components/MetatypeSelectorComponent';
import AttributesComponent from '../components/attributes/AttributesComponent';
import QualityComponent from '../components/QualityComponent';
import MagicSelectionComponent from '../components/magic/MagicSelectionComponent';
import SkillsComponent from '../components/skills/SkillsComponent';
import StreetGearComponent from '../components/gear/StreetGearComponent';
import SummaryComponent from '../components/SummaryComponent';
import PropTypeChecking from '../config/propTypeChecking';
import Modal from '../components/Modal';
import LifeStyleComponent from '../components/lifestyles/LifeStyleComponent';
import { setKarma } from '../reducers/karma';
import { selectMetatype } from '../reducers/selectMetatype';

/* Populated by react-webpack-redux:reducer */
class App extends Component {
	componentWillUpdate(newProps) {
		if (this.props.styleTheme !== newProps.styleTheme) {
			document.body.className = newProps.styleTheme;
		}
	}
	render() {
		const {actions, priorityTableState, selectMetatypeState, attributes, selectMagRes, settingSkills, spellSelect, karmaState, purchaseGearState, modalInfo} = this.props,
			karmaTotal = karmaState - spellSelect.powerPointsKarma;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Main />
						<PriorityTableComponent />
					</div>
				</div>
				{
					modalInfo && modalInfo.modalName ?
						<Modal {...modalInfo} closeModal={actions.modalClose} />
					: null
				}
				<div className="row">
					<div className="col-md-12 col-lg-9">
						<MetatypeSelector />
						<AttributesComponent />

						<QualityComponent karma={karmaTotal} />

						<MagicSelectionComponent
							magictype={selectMagRes}
							selectedSpellsPowers={spellSelect}
							actions={actions} />

						<h2>Skills</h2>
						<SkillsComponent
							actions={actions}
							priority={priorityTableState}
							skills={settingSkills}
							attributes={attributes}
							metatype={selectMetatypeState}
							magictype={selectMagRes} />
						<h2>Street Gear</h2>
						<StreetGearComponent actions={actions} purchaseGear={purchaseGearState} />
						<LifeStyleComponent purchasedLifestyles={purchaseGearState.lifestyles} sellGear={actions.sellGear} />
					</div>
					<div id="summary" className="col-md-12 col-lg-3">
						<SummaryComponent />
					</div>
				</div>
			</div>
		);
	}
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	priorityTableState: PropTypeChecking.priorityTable.isRequired,
	selectMetatypeState: PropTypeChecking.selectMetatype.isRequired,
	attributes: PropTypeChecking.attributes.isRequired,
	selectMagRes: PropTypeChecking.selectMagRes.isRequired,
	settingSkills: PropTypeChecking.settingSkills.isRequired,
	spellSelect: PropTypeChecking.spellSelect.isRequired,
	karmaState: PropTypeChecking.karma.isRequired,
	purchaseGearState: PropTypeChecking.purchaseGear.isRequired,
	styleTheme: PropTypes.string.isRequired,
	modalInfo: PropTypes.shape({
		modalName: PropTypes.string,
		modalContent: PropTypes.object,
	}).isRequired,
};

function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const props = {
		priorityTableState: state.priorityTable,
		selectMetatypeState: state.selectMetatype,
		attributes: state.attributes,
		selectMagRes: state.selectMagRes,
		settingSkills: state.settingSkills,
		spellSelect: state.spellSelect,
		karmaState: state.karma,
		purchaseGearState: state.purchaseGear,
		styleTheme: state.appControl.styleTheme,
		modalInfo: state.modalToggle,
	};
	return props;
}
function mapDispatchToProps(dispatch) {
	/* Populated by react-webpack-redux:action */
	const actions = {
		selectMetatype,
		selectMagictype,
		incrementSkill,
		decrementSkill,
		incrementSkillgroup,
		decrementSkillgroup,
		setSpec,
		setMagicSkills,
		addSpell,
		removeSpell,
		addComplexform,
		removeComplexform,
		addPower,
		removePower,
		raisePower,
		lowerPower,
		resetAbility,
		karma: setKarma,
		purchaseGear,
		sellGear,
		addSkill,
		removeSkill,
		weaponModding,
		moddingMulti,
		demoddingMulti,
		moddingCapacity,
		demoddingCapacity,
		modalClose,
	};
	const actionMap = { actions: bindActionCreators(actions, dispatch) };
	return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
