import { createSlice } from "@reduxjs/toolkit";
import { selectMetatype } from "./selectMetatype";

const karmaSlice = createSlice({
	name: 'karma',
	initialState: 25,
	reducers: {
		setKarma: (state, action) => state += action.payload.karmaPoints,
	},
	extraReducers: builder => {
		builder.addCase(selectMetatype, (state, action) =>
			state + (action.payload.karmaOldCost - action.payload.karmaNewCost)
		)
	}
});

export const { setKarma } = karmaSlice.actions;

export default karmaSlice.reducer;
