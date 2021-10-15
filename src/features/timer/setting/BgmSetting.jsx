import React, { useState, useRef, useEffect } from 'react';
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
	const [isValidUrl, setIsValidUrl] = useState(null);
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
	};

	// dispatch string (YouTube video link) only it's valid.
	useEffect(() => {
		if (isValidUrl) {
			dispatch(set({ [bgmType]: customBgm }));
		} else {
			dispatch(set({ [bgmType]: '' }));
		}
	}, [isValidUrl]);

	// YouTube vieo link validation
	useEffect(() => {
		fetch(`https://www.youtube.com/oembed?url=${customBgm}&format=json`)
			.then((res) => {
				res.ok ? setIsValidUrl(true) : setIsValidUrl(false);
			})
			.catch((err) => console.error(err));
	}, [customBgm]);

	let ErrorMessage;
	if (selectedBgm === `${bgmType}-custom` && !customBgm) {
		ErrorMessage = (
			<div className="error-message">Please enter YouTube video link.</div>
		);
	} else if (selectedBgm === `${bgmType}-custom` && !isValidUrl) {
		ErrorMessage = (
			<div className="error-message">YouTube video link is not valid.</div>
		);
	}

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
			{ErrorMessage}
		</section>
	);
}
