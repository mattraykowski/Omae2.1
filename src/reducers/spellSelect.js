import { createSlice } from "@reduxjs/toolkit";

const mysticPowerKarmaCost = (state, updatedPowerPoints, isMystic) => isMystic &&
	(
		updatedPowerPoints < Math.ceil(state.powerPointsSpent) ||
		updatedPowerPoints > ~~oldState.powerPointsSpent
	) ? Math.ceil(updatedPowerPoints) * 5 : updatedPowerPoints;

const spellSlice = createSlice({
	name: 'spellSelect',
	initialState: {
		spells: [],
		powers: [],
		powerPointsSpent: 0,
		powerPointsKarma: 0,
		complexforms: [],
	},
	reducers: {
		addSpell: (state, action) => {
			const newSpell = action.payload.newSpell;
			const spellAlreadyExists = state.spells.find(spell => spell.name === newSpell);

			if(spellAlreadyExists) return state;
			state.spells.push(newSpell);
		},
		removeSpell: (state, action) => {
			const spellIndex = action.payload.spellIndex;
			state.spells.splice(spellIndex, 1);
		},
		addComplexForm: (state, action) => {
			const newSpell = action.payload.newSpell;
			state.complexforms.push(newSpell);
		},
		removeComplexForm: (state, action) => {
			const spellIndex = action.payload.spellIndex;
			state.complexforms.splice(spellIndex, 1);
		},
		addPower: (state, action) => {
			const { newSpell, isMystic } = action.payload;
			const updatedPowerPoints = state.powerPointsSpent + Number(newSpell.points);
			state.powers.push(newSpell);
			state.powerPointsSpent = updatedPowerPoints;
			state.powerPointsKarma = mysticPowerKarmaCost(state, updatedPowerPoints, isMystic)
		},
		removePower: (state, action) => {
			const { powerIndex, isMystic } = action.payload;
			const power = state.powers[powerIndex];
			const updatedPowerPoints = state.powerPointsSpent - (
				Number(power.points) * (power.levels > 0 ? power.levels : 1)
			);

			state.powers.splice(powerIndex, 1);
			state.powerPointsSpent = updatedPowerPoints;
			state.powerPointsKarma = mysticPowerKarmaCost(state, updatedPowerPoints, isMystic);
		},
		raisePower: (state, action) => {
			const { powerIndex, isMystic } = action.payload;
			const power = state.powers[powerIndex];
			const updatedPowerPoints = state.powerPointsSpent + Number(newSpell.points);

			power.levels++;
			state.powerPointsSpent = updatedPowerPoints;
			state.powerPointsKarma = mysticPowerKarmaCost(state, updatedPowerPoints, isMystic);
		},
		lowerPower: (state, action) => {
			const { powerIndex, isMystic } = action.payload;
			const power = state.powers[powerIndex];
			const updatedPowerPoints = state.powerPointsSpent - Number(power.points);

			power.levels--;
			state.powerPointsSpent = updatedPowerPoints;
			state.powerPointsKarma = mysticPowerKarmaCost(state, updatedPowerPoints, isMystic);
		},
		resetAbility: (state, action) => {
			const { ability } = action.payload;
			state[ability] = [];
			state.powerPointsSpent = ability === 'powers' ? 0 : state.powerPointsSpent;
			state.powerPointsKarma = 0;
		},
	}
})

const initialState = {
	spells: [],
	powers: [],
	powerPointsSpent: 0,
	powerPointsKarma: 0,
	complexforms: [],
};

