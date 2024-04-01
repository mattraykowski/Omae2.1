import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectMagicType } from '../../reducers/selectMagRes';
import { resetAbility } from '../../reducers/spellSelect';

import SpellSelector from './SpellSelectorComponent';
import PowerSelector from './adeptPowers/PowerSelectorComponent';
import priorityData from '../../data/priority.json';
import PropTypeChecking from '../../config/propTypeChecking';

import '../../styles/magic/MagicSelection.sass';


const MagicSelectionComponent = ({  actions}) => {
	const dispatch = useDispatch();
	const magicPriority = useSelector(state => state.priorityTable.magres);
	const magicAttribute = useSelector(state => state.attributes.special);
	const magictype = useSelector(state => state.selectMagRes);
	const selectedSpellsPowers = useSelector(state => state.spellSelect);

	const	awakenTypes = ['Mage', 'Mystic', 'Technomancer', 'Adept', 'Aspected', 'mundane'];
	const priorityMagic = priorityData[magicPriority].magic[magictype];
	const magicAtt = (priorityMagic && priorityMagic.attribute && priorityMagic.attribute.points) + magicAttribute;
	const magicPriorityStats = priorityData[magicPriority].magic;
	const toggleAbilities = {
			Mage() {
				const mageAbilities = toggleAbilities.default();
				mageAbilities.spells = true;
				return mageAbilities;
			},
			Mystic() {
				const mysticAbilities = toggleAbilities.default();
				mysticAbilities.spells = true;
				mysticAbilities.powers = true;
				return mysticAbilities;
			},
			Technomancer() {
				const technoAbilities = toggleAbilities.default();
				technoAbilities.complexforms = true;
				return technoAbilities;
			},
			Adept() {
				const adeptAbilities = toggleAbilities.default();
				adeptAbilities.powers = true;
				return adeptAbilities;
			},
			Aspected() { return toggleAbilities.Mage(); },
			default() {
				return {
					spells: false,
					powers: false,
					complexforms: false,
				};
			},
		};
	const displayAbilities = (toggleAbilities[magictype] || toggleAbilities.default)();
	let spellMax = 0;

	if (magicPriorityStats[magictype] && magicPriorityStats[magictype].spells) {
		spellMax = magicPriorityStats[magictype].spells.points;
	}

	const changeMagicType = (magicTypeName) => {
		dispatch(selectMagicType(magicTypeName));
		
		const reset = {
			Mage() {
				dispatch(resetAbility({ability: 'complexforms'}));
				dispatch(resetAbility({ability: 'powers'}));
			},
			Mystic() {
				dispatch(resetAbility({ability: 'complexforms'}));
				dispatch(resetAbility({ability: 'powers'}));
			},
			Technomancer() {
				dispatch(resetAbility({ability: 'complexforms'}));
				dispatch(resetAbility({ability: 'powers'}));
			},
			Aspected() { return reset.Mage(); },
			default() {
				dispatch(resetAbility({ability: 'complexforms'}));
				dispatch(resetAbility({ability: 'powers'}));
				dispatch(resetAbility({ability: 'spells'}));
			},
		};
		(reset[magicTypeName] || reset.default)();
	}

	const awakenButtons = awakenTypes.map((typeName) => {
		const selectedMagictype = magictype === typeName;
		return (
			<AwakenButton
				typeName={typeName}
				anOption={typeName in magicPriorityStats}
				checked={selectedMagictype}
				selectMagicTypeAction={changeMagicType}
				resetFreeMagicSkills={actions.setMagicSkills}
				key={`awaken-selection-${typeName}`}
			/>);
	});

	return (
		<div className="magicselection-component">
			<h2>Magic / Resonance</h2>
			<div className="scroll-overflow">
				<div className="btn-group">
					{awakenButtons}
				</div>
			</div>
			{
				displayAbilities.spells ?
					<div>
						<h3>Spells</h3>
						<SpellSelector
							abilities="Spells"
							addSpell={actions.addSpell}
							removeSpell={actions.removeSpell}
							selectedSpells={selectedSpellsPowers.spells}
							spellMax={spellMax}
						/>
					</div>
					:
					null
			}
			{
				displayAbilities.powers ?
					<div>
						<h3>Adept Powers</h3>
						<PowerSelector
							selectedPowers={selectedSpellsPowers.powers}
							maxPoints={magicAtt}
							isMystic={magictype === 'Mystic'}
							karmaSpent={selectedSpellsPowers.powerPointsKarma}
							actions={actions}
						/>
					</div>
					:
					null
			}
			{
				displayAbilities.complexforms ?
					<div>
						<h3>Complex Forms</h3>
						<SpellSelector
							abilities="Complex Forms"
							addSpell={actions.addComplexform}
							removeSpell={actions.removeComplexform}
							selectedSpells={selectedSpellsPowers.complexforms}
							spellMax={spellMax}
						/>
					</div>
					:
					null
			}
		</div>
	);
}

const AwakenButton = ({typeName, anOption, checked, selectMagicTypeAction, resetFreeMagicSkills}) => {
	const dispatch = useDispatch();
	
	const changeMagicType = () => {
		if (anOption) {
			selectMagicTypeAction(typeName);
			resetFreeMagicSkills({magicSkills: [null, null]});
		}
	}
	return (
		<label
			className={`btn
			${(!anOption && checked ? 'btn-danger' : 'btn-primary')}
			${(anOption ? '' : 'disabled')}
			${(checked ? 'active' : '')}`
			}
			htmlFor={`awakentype-${typeName}`}
			>
			<input
				type="radio"
				name="magres-selector"
				id={`awakentype-${typeName}`}
				autoComplete="off"
				checked={checked}
				onChange={changeMagicType}
			/>
			{typeName}
		</label>
	);
};

AwakenButton.propTypes = {
	typeName: PropTypes.string.isRequired,
	anOption: PropTypes.bool.isRequired,
	checked: PropTypes.bool.isRequired,
	selectMagicTypeAction: PropTypes.func.isRequired,
	resetFreeMagicSkills: PropTypes.func.isRequired,
};

MagicSelectionComponent.displayName = 'MagicMagicSelectionComponent';

// Uncomment properties you need
MagicSelectionComponent.propTypes = {
	magicPriority: PropTypes.string.isRequired,
	magictype: PropTypeChecking.selectMagRes.isRequired,
	magicAttribute: PropTypes.number.isRequired,
	selectedSpellsPowers: PropTypeChecking.spellSelect.isRequired,
	actions: PropTypeChecking.actions.isRequired,
};
// MagicSelectionComponent.defaultProps = {};

export default MagicSelectionComponent;
