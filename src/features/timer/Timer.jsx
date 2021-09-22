import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Timer() {
	const timer = useSelector((state) => state.timer);
	const [session, setSession] = useState('focus'); // focus, short, long
	const [setCounter, setSetCounter] = useState(0); // count the number of pomodoro sessions
	const [timerState, setTimerState] = useState(''); // empty, pause, ticking
	const [intervalId, setIntervalId] = useState('');
	const [title, setTitle] = useState('');
	const [remainingTime, setRemainingTime] = useState('');
	const [displayTime, setDisplayTime] = useState({
		minite: '',
		second: '',
	});

	// switch appearence and set a time
	function switchTimer() {
		if (session === 'focus') {
			setTitle(<h1>Focus</h1>);
			setRemainingTime(timer.focus);
		} else if (session === 'short') {
			setTitle(<h1>Short Break</h1>);
			setRemainingTime(timer.shortBreak);
		} else if (session === 'long') {
			setTitle(<h1>Long Break</h1>);
			setRemainingTime(timer.longBreak);
		}
	}

	useEffect(() => {
		switchTimer();
	}, [session]);

	// convert seconds to min:sec form
	function convertTime(time) {
		setDisplayTime({
			minite: Math.round(time / 60),
			second: Math.round(time % 60),
		});
	}

	// countdown function
	let countTimeInterval;

	function countDown() {
		let endTime = Date.parse(new Date()) + remainingTime * 1000;
		// let remainingTime = time;
		countTimeInterval = setInterval(() => {
			setRemainingTime((endTime - Date.now()) / 1000);
		}, 1000);
		setIntervalId(countTimeInterval);
	}

	useEffect(() => {
		if (Math.round(remainingTime) <= 0) clearInterval(intervalId);
		convertTime(remainingTime);
	}, [remainingTime]);

	function stopCountDown() {
		clearInterval(intervalId);
	}

	let Buttons;
	if (timerState === '') {
		Buttons = (
			<div>
				<button
					key="start-button"
					onClick={() => {
						setTimerState('ticking');
						countDown();
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
						stopCountDown();
						setTimerState('pause');
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
						countDown();
					}}
				>
					RESUME
				</button>
				<button
					key="reset-button"
					onClick={() => {
						setTimerState('');
						switchTimer();
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
				{displayTime.minite} :{' '}
				{displayTime.second < 10
					? `0${displayTime.second}`
					: displayTime.second}
			</article>
			<div>Video goes here</div>
			{Buttons}
			<Link to="/setting">Back to Set</Link>
		</main>
	);
}
