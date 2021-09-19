import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from './timerSlice';

export default function ShortBgmSetting() {
	const bgm = useSelector((state) => state.timer.shortBreakBgm);
	const dispatch = useDispatch();
	const [shortBgm, setShortBgm] = useState('');
	const [customShortBgm, setCustomShortBgm] = useState('');
	const refInput = useRef();

	const handleSelectChange = (e) => {
		const { value } = e.currentTarget;
		setShortBgm(value);
		if (value !== 'short-custom') {
			dispatch(set({ shortBreakBgm: value }));
			setCustomShortBgm('');
		} else {
			dispatch(set({ shortBreakBgm: '' }));
			refInput.current.focus();
		}
	};

	const handleInputChange = (e) => {
		const { value } = e.currentTarget;
		setCustomShortBgm(value);
		dispatch(set({ shortBreakBgm: value }));
	};

	return (
		<section className="bgm-setting">
			<h2>Short Break BGM</h2>
			<select value={shortBgm} onChange={handleSelectChange}>
				<option value="" disabled>
					Select YouTube Video
				</option>
				<option value="short-sample-1">Short Break Sample 1</option>
				<option value="short-sample-2">Short Break Sample 2</option>
				<option value="short-sample-3">Short Break Sample 3</option>
				<option value="short-custom">Short Break Custom</option>
			</select>
			<input
				type="text"
				placeholder="Place YouTube Video Link"
				value={customShortBgm}
				onChange={handleInputChange}
				ref={refInput}
				className={`${shortBgm === 'short-custom' ? 'shown' : 'hidden'}`}
			/>
			{shortBgm === 'short-custom' && !bgm ? (
				<div className="error-message">Please enter YouTube video link.</div>
			) : (
				''
			)}
		</section>
	);
}
