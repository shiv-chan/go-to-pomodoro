import React, { useState } from 'react';
import { set } from './timerSlice';
import { useDispatch } from 'react-redux';

export default function FocusSetting() {
	const dispatch = useDispatch();
	const [focus, setFocus] = useState('25');

	const handleChange = (e) => {
		const { value } = e.currentTarget;
		setFocus(value);
		const timeInSecond = parseInt(value) * 60;
		dispatch(set({ focus: timeInSecond }));
	};

	return (
		<section className="time-setting">
			<h2>Focus Time</h2>
			<div className="time-options">
				<div>
					<input
						type="radio"
						id="f10"
						name="f10"
						value="10"
						checked={focus === '10'}
						onChange={handleChange}
					/>
					<label htmlFor="f10">
						10 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="f15"
						name="f15"
						value="15"
						checked={focus === '15'}
						onChange={handleChange}
					/>
					<label htmlFor="f15">
						15 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="f20"
						name="f20"
						value="20"
						checked={focus === '20'}
						onChange={handleChange}
					/>
					<label htmlFor="f20">
						20 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="f25"
						name="f25"
						value="25"
						checked={focus === '25'}
						onChange={handleChange}
					/>
					<label htmlFor="f25">
						25 <span className="min">min</span>
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="f30"
						name="f30"
						value="30"
						checked={focus === '30'}
						onChange={handleChange}
					/>
					<label htmlFor="f30">
						30 <span className="min">min</span>
					</label>
				</div>
				{/* <div>
            <input type="radio" name="f-custom" value="" />
            <input type="number" min="1" max="999" value="" placeholder="Custom Time"/>
          </div> */}
			</div>
		</section>
	);
}
