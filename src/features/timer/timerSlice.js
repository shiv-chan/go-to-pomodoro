import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// set time in second
	focus: 1500,
	shortBreak: 300,
	longBreak: 1800,
	// youtube IDs
	focusBgm: '',
	shortBreakBgm: '',
	longBreakBgm: '',
	// current session
	currentSession: 'focus',
	haveRing: 'on',
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
