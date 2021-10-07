import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from './timerSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Video from './Video';
import VolumeSlider from '../../app/VolumeSlider';
import { Main } from '../../styles/StyledMain';
import StyledButton from '../../styles/StyledButton';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';

const StyledMainTimer = styled(Main)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	h1 {
		font-size: 2.5rem;
		margin: 3rem auto;
	}

	article.time {
		font-size: 5rem;
		margin-bottom: 3rem;
	}
`;

const MainTimer = ({ children }) => {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return <StyledMainTimer session={session}>{children}</StyledMainTimer>;
};

export default function Timer() {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [timerState, setTimerState] = useState(''); // empty, pause, ticking
	const [setCounter, setSetCounter] = useState(0); // count the number of pomodoro sessions
	const [timeoutId, setTimeoutId] = useState(undefined);
	const [lastUpdatedTime, setLastUpdatedTime] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [totalTime, setTotalTime] = useState(undefined); // in millisecond
	const [player, setPlayer] = useState();

	// switch appearence and set a time
	function switchTimer() {
		if (session === 'focus') {
			setTitle(<h1>Focus</h1>);
			setTotalTime(timer.focus * 1000);
		} else if (session === 'short') {
			setTitle(<h1>Short Break</h1>);
			setTotalTime(timer.shortBreak * 1000);
		} else if (session === 'long') {
			setTitle(<h1>Long Break</h1>);
			setTotalTime(timer.longBreak * 1000);
		}
	}

	useLayoutEffect(() => {
		switchTimer();
	}, [session]);

	// calculate minite and second
	const remainingTime = (totalTime - elapsedTime) / 1000; // in second
	let minite = Math.floor(remainingTime / 60);
	let second = Math.floor(remainingTime - minite * 60);
	if (minite < 10) minite = `0${minite}`;
	if (second < 10) second = `0${second}`;

	// countdown
	useEffect(() => {
		if (remainingTime >= 1) {
			const thisTimeoutId = setTimeout(() => {
				setElapsedTime(
					(prevElapsedTime) => prevElapsedTime + (Date.now() - lastUpdatedTime)
				);
				setLastUpdatedTime(Date.now());
			}, 100);
			setTimeoutId(thisTimeoutId);
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [lastUpdatedTime]);

	// when one session ends...
	if (remainingTime < 1) {
		clearTimeout(timeoutId);
		setTimerState('ticking');
		setElapsedTime(0);

		if (session === 'focus' && setCounter < 3) {
			dispatch(set({ currentSession: 'short' }));
			setSetCounter((prevNum) => prevNum + 1);
		} else if (session === 'focus' && setCounter === 3) {
			dispatch(set({ currentSession: 'long' }));
			setSetCounter(0);
		} else if (session === 'short') {
			dispatch(set({ currentSession: 'focus' }));
		} else if (session === 'long') {
			dispatch(set({ currentSession: 'focus' }));
		}
	}

	const startButtonHandler = () => {
		setTimerState('ticking');
		setLastUpdatedTime(Date.now());
		player.playVideo();
	};

	const pauseButtonHandler = () => {
		setTimerState('pause');
		setElapsedTime(
			(prevElapsedTime) => prevElapsedTime + (Date.now() - lastUpdatedTime)
		);
		clearTimeout(timeoutId);
		player.pauseVideo();
	};

	const resetButtonHandler = () => {
		setTimerState('');
		switchTimer();
		setElapsedTime(0);
		player.pauseVideo();
		player.seekTo(0);
	};

	let Buttons;
	if (timerState === '') {
		Buttons = (
			<div className="buttons">
				<StyledButton
					key="start-button"
					onClick={startButtonHandler}
					text="START"
				/>
			</div>
		);
	} else if (timerState === 'ticking') {
		Buttons = (
			<div className="buttons">
				<StyledButton
					key="pause-button"
					onClick={pauseButtonHandler}
					text="PAUSE"
				/>
			</div>
		);
	} else if (timerState === 'pause') {
		Buttons = (
			<div className="buttons">
				<StyledButton
					key="resume-button"
					onClick={startButtonHandler}
					text="RESUME"
				/>
				<StyledButton
					key="reset-button"
					onClick={resetButtonHandler}
					text="RESET"
				/>
			</div>
		);
	}

	return (
		<MainTimer className={session}>
			{title}
			<article className="time">
				{minite}:{second}
			</article>
			<Video
				setCounter={setCounter}
				timerState={timerState}
				startButtonHandler={startButtonHandler}
				pauseButtonHandler={pauseButtonHandler}
				setPlayer={setPlayer}
			/>
			<VolumeSlider player={player} />
			{Buttons}
			<Link className="back-to-set" to="/setting">
				<ArrowLeftRoundedIcon />
				Back to Set
			</Link>
		</MainTimer>
	);
}
