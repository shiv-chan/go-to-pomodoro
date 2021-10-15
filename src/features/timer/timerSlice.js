import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// set time in second
	focus: 1500,
	shortBreak: 300,
	longBreak: 1800,
	// youtube IDs
	focusBgm: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
	shortBreakBgm: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
	longBreakBgm: 'https://www.youtube.com/watch?v=DWcJFNfaw9c',
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
