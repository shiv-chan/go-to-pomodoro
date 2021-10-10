import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../../../timer/timerSlice';

export default function FocusBgmSetting() {
	const bgm = useSelector((state) => state.timer.focusBgm);
	const session = useSelector((state) => state.timer.currentSession);
	const dispatch = useDispatch();
	const [focusBgm, setFocusBgm] = useState('');
	const [customFocusBgm, setCustomFocusBgm] = useState('');
	const refInput = useRef();

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
		<section className={`bgm-setting ${session}`}>
			<h2>Focus BGM</h2>
			<select
				value={focusBgm}
				onChange={handleSelectChange}
				className={`${bgm !== '' ? 'selected' : ''}`}
			>
				<option value="" disabled>
					Select YouTube Video
				</option>
				<option value="https://www.youtube.com/watch?v=5qap5aO4i9A">
					lofi hip hop radio - beasts to relax/study to
				</option>
				<option value="https://www.youtube.com/watch?v=21qNxnCS8WU">
					CHILL RADIO 24/7
				</option>
				<option value="https://www.youtube.com/watch?v=P8j-_MOSrec">
					STUDIO GHIBLI MUSIC 24/7 ~ Relaxing Music for Sleep & Study
				</option>
				<option value="focus-custom">Focus Custom</option>
			</select>
			<input
				type="text"
				placeholder="Place YouTube Video Link"
				value={customFocusBgm}
				onChange={handleInputChange}
				ref={refInput}
				className={`${focusBgm === 'focus-custom' ? 'shown' : 'hidden'}`}
			/>
			{focusBgm === 'focus-custom' && !bgm ? (
				<div className="error-message">Please enter YouTube video link.</div>
			) : (
				''
			)}
		</section>
	);
}
