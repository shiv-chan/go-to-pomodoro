import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { set } from './timerSlice';

export default function LongBgmSetting() {
	const dispatch = useDispatch();
	const [longBgm, setLongBgm] = useState('');
	const [customLongBgm, setCustomLongBgm] = useState('');
	const refInput = useRef(null);

	const handleSelectChange = (e) => {
		const { value } = e.currentTarget;
		setLongBgm(value);
		if (value !== 'long-custom') {
			dispatch(set({ longBgm: value }));
			setCustomLongBgm('');
		} else {
			dispatch(set({ longBgm: '' }));
			refInput.current.focus();
		}
	};

	const handleInputChange = (e) => {
		const { value } = e.currentTarget;
		setCustomLongBgm(value);
		dispatch(set({ longBgm: value }));
	};

	return (
		<section className="bgm-setting">
			<h2>Long Break BGM</h2>
			<select value={longBgm} onChange={handleSelectChange}>
				<option value="" disabled>
					Select YouTube Video
				</option>
				<option value="long-sample-1">Long Break Sample 1</option>
				<option value="long-sample-2">Long Break Sample 2</option>
				<option value="long-sample-3">Long Break Sample 3</option>
				<option value="long-custom">Long Break Custom</option>
			</select>
			<input
				type="text"
				placeholder="Place YouTube Video Link"
				value={customLongBgm}
				onChange={handleInputChange}
				ref={refInput}
				className={`${longBgm === 'long-custom' ? 'show' : 'hidden'}`}
			/>
		</section>
	);
}
