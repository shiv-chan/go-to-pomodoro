import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Timer() {
	const timer = useSelector((state) => state.timer);
	const [title, setTitle] = useState('');
	const [session, setSession] = useState('focus'); // focus, short, long
	const [setCounter, setSetCounter] = useState(0); // count the number of pomodoro sessions
	const [timerState, setTimerState] = useState(''); // empty, pause, ticking
	const [timeoutId, setTimeoutId] = useState(undefined);
	const [lastUpdatedTime, setLastUpdatedTime] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [totalTime, setTotalTime] = useState(null); // in millisecond

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

	const remainingTime = (totalTime - elapsedTime) / 1000; // in second
	let minite = Math.floor(remainingTime / 60);
	let second = Math.floor(remainingTime - minite * 60);
	if (minite < 10) minite = `0${minite}`;
	if (second < 10) second = `0${second}`;

	useEffect(() => {
		if (remainingTime >= 1) {
			const thisTimeoutId = setTimeout(() => {
				setElapsedTime(
					(prevState) => prevState + (Date.now() - lastUpdatedTime)
				);
				setLastUpdatedTime(Date.now());
			}, 100);
			setTimeoutId(thisTimeoutId);
		} else {
			clearTimeout(timeoutId);
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [lastUpdatedTime]);

	let Buttons;
	if (timerState === '') {
		Buttons = (
			<div>
				<button
					key="start-button"
					onClick={() => {
						setTimerState('ticking');
						setLastUpdatedTime(Date.now());
					}}
				>
					START
				</button>
			</div>
		);
	} else if (timerState === 'ticking') {
		Buttons = (
			<div>
				<button
					key="pause-button"
					onClick={() => {
						setTimerState('pause');
						setElapsedTime(
							(prevState) => prevState + (Date.now() - lastUpdatedTime)
						);
						clearTimeout(timeoutId);
					}}
				>
					PAUSE
				</button>
			</div>
		);
	} else if (timerState === 'pause') {
		Buttons = (
			<div>
				<button
					key="resume-button"
					onClick={() => {
						setTimerState('ticking');
						setLastUpdatedTime(Date.now());
					}}
				>
					RESUME
				</button>
				<button
					key="reset-button"
					onClick={() => {
						setTimerState('');
						switchTimer();
						setElapsedTime(0);
					}}
				>
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
			<div>Video goes here</div>
			{Buttons}
			<Link to="/setting">Back to Set</Link>
		</main>
	);
}
