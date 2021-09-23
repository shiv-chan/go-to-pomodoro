import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// set time in second
	focus: 5,
	shortBreak: 300,
	longBreak: 1800,
	// youtube IDs
	focusBgm: '',
	shortBreakBgm: '',
	longBreakBgm: '',
};

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		set: (state, action) => {
			return (state = {
				...state,
				...action.payload,
			});
		},
	},
});

export const { set } = timerSlice.actions;
export default timerSlice.reducer;
