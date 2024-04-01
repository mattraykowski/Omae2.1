import { createSlice } from "@reduxjs/toolkit";

const metatypeSlice = createSlice({
	name: 'selectMetatype',
	initialState: {
		typeName: 'human',
		priority: 'A',
	},
	reducers: {
		selectMetatype: (state, action) => {
			state.typeName = action.payload.typeName;
			state.priority = action.payload.priority;
		}
	}
})

export const { selectMetatype } = metatypeSlice.actions;

export default metatypeSlice.reducer;