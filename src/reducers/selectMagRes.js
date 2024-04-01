import { createSlice } from "@reduxjs/toolkit";

const magicSlice = createSlice({
	name: 'selectMagRes',
	initialState: 'Mage',
	reducers: {
		selectMagicType: (_, action) => {
			return action.payload;
		}
	}
});

export const { selectMagicType } = magicSlice.actions;

export default magicSlice.reducer;

