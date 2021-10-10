import React, { useState, useRef } from 'react';
import { set } from '../../../timer/timerSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function FocusSetting() {
	const time = useSelector((state) => state.timer.focus);
	const session = useSelector((state) => state.timer.currentSession);
	const dispatch = useDispatch();
	const refInput = useRef();
	const [focusTime, setFocusTime] = useState('25');
	const [customTime, setCustomTime] = useState('');

	const handleRadioChange = (e) => {
		const { value, name } = e.currentTarget;
		if (name === 'f-custom') {
			setFocusTime('');
			refInput.current.focus();
		} else {
			setFocusTime(value);
		}
		const timeInSecond = parseInt(value) * 60;
		dispatch(set({ focus: timeInSecond }));
	};

	const handleNumberChange = (e) => {
		const { value } = e.currentTarget;
		setCustomTime(value);
		const timeInSecond = parseFloat(value) * 60;
		dispatch(set({ focus: timeInSecond }));
	};

	let ErrorMessage;
	if (!time && time !== 0) {
		ErrorMessage = <div className="error-message">Please set a time.</div>;
	} else if (time < 1 || time >= 999 * 60) {
		ErrorMessage = (
			<div className="error-message">Time should be 1 sec to 999 min.</div>
		);
	}

	return (
		<section className="time-setting">
			<h2>Focus Time</h2>
			<div className={`time-options ${session}`}>
				<div className={`${focusTime === '10' ? 'selected' : ''}`}>
					<input
						type="radio"
						id="f10"
						name="f10"
						value="10"
						checked={focusTime === '10'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="f10">
						10 <span className="min">min</span>
					</label>
				</div>
				<div className={`${focusTime === '15' ? 'selected' : ''}`}>
					<input
						type="radio"
						id="f15"
						name="f15"
						value="15"
						checked={focusTime === '15'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="f15">
						15 <span className="min">min</span>
					</label>
				</div>
				<div className={`${focusTime === '20' ? 'selected' : ''}`}>
					<input
						type="radio"
						id="f20"
						name="f20"
						value="20"
						checked={focusTime === '20'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="f20">
						20 <span className="min">min</span>
					</label>
				</div>
				<div className={`${focusTime === '25' ? 'selected' : ''}`}>
					<input
						type="radio"
						id="f25"
						name="f25"
						value="25"
						checked={focusTime === '25'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="f25">
						25 <span className="min">min</span>
					</label>
				</div>
				<div className={`${focusTime === '30' ? 'selected' : ''}`}>
					<input
						type="radio"
						id="f30"
						name="f30"
						value="30"
						checked={focusTime === '30'}
						onChange={handleRadioChange}
					/>
					<label htmlFor="f30">
						30 <span className="min">min</span>
					</label>
				</div>
				<div className={`${focusTime === '' ? 'selected' : ''}`}>
					<input
						type="radio"
						name="f-custom"
						id="f-custom"
						value={customTime}
						onChange={handleRadioChange}
						checked={focusTime === ''}
					/>
					<label htmlFor="f-custom">
						<input
							type="number"
							min="1"
							max="999"
							name="f-custom"
							value={customTime}
							placeholder="Custom Time"
							onChange={handleNumberChange}
							onFocus={handleRadioChange}
							ref={refInput}
						/>
						{ErrorMessage}
					</label>
				</div>
			</div>
		</section>
	);
}
