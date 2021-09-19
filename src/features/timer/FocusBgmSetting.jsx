import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { set } from './timerSlice';

export default function FocusBgmSetting() {
	const dispatch = useDispatch();
	const [focusBgm, setFocusBgm] = useState('');
	const [customFocusBgm, setCustomFocusBgm] = useState('');
	const refInput = useRef(null);

	const handleSelectChange = (e) => {
		const { value } = e.currentTarget;
		setFocusBgm(value);
		if (value !== 'focus-custom') {
			dispatch(set({ focusBgm: value }));
			setCustomFocusBgm('');
		} else {
			dispatch(set({ focusBgm: '' }));
			refInput.current.focus();
		}
	};

	const handleInputChange = (e) => {
		const { value } = e.currentTarget;
		setCustomFocusBgm(value);
		dispatch(set({ focusBgm: value }));
	};

	return (
		<section className="bgm-setting">
			<h2>Focus BGM</h2>
			<select value={focusBgm} onChange={handleSelectChange}>
				<option value="" disabled>
					Select YouTube Video
				</option>
				<option value="focus-sample-1">Focus Sample 1</option>
				<option value="focus-sample-2">Focus Sample 2</option>
				<option value="focus-sample-3">Focus Sample 3</option>
				<option value="focus-custom">Focus Custom</option>
			</select>
			<input
				type="text"
				placeholder="Place YouTube Video Link"
				value={customFocusBgm}
				onChange={handleInputChange}
				ref={refInput}
				className={`${focusBgm === 'focus-custom' ? 'show' : 'hidden'}`}
			/>
		</section>
	);
}
