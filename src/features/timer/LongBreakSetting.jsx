import React, { useState } from 'react';
import { set } from './timerSlice';
import { useDispatch } from 'react-redux';

export default function LongBreakSetting() {
	const dispatch = useDispatch();
	const [longBreak, setLongBreak] = useState('30');
	const [customTime, setCustomTime] = useState('');

	const handleRadioChange = (e) => {
		const { value, name } = e.currentTarget;
		if (name === 'l-custom') {
			setLongBreak('');
		} else {
			setLongBreak(value);
		}
		const timeInSecond = parseInt(value) * 60;
		dispatch(set({ longBreak: timeInSecond }));
	};

	const handleNumberChange = (e) => {
		const { value } = e.currentTarget;
		setCustomTime(value);
		const timeInSecond = parseInt(value) * 60;
		dispatch(set({ longBreak: timeInSecond }));
	};

	return (
		<section className="time-setting">
			<h2>Long Break Time</h2>
			<div className="time-options">
				<div>
					<input
						type="radio"
						id="l20"
						name="l20"
						value="20"
						checked={longBreak === '20'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="l20">
						20 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="l30"
						name="l30"
						value="30"
						checked={longBreak === '30'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="l30">
						30 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="l40"
						name="l40"
						value="40"
						checked={longBreak === '40'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="l40">
						40 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						name="l-custom"
						id="l-custom"
						value={customTime}
						onChange={handleRadioChange}
						checked={longBreak === ''}
					/>
					<label htmlFor="l-custom">
						<input
							type="number"
							min="1"
							max="999"
							value={customTime}
							placeholder="Custom Time"
							onChange={handleNumberChange}
							onFocus={() => setLongBreak('')}
						/>
						<span> min</span>
					</label>
				</div>
			</div>
		</section>
	);
}