const spellReducer = (state = initialState, action) => {
	// helper functions
	function addingSpellToList(listOfSpells, newSpell) {
		return [
			...listOfSpells,
			newSpell,
		];
	}

	function removeSpellFromList(listOfSpells, indexToDelete) {
		return [
			...listOfSpells.slice(0, indexToDelete),
			...listOfSpells.slice(indexToDelete + 1),
		];
	}

	function modifyPowerFromList(listOfPowers, indexToModify, modifiedPower) {
		return [
			...listOfPowers.slice(0, indexToModify),
			modifiedPower,
			...listOfPowers.slice(indexToModify + 1),
		];
	}

	function mysticPowerKarmaCost(isMystic, newState, oldState) {
		if (
			isMystic &&
			(
				newState.powerPointsSpent < Math.ceil(oldState.powerPointsSpent) ||
				newState.powerPointsSpent > ~~oldState.powerPointsSpent
			)
		) {
			return Object.assign(
				{},
				newState,
				{ powerPointsKarma: Math.ceil(newState.powerPointsSpent) * 5 },
			);
		}

		return newState;
	}

	// function calculateAdeptPointsSpent() {
	// 	var pointsSpent = 0;
	// 	for(var power of state.powers) {
	// 		pointsSpent += power.points * (power.levels>0?power.levels : 1);
	// 	}

	// 	return pointsSpent;
	// }

	const actionsToTake = {
		ADD_SPELL: (prevState, {newSpell}) => {
			const spellAlreadyExists = prevState.spells.find((spell) => {
				return spell.name === newSpell.name;
			});

			if (spellAlreadyExists) {
				return prevState;
			}

			return {
				...prevState,
				spells: [
					...prevState.spells,
					newSpell,
				],
			};
		},

		REMOVE_SPELL: (prevState, {spellIndex}) => {
			return Object.assign(
				{},
				prevState,
				{
					spells: removeSpellFromList(prevState.spells, spellIndex),
				},
			);
		},

		ADD_COMPLEXFORM: (prevState, {newSpell}) => {
			return Object.assign(
				{},
				prevState,
				{
					complexforms: addingSpellToList(prevState.complexforms, newSpell),
				},
			);
		},

		REMOVE_COMPLEXFORM: (prevState, {spellIndex}) => {
			return Object.assign(
				{},
				prevState,
				{
					complexforms: removeSpellFromList(prevState.complexforms, spellIndex),
				},
			);
		},

		ADD_POWER: (prevState, {newSpell, isMystic}) => {
			let newState = Object.assign(
				{},
				prevState,
				{
					powers: addingSpellToList(prevState.powers, newSpell),
					powerPointsSpent: prevState.powerPointsSpent + Number(newSpell.points),
				},
			);

			newState = mysticPowerKarmaCost(isMystic, newState, prevState);

			return newState;
		},

		REMOVE_POWER: (prevState, {powerIndex, isMystic}) => {
			const power = prevState.powers[powerIndex];
			let newState = Object.assign(
				{},
				prevState,
				{
					powers: removeSpellFromList(prevState.powers, powerIndex),
					powerPointsSpent: prevState.powerPointsSpent - (
						Number(power.points) * (power.levels > 0 ? power.levels : 1)
					),
				},
			);

			newState = mysticPowerKarmaCost(isMystic, newState, prevState);

			return newState;
		},

		RAISE_POWER: (prevState, {powerIndex, isMystic}) => {
			const powerToRaise = prevState.powers[powerIndex],
				powerLevelRasied = Object.assign(
					{},
					powerToRaise,
					{
						levels: powerToRaise.levels + 1,
					},
				);

			let newState = Object.assign(
				{},
				prevState,
				{
					powers: modifyPowerFromList(prevState.powers, powerIndex, powerLevelRasied),
					powerPointsSpent: prevState.powerPointsSpent + Number(prevState.powers[powerIndex].points),
				},
			);

			newState = mysticPowerKarmaCost(isMystic, newState, prevState);

			return newState;
		},

		LOWER_POWER: (prevState, {powerIndex, isMystic}) => {
			const powerToLower = prevState.powers[powerIndex],
				powerLevelLowered = Object.assign(
					{},
					powerToLower,
					{
						levels: powerToLower.levels - 1,
					},
				);

			let newState = Object.assign(
				{},
				prevState,
				{
					powers: modifyPowerFromList(prevState.powers, powerIndex, powerLevelLowered),
					powerPointsSpent: prevState.powerPointsSpent - Number(prevState.powers[powerIndex].points),
				},
			);

			newState = mysticPowerKarmaCost(isMystic, newState, prevState);

			return newState;
		},

		RESET_ABILITY: (prevState, {ability}) => {
			if (prevState[ability].length > 0) {
				const newState = Object.assign(
					{},
					prevState,
					{
						[ability]: [],
						powerPointsSpent: ability === 'powers' ? 0 : prevState.powerPointsSpent,
						powerPointsKarma: 0,
					},
				);

				return newState;
			}
			return prevState;
		},

		DEFAULT: (previousState) => { return previousState; },
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

export const { addSpell, removeSpell, addComplexForm, removeComplexForm, addPower, removePower, raisePower, lowerPower, resetAbility } = spellSlice.actions;

export default spellSlice.reducer;

// export default spellReducer;
