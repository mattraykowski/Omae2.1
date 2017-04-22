/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	nuyen: 0
};


const purchaseGearReducer = (state = initialState, action) => {

	const actionsToTake = {
		PURCHASE(prevState, {gear, category, Rating}) {
			let { cost } = gear,
				gearToAdd = gear;

			if (Rating && cost.search('Rating') > -1) {
				const evil = eval;
				cost = evil(cost.replace('Rating', Rating));
				gearToAdd = {
					...gear,
					currentRating: Rating,
					currentCost: cost
				};
			}

			return {
				...prevState,
				[category]: [
					...prevState[category] || {},
					gearToAdd
				],
				nuyen: prevState.nuyen + Number(cost)
			};
		},
		SELL(prevState, {index, category}) {
			const gearArray = prevState[category];
			if (gearArray.length > 1) {
				return Object.assign(
					{},
					prevState,
					{
						[category]:
						[
							...gearArray.slice(0, index),
							...gearArray.slice(index + 1)
						],
						nuyen: prevState.nuyen - Number(gearArray[index].cost)
					}
				);
			}

			const newState = {
				...prevState,
				nuyen: prevState.nuyen - Number(gearArray[index].cost)
			};

			delete newState[category];

			return newState;
		},

		WEAPON_MODDING(prevState, {index, category, slot, mod}) {
			const weaponsArray = prevState[category],
				gearBeingModded = weaponsArray[index],
				currentSlotBeingModded = gearBeingModded.mods && gearBeingModded.mods[slot];

			if (!mod && currentSlotBeingModded) {
				const {[slot]: discard, ...remainingMods} = gearBeingModded.mods,
					nuyenRefund = Number(currentSlotBeingModded.cost);
				return {
					...prevState,
					[category]: [
						...weaponsArray.slice(0, index),
						{
							...gearBeingModded,
							mods: {
								...remainingMods
							},
							currentCost: Number(gearBeingModded.cost)
						},
						...weaponsArray.slice(index + 1)
					],
					nuyen: prevState.nuyen - nuyenRefund
				};
			} else if (!mod) {
				return prevState;
			}

			const modPrice = currentSlotBeingModded ? mod.cost - Number(currentSlotBeingModded.cost) : Number(mod.cost);

			return {
				...prevState,
				[category]: [
					...weaponsArray.slice(0, index),
					{
						...gearBeingModded,
						mods: {
							...gearBeingModded.mods || {},
							[slot]: mod
						},
						currentCost: Number(gearBeingModded.cost) + Number(mod.cost)
					},
					...weaponsArray.slice(index + 1)
				],
				nuyen: prevState.nuyen + modPrice
			};
		},

		MODDING_MULTI(prevState, {index, category, slot, mod}) {
			const weaponsArray = prevState[category],
				gearBeingModded = weaponsArray[index],
				updatedMods = gearBeingModded.mods ? {
					...gearBeingModded.mods[slot],
					[mod.name]: mod
				}
				: {
					[mod.name]: mod
				};

			return {
				...prevState,
				[category]: [
					...weaponsArray.slice(0, index),
					{
						...gearBeingModded,
						mods: {
							...gearBeingModded.mods,
							[slot]: {
								...updatedMods
							}
						},
						currentCost: (gearBeingModded.currentCost || Number(gearBeingModded.cost)) + Number(mod.cost)
					},
					...weaponsArray.slice(index + 1)
				]
			};
		},

		DEMODDING_MULTI(prevState, {index, category, slot, demodName}) {
			const weaponsArray = prevState[category],
				gearBeingDemodded = weaponsArray[index],
				{[demodName]: discard, ...updatedMods} = gearBeingDemodded.mods[slot];

			return {
				...prevState,
				[category]: [
					...weaponsArray.slice(0, index),
					{
						...gearBeingDemodded,
						mods: {
							...gearBeingDemodded.mods,
							[slot]: updatedMods
						},
						currentCost: (gearBeingDemodded.currentCost) - Number(discard.cost)
					},
					...weaponsArray.slice(index + 1)
				]
			};
		},

		DEFAULT(prevState) { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = purchaseGearReducer;
