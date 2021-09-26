import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// set time in second
	focus: 1500, // 1500s
	shortBreak: 300, // 300s
	longBreak: 1800, // 1800s
	// youtube IDs
	focusBgm: 'https://www.youtube.com/watch?v=NOS1H47dCRA',
	shortBreakBgm: 'https://www.youtube.com/watch?v=UKONj4OA3y4',
	longBreakBgm: 'https://www.youtube.com/watch?v=7voSN82FGF0',
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
