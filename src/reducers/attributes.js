import { createSlice } from '@reduxjs/toolkit';

export const attributesSlice = createSlice({
	name: 'attributes',
	initialState: {
		bod: 0,
		agi: 0,
		rea: 0,
		str: 0,
		wil: 0,
		log: 0,
		int: 0,
		cha: 0,
		edg: 0,
		ess: 0,
		augmented: {},
		special: 0,
		baseSpent: 0,
		specialSpent: 0,
		conditionBonus: {},
	},
	reducers: {
		incrementAttribute: (state, action) => {
			const {attribute, max, spend, maxCap} = action.payload;
			const nextIncrement = state[attribute] + 1;

			if (nextIncrement > (maxCap ? max - 1 : max)) {
				return;
			}

			state[attribute] = nextIncrement;
			state[spend] = state[spend] + 1;
			
		},

		decrementAttribute: (state, action) => {
			const {attribute, spend} = action.payload;
			const nextDecrement = state[attribute] - 1;

			if (nextDecrement < 0) {
				return;
			}


			state[attribute] = nextDecrement;
			state[spend] = state[spend] - 1;
		},

		incrementAugmented: (state, action) => {
			const {attribute} = action.payload;
			const augmentedAttribute = state.augmented[attribute];
			const nextIncrement = augmentedAttribute ? augmentedAttribute + 1 : 1;

			if (nextIncrement <= 4) {
				state.augmented[attribute] = nextIncrement;		
			}
		},
		decrementAugmented: (state, action) => {
			const {attribute, decreaseBy = 1} = action.payload;
			const augmentedAttribute = state.augmented[attribute];

			if (!augmentedAttribute) return;

			const nextDecrement = augmentedAttribute - decreaseBy;

			if (nextDecrement > 0) {
				state.augmented[attribute] = nextDecrement;
			} else {
				// This is effectively what it was before.
				// delete state.augmented[attribute];
				state.augmented[attribute] = null;
			}
		},
	},

	extraReducers: (builder) => {
		// I need to figure th is out...
		// builder.addCase();
		// 'purchaseGear/purchase': (state, action) => {
		// 	const {gear} = action.payload;
		// 	if (gear.ess) {
		// 		state.ess = state.ess + gear.ess;	
		// 	}
		// },
		// 'purchaseGear/sell': (state, action) => {
		// 	const {gear} = action.payload;
		// 	if (gear && gear.ess) {
		// 		state.ess = state.ess - gear.ess;
		// 	}
		// }
	}	
});

// const initialState = {
// 	bod: 0,
// 	agi: 0,
// 	rea: 0,
// 	str: 0,
// 	wil: 0,
// 	log: 0,
// 	int: 0,
// 	cha: 0,
// 	edg: 0,
// 	ess: 0,
// 	augmented: {},
// 	special: 0,
// 	baseSpent: 0,
// 	specialSpent: 0,
// 	conditionBonus: {},
// };

// const attributesReducer = (state = initialState, action) => {
// 	const {type, parameter} = action;
// 	switch (type) {
// 	case 'INCREMENT_ATTRIBUTE': {
// 		const {attribute, max, spend, maxCap} = parameter;
// 		const nextIncrement = state[attribute] + 1;
// 		if (nextIncrement > (maxCap ? max - 1 : max)) {
// 			return state;
// 		}

// 		const newState = Object.assign(
// 			{},
// 			state,
// 			{
// 				[attribute]: nextIncrement,
// 				[spend]: state[spend] + 1,
// 			},
// 		);
// 		return newState;
// 	}
// 	case 'DECREMENT_ATTRIBUTE': {
// 		const {attribute, spend} = parameter;
// 		const nextDecrement = state[attribute] - 1;
// 		if (nextDecrement < 0) {
// 			return state;
// 		}
// 		const newState = Object.assign(
// 			{},
// 			state,
// 			{
// 				[attribute]: nextDecrement,
// 				[spend]: state[spend] - 1,
// 			},
// 		);
// 		return newState;
// 	}
// 	case 'INCREMENT_AUGMENTED': {
// 		const {attribute} = parameter;
// 		const augmentedAttribute = state.augmented[attribute];
// 		let nextIncrement;

// 		if (augmentedAttribute) {
// 			nextIncrement = augmentedAttribute + 1;
// 		} else {
// 			nextIncrement = 1;
// 		}

// 		if (nextIncrement <= 4) {
// 			const newState = Object.assign(
// 				{},
// 				state,
// 				{
// 					augmented: Object.assign(
// 						{},
// 						state.augmented,
// 						{
// 							[attribute]: nextIncrement,
// 						},
// 					),
// 				},
// 			);

// 			return newState;
// 		}
// 		return state;
// 	}
// 	case 'DECREMENT_AUGMENTED': {
// 		const {attribute, decreaseBy = 1} = parameter;
// 		const augmentedAttribute = state.augmented[attribute];
// 		let nextDecrement,
// 			newState;

// 		if (augmentedAttribute) {
// 			nextDecrement = augmentedAttribute - decreaseBy;
// 		} else {
// 			return state;
// 		}

// 		if (nextDecrement > 0) {
// 			newState = Object.assign(
// 				{},
// 				state,
// 				{
// 					augmented: Object.assign(
// 						{},
// 						state.augmented,
// 						{
// 							[attribute]: nextDecrement,
// 						},
// 					),
// 				},
// 			);
// 		} else {
// 			newState = Object.assign(
// 				{},
// 				state,
// 				{
// 					augmented: Object.assign(
// 						{},
// 						state.augmented,
// 					),
// 				},
// 			);

// 			delete newState.augmented[attribute];
// 		}
// 		return newState;
// 	}
// 	case 'PURCHASE': {
// 		const {gear} = parameter;
// 		if (gear.ess) {
// 			return {
// 				...state,
// 				ess: state.ess + gear.ess,
// 			};
// 		}

// 		return state;
// 	}
// 	case 'SELL': {
// 		const {gear} = parameter;
// 		if (gear && gear.ess) {
// 			return {
// 				...state,
// 				ess: state.ess - gear.ess,
// 			};
// 		}

// 		return state;
// 	}
// 	default:
// 		return state;
// 	}
// };

// Turned off to use Slice.
// export default attributesReducer;

// Action creators are generated for each case reducer function
export const { incrementAttribute, decrementAttribute, incrementAugmented, decrementAugmented, purchaseGear, sellGear } = attributesSlice.actions

export default attributesSlice.reducer