import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../features/timer/timerSlice';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import NotificationsOffRoundedIcon from '@mui/icons-material/NotificationsOffRounded';

export default function BellIcon() {
	const session = useSelector((state) => state.timer.currentSession);
	const haveRing = useSelector((state) => state.timer.haveRing);
	const dispatch = useDispatch();

	let iconColor;
	if (session === 'focus') {
		iconColor = 'var(--main-accent-color)';
	} else if (session === 'short') {
		iconColor = 'var(--short-color)';
	} else if (session === 'long') {
		iconColor = 'var(--long-color)';
	}

	const iconHandler = () => {
		dispatch(set({ haveRing: `${haveRing === 'on' ? 'off' : 'on'}` }));
	};

	const iconStyle = {
		textAlign: 'start',
		my: 2,
		fontSize: '2.5rem',
		color: `${iconColor}`,
		cursor: 'pointer',
	};

	return haveRing === 'on' ? (
		<NotificationsActiveRoundedIcon onClick={iconHandler} sx={iconStyle} />
	) : (
		<NotificationsOffRoundedIcon onClick={iconHandler} sx={iconStyle} />
	);
}
