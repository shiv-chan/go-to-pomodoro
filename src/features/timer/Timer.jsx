import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Video from './Video';

export default function Timer() {
	const timer = useSelector((state) => state.timer);
	const [title, setTitle] = useState('');
	const [session, setSession] = useState('focus'); // focus, short, long
	const [timerState, setTimerState] = useState(''); // empty, pause, ticking
	const [setCounter, setSetCounter] = useState(0); // count the number of pomodoro sessions
	const [timeoutId, setTimeoutId] = useState(undefined);
	const [lastUpdatedTime, setLastUpdatedTime] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [totalTime, setTotalTime] = useState(undefined); // in millisecond

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

	useEffect(() => {
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

		if (session === 'focus') {
			setSession('short');
		} else if (session === 'short' && setCounter < 4) {
			setSession('focus');
			setSetCounter((prevNum) => prevNum + 1);
		} else if (session === 'short' && setCounter === 4) {
			setSession('long');
			setSetCounter(0);
		} else if (session === 'long') {
			setSession('focus');
		}
	}

	const startButtonHandler = () => {
		setTimerState('ticking');
		setLastUpdatedTime(Date.now());
	};

	const pauseButtonHandler = () => {
		setTimerState('pause');
		setElapsedTime(
			(prevElapsedTime) => prevElapsedTime + (Date.now() - lastUpdatedTime)
		);
		clearTimeout(timeoutId);
	};

	const resetButtonHandler = () => {
		setTimerState('');
		switchTimer();
		setElapsedTime(0);
	};

	let Buttons;
	if (timerState === '') {
		Buttons = (
			<div>
				<button key="start-button" onClick={startButtonHandler}>
					START
				</button>
			</div>
		);
	} else if (timerState === 'ticking') {
		Buttons = (
			<div>
				<button key="pause-button" onClick={pauseButtonHandler}>
					PAUSE
				</button>
			</div>
		);
	} else if (timerState === 'pause') {
		Buttons = (
			<div>
				<button key="resume-button" onClick={startButtonHandler}>
					RESUME
				</button>
				<button key="reset-button" onClick={resetButtonHandler}>
					RESET
				</button>
			</div>
		);
	}

	return (
		<main className={session}>
			{title}
			<article>
				{minite}:{second}
			</article>
			<Video
				session={session}
				setCounter={setCounter}
				timerState={timerState}
				startButtonHandler={startButtonHandler}
				pauseButtonHandler={pauseButtonHandler}
			/>
			{Buttons}
			<Link to="/setting">Back to Set</Link>
		</main>
	);
}
