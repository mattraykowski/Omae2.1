'use strict';

import React from 'react';
// import Modal from '../ModalComponent';
import SpellSelector from './SpellSelectorComponent';

require('styles//magic/MagicSelection.sass');
const priorityData = require('json!../data/priority.json');


class MagicSelectionComponent extends React.Component {
	render() {
		const awakenTypes = ['Mage', 'Mystic', 'Technomancer','Adept', 'Aspected', 'mundane'],
			{magicPriority, magictype, selectedSpellsPowers, actions} = this.props,
			magicPriorityStats = priorityData[magicPriority].magic,
			spellMax = magicPriorityStats[magictype].spells && magicPriorityStats[magictype].spells.points;
		let awakenButtons = [];

		awakenTypes.forEach((typeName) => {
			let selectedMagictype = magictype === typeName;
			awakenButtons.push(
				<AwakenButton
					typeName={typeName}
					anOption={typeName in magicPriorityStats}
					checked={selectedMagictype}
					selectMagicTypeAction={actions.selectMagictype}
					resetFreeMagicSkills={actions.setMagicSkills}
					key={'awaken-selection-' + typeName}
				/>
			);
		});

		return (
			<div className="magicselection-component">
				<h2>Magic/Resonance</h2>
				<div className="btn-group">
					{awakenButtons}
				</div>
				<h3>Spells</h3>
				<SpellSelector
					addSpell = {actions.addSpell}
					removeSpell = {actions.removeSpell}
					selectedSpells = {selectedSpellsPowers.spells}
					spellMax={spellMax}
					/>
			</div>
		);
	}
}

const AwakenButton = ({typeName, anOption, checked, selectMagicTypeAction, resetFreeMagicSkills}) => {
	return (
		<label className={`btn
			${(!anOption && checked ? 'btn-danger' : 'btn-primary')}
			${(anOption ? '' : 'disabled')}
			${(checked ? 'active' : '')}`
		}>
			<input
				type="radio"
				name="magres-selector"
				id={'awakentype-' + typeName}
				autoComplete="off"
				checked={checked}
				onChange={()=>{
					if(anOption){
						selectMagicTypeAction(typeName);
						resetFreeMagicSkills({magicSkills: [null, null]});
					}
				}}
			/>
				{typeName}
		</label>
	);
};

MagicSelectionComponent.displayName = 'MagicMagicSelectionComponent';

// Uncomment properties you need
// MagicSelectionComponent.propTypes = {};
// MagicSelectionComponent.defaultProps = {};

export default MagicSelectionComponent;
