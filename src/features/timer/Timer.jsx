import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Timer() {
	const timer = useSelector((state) => state.timer);
	const [session, setSession] = useState('focus'); // focus, short, long
	const [setCounter, setSetCounter] = useState(0); // count the number of pomodoro sessions
	const [timerState, setTimerState] = useState(''); // empty, pause, ticking
	const [timeoutId, setTimeoutId] = useState('');
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
		let minite;
		let second;
		if (time / 60 < 1) {
			minite = '00';
		} else if (time / 60 < 10) {
			minite = `0${time / 60}`;
		} else {
			minite = time / 60;
		}

		if (time % 60 < 1) {
			second = '00';
		} else if (time % 60 < 10) {
			second = `0${time % 60}`;
		} else {
			second = time % 60;
		}

		setDisplayTime({
			minite,
			second,
		});
	}

	// countdown function
	let countTimeout;
	const nextTiming = () => 1000 - (Date.now() % 1000);
	function countDown() {
		let endTime = Date.parse(new Date()) + remainingTime * 1000;
		// start in 1 sec
		countTimeout = setTimeout(function main() {
			countTimeout = setTimeout(main, 1000);
			let leftTime = Math.round((endTime - Date.now()) / 1000);
			setRemainingTime(leftTime);
			setTimeoutId(countTimeout);
		}, 1000);
	}

	useEffect(() => {
		if (remainingTime <= 0) stopCountDown();
		convertTime(remainingTime);
	}, [remainingTime, timeoutId]);

	function stopCountDown() {
		clearTimeout(timeoutId);
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
				{displayTime.minite} : {displayTime.second}
			</article>
			<div>Video goes here</div>
			{Buttons}
			<Link to="/setting">Back to Set</Link>
		</main>
	);
}
