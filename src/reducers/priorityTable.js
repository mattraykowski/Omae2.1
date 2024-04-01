import { createSlice } from '@reduxjs/toolkit';

export const prioritySlice = createSlice({
	name: 'priorityTable',
	initialState: {
		metatype: 'A',
		attribute: 'B',
		magres: 'C',
		skills: 'D',
		resources: 'E',
	},
	reducers: {
		setPriority: (state, action) => {
			const {rating, category} = action.payload;
			state[category] = rating;
		}
	}
});

export const { setPriority } = prioritySlice.actions;

export default prioritySlice.reducer;
