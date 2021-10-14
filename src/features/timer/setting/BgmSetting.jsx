import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../timerSlice';

export default function BgmSetting({
	title,
	bgmOptions,
	defaultOption,
	bgmType,
}) {
	const bgm = useSelector((state) => state.timer[bgmType]);
	const session = useSelector((state) => state.timer.currentSession);
	const dispatch = useDispatch();
	const [selectedBgm, setSelectedBgm] = useState(defaultOption);
	const [customBgm, setCustomBgm] = useState('');
	const refInput = useRef();

	const handleSelectChange = (e) => {
		const { value } = e.currentTarget;
		setSelectedBgm(value);
		if (value !== `${bgmType}-custom`) {
			dispatch(set({ [bgmType]: value }));
			setCustomBgm('');
		} else {
			dispatch(set({ [bgmType]: '' }));
			refInput.current.focus();
		}
	};

	const handleInputChange = (e) => {
		const { value } = e.currentTarget;
		setCustomBgm(value);
		dispatch(set({ [bgmType]: value }));
	};

	return (
		<section className={`bgm-setting ${session}`}>
			<h2>{title}</h2>
			<select
				value={selectedBgm}
				onChange={handleSelectChange}
				className={`${bgm !== '' ? 'selected' : ''}`}
			>
				<option value="" disabled>
					Select YouTube Video
				</option>
				{bgmOptions.map((option) => (
					<option key={option[0]} value={option[1]}>
						{option[0]}
					</option>
				))}
				<option value={`${bgmType}-custom`}>Custom BGM</option>
			</select>
			<input
				type="text"
				placeholder="Place YouTube Video Link"
				value={customBgm}
				onChange={handleInputChange}
				ref={refInput}
				className={`${
					selectedBgm === `${bgmType}-custom` ? 'shown' : 'hidden'
				}`}
			/>
			{selectedBgm === `${bgmType}-custom` && !bgm ? (
				<div className="error-message">Please enter YouTube video link.</div>
			) : (
				''
			)}
		</section>
	);
}
