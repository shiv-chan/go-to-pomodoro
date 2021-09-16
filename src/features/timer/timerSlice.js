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

// countdown function
function count(timeLeft, isTicking) {
	let remaining = timeLeft;
	const focusTimeCounter = setInterval(() => {
		if (timeLeft === 0 || !isTicking) clearInterval(focusTimeCounter);
		timeLeft = remaining - 1;
	}, 1000);
}

// toggle countdown flag function
function toggleTicking(flag) {
	flag = !flag;
}
