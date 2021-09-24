import React, { useState, useRef } from 'react';
import { set } from '../timerSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function ShortBreakSetting() {
	const time = useSelector((state) => state.timer.shortBreak);
	const dispatch = useDispatch();
	const refInput = useRef();
	const [shortBreakTime, setShortBreakTime] = useState('5');
	const [customTime, setCustomTime] = useState('');

	const handleRadioChange = (e) => {
		const { value, name } = e.currentTarget;
		if (name === 's-custom') {
			setShortBreakTime('');
			refInput.current.focus();
		} else {
			setShortBreakTime(value);
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
			<h2>Short Break Time</h2>
			<div className="time-options">
				<div>
					<input
						type="radio"
						id="s5"
						name="s5"
						value="5"
						checked={shortBreakTime === '5'}
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
						checked={shortBreakTime === '10'}
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
						checked={shortBreakTime === '15'}
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
						checked={shortBreakTime === ''}
					/>
					<label htmlFor="s-custom">
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
