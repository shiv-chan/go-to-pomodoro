import React, { useState } from 'react';
import { set } from './timerSlice';
import { useDispatch } from 'react-redux';

export default function ShortBreakSetting() {
	const dispatch = useDispatch();
	const [shortBreak, setShortBreak] = useState('5');
	const [customTime, setCustomTime] = useState('');

	const handleRadioChange = (e) => {
		const { value, name } = e.currentTarget;
		if (name === 's-custom') {
			setShortBreak('');
		} else {
			setShortBreak(value);
		}
		const timeInSecond = parseInt(value) * 60;
		dispatch(set({ shortBreak: timeInSecond }));
	};

	const handleNumberChange = (e) => {
		const { value } = e.currentTarget;
		setCustomTime(value);
		const timeInSecond = parseInt(value) * 60;
		dispatch(set({ shortBreak: timeInSecond }));
	};

	return (
		<section className="time-setting">
			<h2>Short Break Time</h2>
			<div className="time-options">
				<div>
					<input
						type="radio"
						id="s5"
						name="s5"
						value="5"
						checked={shortBreak === '5'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="s5">
						5 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="s10"
						name="s10"
						value="10"
						checked={shortBreak === '10'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="s10">
						10 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="s15"
						name="s15"
						value="15"
						checked={shortBreak === '15'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="s15">
						15 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						name="s-custom"
						id="s-custom"
						value={customTime}
						onChange={handleRadioChange}
						checked={shortBreak === ''}
					/>
					<label htmlFor="s-custom">
						<input
							type="number"
							min="1"
							max="999"
							value={customTime}
							placeholder="Custom Time"
							onChange={handleNumberChange}
							onFocus={() => setShortBreak('')}
						/>
						<span> min</span>
					</label>
				</div>
			</div>
		</section>
	);
}
