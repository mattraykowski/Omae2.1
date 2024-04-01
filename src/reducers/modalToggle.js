import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modalName: '',
	modalContent: null,
};

const modalSlice = createSlice({
	name: 'modalToggle',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state = action.payload;
		},
		closeModal: (state) => {
			state.modalName = initialState.modalName;
			state.modalContent = initialState.modalContent;
		}
	}
})

// const modalReducer = (state = initialState, action) => {
// 	const actionsToTake = {
// 		MODAL_OPEN: (prevState, modal) => {
// 			return modal;
// 		},

// 		MODAL_CLOSE: () => {
// 			return initialState;
// 		},

// 		DEFAULT: (prevState) => { return prevState; },
// 	};
// 	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
// };

// export default modalReducer;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;