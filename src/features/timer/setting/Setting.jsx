import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../timerSlice';
import styled from 'styled-components';

import { Main } from '../../../styles/StyledMain';
import { PillLink } from '../../../styles/StyledLink';
import FocusTimeSetting from './FocusTimeSetting';
import ShortBreakSetting from './ShortBreakSetting';
import LongBreakSetting from './LongBreakSetting';
import FocusBgmSetting from './FocusBgmSetting';
import ShortBgmSetting from './ShortBgmSetting';
import LongBgmSetting from './LongBgmSetting';
import RingSetting from './RingSetting';

const StyledSetButton = styled(PillLink)`
	padding: 0.5rem 3rem;
	letter-spacing: 0.4rem;
	font-size: 1.5rem;
	margin-bottom: 4rem;

	&.isDisabled {
		cursor: not-allowed;
		background-color: #d4d4d4;
	}

	@media only screen and (min-width: 768px) {
		font-size: 2rem;
		margin-bottom: 8rem;
	}
`;

const SetButton = ({ text, link, className, ...props }) => {
	const session = useSelector((state) => state.timer.currentSession);

	return (
		<StyledSetButton
			to={link}
			session={session}
			className={className}
			{...props}
		>
			{text}
		</StyledSetButton>
	);
};

const StyledMainSetting = styled(Main)`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-weight: bold;
		font-size: 2rem;
		text-align: center;
		margin: 5rem;
	}

	@media only screen and (min-width: 768px) {
		h1 {
			font-size: 3rem;
		}
	}
`;

export default function Setting() {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;
	const dispatch = useDispatch();
	const [isAllFilled, setIsAllFilled] = useState(false);

	useEffect(() => {
		setIsAllFilled(Object.values(timer).every(Boolean));
	}, [timer]);

	const setButtonHandler = () => {
		dispatch(set({ currentSession: 'focus' }));
	};

	return (
		<div className={`main-wrapper ${session}`}>
			<StyledMainSetting className="container">
				<h1>Set a Timer</h1>
				<FocusTimeSetting />
				<ShortBreakSetting />
				<LongBreakSetting />
				<FocusBgmSetting />
				<ShortBgmSetting />
				<LongBgmSetting />
				<RingSetting />
				<SetButton
					text="Set"
					link={`${isAllFilled ? '/timer' : '#'}`}
					className={`${isAllFilled ? '' : 'isDisabled'}`}
					onClick={setButtonHandler}
				/>
			</StyledMainSetting>
		</div>
	);
}
