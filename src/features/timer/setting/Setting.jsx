import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Main } from '../../../styles/StyledMain';
import { StyledSetTimerButton } from '../../../app/Home';
import FocusTimeSetting from './FocusTimeSetting';
import ShortBreakSetting from './ShortBreakSetting';
import LongBreakSetting from './LongBreakSetting';
import FocusBgmSetting from './FocusBgmSetting';
import ShortBgmSetting from './ShortBgmSetting';
import LongBgmSetting from './LongBgmSetting';

const StyledSetButton = styled(StyledSetTimerButton)`
	padding: 0.5rem 3rem;
	letter-spacing: 0.4rem;
	font-size: 1.5rem;
	margin-bottom: 0;

	&.isDisabled {
		cursor: not-allowed;
		background-color: #d4d4d4;
	}
`;

const SetButton = ({ text, link, className }) => {
	const session = useSelector((state) => state.timer.currentSession);

	return (
		<StyledSetButton to={link} session={session} className={className}>
			{text}
		</StyledSetButton>
	);
};

const StyledMainSetting = styled(Main)`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 45px 5rem 5rem;

	h1 {
		font-weight: bold;
		font-size: 2rem;
		text-align: center;
		margin: 3rem 0;
	}
`;

export default function Setting() {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;
	const [isAllFilled, setIsAllFilled] = useState(false);

	useEffect(() => {
		setIsAllFilled(Object.values(timer).every(Boolean));
	}, [timer]);

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
				<SetButton
					text="Set"
					link={`${isAllFilled ? '/timer' : '#'}`}
					className={`${isAllFilled ? '' : 'isDisabled'}`}
				/>
			</StyledMainSetting>
		</div>
	);
}
