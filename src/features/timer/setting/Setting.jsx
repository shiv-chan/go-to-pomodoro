import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../timerSlice';
import styled from 'styled-components';

import { Main } from '../../../styles/StyledMain';
import { PillLink } from '../../../styles/StyledLink';
import TimeSetting from './TimeSetting';
import BgmSetting from './BgmSetting';
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

	const TIME_SETTINGS = [
		{
			title: 'Focus Time',
			timeOptions: ['10', '15', '20', '25', '30'],
			defaultOption: '25',
			sessionType: 'focus',
		},
		{
			title: 'Short Break Time',
			timeOptions: ['5', '10', '15'],
			defaultOption: '5',
			sessionType: 'shortBreak',
		},
		{
			title: 'Long Break Time',
			timeOptions: ['20', '30', '40'],
			defaultOption: '30',
			sessionType: 'longBreak',
		},
	];

	const BGM_SETTINGS = [
		{
			title: 'Focus BGM',
			bgmOptions: [
				[
					'lofi hip hop radio - beasts to relax/study to',
					'https://www.youtube.com/watch?v=5qap5aO4i9A',
				],
				['CHILL RADIO 24/7', 'https://www.youtube.com/watch?v=21qNxnCS8WU'],
				[
					'STUDIO GHIBLI MUSIC 24/7 ~ Relaxing Music for Sleep & Study',
					'https://www.youtube.com/watch?v=P8j-_MOSrec',
				],
			],
			defaultOption: '',
			bgmType: 'focusBGM',
		},
		{
			title: 'Short Break BGM',
			bgmOptions: [
				[
					'Chillhop Radio - jazzy & lofi hip pop beats',
					'https://www.youtube.com/watch?v=5yx6BWlEVcY',
				],
				['CHILL OUT', 'https://www.youtube.com/watch?v=5iS1KfG7wQs'],
				[
					'Studio Ghibli Relaxing Music',
					'https://www.youtube.com/watch?v=p7TAvWdilcY',
				],
			],
			defaultOption: '',
			bgmType: 'shortBreakBgm',
		},
		{
			title: 'Long Break BGM',
			bgmOptions: [
				[
					'lofi hip hop radio - beats to sleep/chill to',
					'https://www.youtube.com/watch?v=DWcJFNfaw9c',
				],
				[
					'lofi hip hop radio - sad & sleepy beats',
					'https://www.youtube.com/watch?v=l7TxwBhtTUY',
				],
				[
					'Studio Ghibli Summer Night Deep Sleep Piano Collection Covered by kno',
					'https://www.youtube.com/watch?v=devf3da7bTs',
				],
			],
			defaultOption: '',
			bgmType: 'longBreakBgm',
		},
	];

	return (
		<div className={`main-wrapper ${session}`}>
			<StyledMainSetting className="container">
				<h1>Set a Timer</h1>
				{TIME_SETTINGS.map((setting) => (
					<TimeSetting key={setting.sessionType} {...setting} />
				))}
				{BGM_SETTINGS.map((setting) => (
					<BgmSetting key={setting.bgmType} {...setting} />
				))}
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
