import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../timerSlice';

export default function LongBgmSetting() {
	const bgm = useSelector((state) => state.timer.longBreakBgm);
	const session = useSelector((state) => state.timer.currentSession);
	const dispatch = useDispatch();
	const [longBgm, setLongBgm] = useState('');
	const [customLongBgm, setCustomLongBgm] = useState('');
	const refInput = useRef();

	const handleSelectChange = (e) => {
		const { value } = e.currentTarget;
		setLongBgm(value);
		if (value !== 'long-custom') {
			dispatch(set({ longBreakBgm: value }));
			setCustomLongBgm('');
		} else {
			dispatch(set({ longBreakBgm: '' }));
			refInput.current.focus();
		}
	};

	const handleInputChange = (e) => {
		const { value } = e.currentTarget;
		setCustomLongBgm(value);
		dispatch(set({ longBreakBgm: value }));
	};

	return (
		<section className={`bgm-setting ${session}`}>
			<h2>Long Break BGM</h2>
			<select
				value={longBgm}
				onChange={handleSelectChange}
				className={`${bgm !== '' ? 'selected' : ''}`}
			>
				<option value="" disabled>
					Select YouTube Video
				</option>
				<option value="https://www.youtube.com/watch?v=DWcJFNfaw9c">
					lofi hip hop radio - beats to sleep/chill to
				</option>
				<option value="https://www.youtube.com/watch?v=l7TxwBhtTUY">
					lofi hip hop radio - sad & sleepy beats
				</option>
				<option value="https://www.youtube.com/watch?v=devf3da7bTs">
					Studio Ghibli Summer Night Deep Sleep Piano Collection Covered by kno
				</option>
				<option value="long-custom">Long Break Custom</option>
			</select>
			<input
				type="text"
				placeholder="Place YouTube Video Link"
				value={customLongBgm}
				onChange={handleInputChange}
				ref={refInput}
				className={`${longBgm === 'long-custom' ? 'shown' : 'hidden'}`}
			/>
			{longBgm === 'long-custom' && !bgm ? (
				<div className="error-message">Please enter YouTube video link.</div>
			) : (
				''
			)}
		</section>
	);
}
