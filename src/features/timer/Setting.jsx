import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import FocusTimeSetting from './FocusTimeSetting';
import ShortBreakSetting from './ShortBreakSetting';
import LongBreakSetting from './LongBreakSetting';
import FocusBgmSetting from './FocusBgmSetting';
import ShortBgmSetting from './ShortBgmSetting';
import LongBgmSetting from './LongBgmSetting';

export default function Setting() {
	const timer = useSelector((state) => state.timer);
	console.log(timer);

	return (
		<main className="container">
			<h1>Set a Timer</h1>
			<FocusTimeSetting />
			<ShortBreakSetting />
			<LongBreakSetting />
			<FocusBgmSetting />
			<ShortBgmSetting />
			<LongBgmSetting />
			<Link to="/timer">
				<button>Set</button>
			</Link>
		</main>
	);
}
