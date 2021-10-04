import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';

export default function VolumeSlider({ player }) {
	const [value, setValue] = useState(30);
	const [isMuted, setIsMuted] = useState(false);
	const firstRender = useRef(true);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleClick = () => {
		setIsMuted((prevState) => !prevState);
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
			if (value === 0) {
				player.mute();
			} else {
				player.unMute();
				player.setVolume(value);
			}
		}
	}, [value]);

	return (
		<Box sx={{ width: 200 }}>
			<Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
				{isMuted || value === 0 ? (
					<VolumeOffRoundedIcon onClick={handleClick} />
				) : (
					<VolumeUpRoundedIcon onClick={handleClick} />
				)}
				<Slider
					aria-label="Volume"
					value={value}
					min={0}
					max={100}
					step={1}
					valueLabelDisplay="auto"
					onChange={handleChange}
				/>
			</Stack>
		</Box>
	);
}
