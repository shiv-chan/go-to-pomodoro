import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../features/timer/timerSlice';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import BellIcon from './BellIcon';

export default function VolumeSlider({ player }) {
	const [value, setValue] = useState(30);
	const [isMuted, setIsMuted] = useState(false);
	const firstRender = useRef(true);
	const session = useSelector((state) => state.timer.currentSession);
	const haveRing = useSelector((state) => state.timer.haveRing);
	const dispatch = useDispatch();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleClick = () => {
		setIsMuted((prevState) => !prevState);
	};

	const iconLabelHandler = () => {
		dispatch(set({ haveRing: `${haveRing === 'on' ? 'off' : 'on'}` }));
	};

	useEffect(() => {
		if (isMuted) {
			setValue(0);
		} else {
			setValue(30);
		}
	}, [isMuted]);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		} else {
			if (value <= 0) {
				player.mute();
				player.setVolume(0);
				setIsMuted(true);
			} else {
				player.unMute();
				player.setVolume(value);
				setIsMuted(false);
			}
		}
	}, [value]);

	let sliderColor;
	if (session === 'focus') {
		sliderColor = 'var(--main-accent-color)';
	} else if (session === 'short') {
		sliderColor = 'var(--short-color)';
	} else if (session === 'long') {
		sliderColor = 'var(--long-color)';
	}

	const iconStyle = {
		fontSize: '2.5rem',
		color: `${sliderColor}`,
		cursor: 'pointer',
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stack spacing={2} direction="row" sx={{ mt: 2 }} alignItems="center">
				{isMuted || value === 0 ? (
					<VolumeOffRoundedIcon onClick={handleClick} sx={iconStyle} />
				) : (
					<VolumeUpRoundedIcon onClick={handleClick} sx={iconStyle} />
				)}
				<Slider
					aria-label="Volume"
					value={value}
					min={0}
					max={100}
					step={1}
					valueLabelDisplay="auto"
					onChange={handleChange}
					sx={{ width: 200, color: `${sliderColor}` }}
				/>
			</Stack>
			<Stack spacing={2} direction="row" alignItems="center">
				<BellIcon />
				<strong
					style={{
						fontSize: '1.5rem',
						width: 'auto',
						color: `${sliderColor}`,
						cursor: 'pointer',
					}}
					onClick={iconLabelHandler}
				>
					Ring a bell?
				</strong>
			</Stack>
		</Box>
	);
}
