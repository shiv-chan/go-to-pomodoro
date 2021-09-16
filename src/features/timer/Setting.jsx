import React from 'react';
import FocusTimeSetting from './FocusTimeSetting';
import ShortBreakSetting from './ShortBreakSetting';
import LongBreakSetting from './LongBreakSetting';
import { useSelector } from 'react-redux';

export default function Setting() {
	const timer = useSelector((state) => state.timer);
	console.log(timer);

	return (
		<main className="container">
			<h1>Set a Timer</h1>
			<FocusTimeSetting />
			<ShortBreakSetting />
			<LongBreakSetting />
		</main>
	);
}
