import { createSlice } from '@reduxjs/toolkit';

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

export const appControlSlice = createSlice({
	name: 'appControl',
	initialState: {
		summaryFix: false,
	  styleTheme: '',
	},
	reducers: {
		fixSummary: (state, action) => {
			state.summaryFix = action.payload.summaryFix;
		},
		setStyle: (state, action) => {
			state.styleTheme = action.payload.styleTheme;
		}
	}
});


const initialState = {
	summaryFix: false,
	styleTheme: '',
};


const attributesReducer = (state = initialState, action) => {
	const actionsToTake = {
		FIX_SUMMARY(pervState, {summaryFix}) {
			if (summaryFix !== pervState.summaryFix) {
				return Object.assign(
					{},
					pervState,
					{ summaryFix },
				);
			}
			return pervState;
		},

		STYLE(pervState, {styleTheme}) {
			return Object.assign(
				{},
				pervState,
				{ styleTheme },
			);
		},

		DEFAULT() { return state; },
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

// export default attributesReducer;

export const { setStyle, fixSummary } = appControlSlice.actions;

export default appControlSlice.reducer;