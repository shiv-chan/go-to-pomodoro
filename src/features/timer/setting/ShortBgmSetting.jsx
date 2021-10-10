import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../timerSlice';

export default function ShortBgmSetting() {
	const bgm = useSelector((state) => state.timer.shortBreakBgm);
	const session = useSelector((state) => state.timer.currentSession);
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
		<section className={`bgm-setting ${session}`}>
			<h2>Short Break BGM</h2>
			<select
				value={shortBgm}
				onChange={handleSelectChange}
				className={`${bgm !== '' ? 'selected' : ''}`}
			>
				<option value="" disabled>
					Select YouTube Video
				</option>
				<option value="https://www.youtube.com/watch?v=5yx6BWlEVcY">
					Chillhop Radio - jazzy & lofi hip pop beats
				</option>
				<option value="https://www.youtube.com/watch?v=5iS1KfG7wQs">
					CHILL OUT
				</option>
				<option value="shttps://www.youtube.com/watch?v=p7TAvWdilcY">
					Studio Ghibli Relaxing Music
				</option>
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
