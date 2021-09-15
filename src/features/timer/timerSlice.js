import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// set time in second
	focus: 1500,
	short: 300,
	long: 1800,
	// time left in second
	focusLeft: 1500,
	shortLeft: 300,
	longLeft: 1800,
	// start, pause, resume flags
	isFocusTicking: false,
	isShortTicking: false,
	isLongTicking: false,
	// youtube IDs
	focusBgm: '',
	shortBgm: '',
	longBgm: '',
};

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		set: {
			reducer(state, action) {
				state = action.payload;
			},
			prepare(focus, short, long, focusBgm, shortBgm, longBgm) {
				return {
					payload: {
						focus,
						short,
						long,
						focusLeft: focus,
						shortLeft: short,
						longLeft: long,
						isFocusTicking: false,
						isShortTicking: false,
						isLongTicking: false,
						focusBgm,
						shortBgm,
						longBgm,
					},
				};
			},
		},
		focusCount: (state) => {
			count(state.focusLeft, state.isFocusTicking);
		},
		toggleFocus: (state) => {
			toggleTicking(state.isFocusTicking);
		},
		shortCount: (state) => {
			count(state.shortLeft, state.isShortTicking);
		},
		toggleShort: (state) => {
			toggleTicking(state.isShortTicking);
		},
		longCount: (state) => {
			count(state.longLeft, state.isLongTicking);
		},
		toggleLong: (state) => {
			toggleTicking(state.isLongTicking);
		},
	},
});

export const {
	set,
	focusCount,
	toggleFocus,
	shortCount,
	toggleShort,
	longCount,
	toggleLong,
} = timerSlice.actions;
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
