import React, { useState, useRef } from 'react';
import { set } from './timerSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function LongBreakSetting() {
	const time = useSelector((state) => state.timer.longBreak);
	const dispatch = useDispatch();
	const refInput = useRef();
	const [longBreakTime, setLongBreakTime] = useState('30');
	const [customTime, setCustomTime] = useState('');

	const handleRadioChange = (e) => {
		const { value, name } = e.currentTarget;
		if (name === 'l-custom') {
			setLongBreakTime('');
			refInput.current.focus();
		} else {
			setLongBreakTime(value);
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

	let ErrorMessage;
	if (!time) {
		ErrorMessage = <div className="error-message">Please set a time.</div>;
	} else if (time <= 0 || time >= 999 * 60) {
		ErrorMessage = (
			<div className="error-message">Time should be up to 999 min.</div>
		);
	}

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
						checked={longBreakTime === '20'}
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
						checked={longBreakTime === '30'}
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
						checked={longBreakTime === '40'}
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
						checked={longBreakTime === ''}
					/>
					<label htmlFor="l-custom">
						<input
							type="number"
							min="1"
							max="999"
							value={customTime}
							placeholder="Custom Time"
							onChange={handleNumberChange}
							onFocus={handleRadioChange}
							ref={refInput}
						/>
						<span> min</span>
					</label>
					{ErrorMessage}
				</div>
			</div>
		</section>
	);
}
