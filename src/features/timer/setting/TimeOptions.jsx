import React, { useState, useRef } from 'react';
import { set } from '../timerSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function TimeOptions({
	title,
	timeOptions,
	defaultOption,
	sessionType,
}) {
	const time = useSelector((state) => state.timer[sessionType]);
	const session = useSelector((state) => state.timer.currentSession);
	const dispatch = useDispatch();
	const refInput = useRef();
	const [selectedTime, setSelectedTime] = useState(defaultOption);
	const [customTime, setCustomTime] = useState('');

	const handleRadioChange = (e) => {
		const { value, name } = e.currentTarget;
		if (name === `${sessionType}-custom`) {
			setSelectedTime('');
			refInput.current.focus();
		} else {
			setSelectedTime(value);
		}
		const timeInSecond = parseInt(value) * 60;
		dispatch(set({ [sessionType]: timeInSecond }));
	};

	const handleNumberChange = (e) => {
		const { value } = e.currentTarget;
		setCustomTime(value);
		const timeInSecond = parseFloat(value) * 60;
		dispatch(set({ [sessionType]: timeInSecond }));
	};

	let ErrorMessage;
	if (!time && time !== 0) {
		ErrorMessage = <div className="error-message">Please set a time.</div>;
	} else if (time < 1 || time >= 999 * 60) {
		ErrorMessage = (
			<div className="error-message">Time should be 1 sec to 999 min.</div>
		);
	}

	const inputIdForCustom = `${sessionType}-custom`;

	return (
		<section className="time-setting">
			<h2>{title}</h2>
			<div className={`time-options ${session}`}>
				{timeOptions.map((option) => {
					const inputId = `${sessionType}-${option}`;
					return (
						<div
							key={option}
							className={`${selectedTime === option ? 'selected' : ''}`}
						>
							<input
								type="radio"
								id={inputId}
								name={inputId}
								value={option}
								checked={selectedTime === option}
								onChange={handleRadioChange}
							/>
							<label htmlFor={inputId}>
								{option} <span className="min">min</span>
							</label>
						</div>
					);
				})}
				<div className={`${selectedTime === '' ? 'selected' : ''}`}>
					<input
						type="radio"
						name={inputIdForCustom}
						id={inputIdForCustom}
						value={customTime}
						onChange={handleRadioChange}
						checked={selectedTime === ''}
					/>
					<label htmlFor={inputIdForCustom}>
						<input
							type="number"
							min="1"
							max="999"
							name={inputIdForCustom}
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
