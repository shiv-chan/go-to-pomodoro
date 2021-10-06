import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// set time in second
	focus: 5, // 1500s
	shortBreak: 6, // 300s
	longBreak: 7, // 1800s
	// youtube IDs
	focusBgm: 'https://www.youtube.com/watch?v=P8j-_MOSrec',
	shortBreakBgm: 'https://www.youtube.com/watch?v=UKONj4OA3y4',
	longBreakBgm: 'https://www.youtube.com/watch?v=7voSN82FGF0',
	// current session
	currentSession: 'focus',
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
