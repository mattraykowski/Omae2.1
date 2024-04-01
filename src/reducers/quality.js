import { createSlice } from '@reduxjs/toolkit';


const qualitySlice = createSlice({
	name: 'quality',
	initialState: {
		Positive: [],
		Negative: [],
		karma: {
			Positive: 0,
			Negative: 0,
		},
	},
	reducers: {
		selectQuality: (state, action) => {
			const newQuality = action.payload.newQuality;
			const { category, karma } = newQuality;

			state[category].push(newQuality);
			state.karma[category] = state.karma[category] + Number(karma);
		},
		removeQuality: (state, action) => {
			const {qualityIndex, category} = action.payload;
			const removeQualityKarma = state[category][qualityIndex].karma;

			state[category].splice(qualityIndex, 1);
			state.karma[category] = state.karma[category] - Number(removeQualityKarma);
		}
	}
});

export const { selectQuality, removeQuality } = qualitySlice.actions;

export default qualitySlice.reducer;