import React, { useState } from 'react';
import { set } from './timerSlice';
import { useDispatch } from 'react-redux';

export default function LongBreakSetting() {
	const dispatch = useDispatch();
	const [longBreak, setLongBreak] = useState('30');

	const handleChange = (e) => {
		const { value } = e.currentTarget;
		setLongBreak(value);
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
						onChange={handleChange}
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
						onChange={handleChange}
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
						onChange={handleChange}
					/>
					<label htmlFor="l40">
						40 <span className="min">min</span>
					</label>
				</div>
				{/* <div>
            <input type="radio" name="l-custom" value="" />
            <input type="number" min="1" max="999" value="" placeholder="Custom Time"/>
          </div> */}
			</div>
		</section>
	);
}
