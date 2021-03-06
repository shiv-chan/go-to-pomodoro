import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
const youtubeID = require('youtube-id');

export default function Video({
	setCounter,
	timeoutId,
	timerState,
	startButtonHandler,
	pauseButtonHandler,
	setPlayer,
}) {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;
	let videoId;
	let autoplay;

	if (session === 'focus') {
		videoId = youtubeID(timer.focusBgm);
	} else if (session === 'short') {
		videoId = youtubeID(timer.shortBreakBgm);
	} else if (session === 'long') {
		videoId = youtubeID(timer.longBreakBgm);
	}

	useEffect(() => {
		if (session === 'focus' && setCounter === 0) {
			autoplay = 0;
		} else {
			autoplay = 1;
		}
	}, [session]);

	const opts = {
		width: '480',
		height: '270',
		playerVars: {
			autoplay,
			controls: 0,
			disablekb: 1,
			loop: 1,
		},
	};

	const getEvent = (e) => {
		setPlayer(e.target);
		e.target.setVolume(30);
	};

	const controlVideoPlay = (e) => {
		const playerState = e.target.getPlayerState();
		if (playerState === 1 || playerState === -1 || playerState === 3) {
			if (timerState === '') e.target.seekTo(0);
			if (timerState !== 'ticking') {
				startButtonHandler();
			}
		} else if (playerState === 2) {
			pauseButtonHandler();
		} else if (playerState === 0 && timerState === 'ticking') {
			clearTimeout(timeoutId);
			startButtonHandler();
		}
	};

	console.log(videoId);

	return (
		<YouTube
			videoId={videoId}
			opts={opts}
			onReady={getEvent}
			onStateChange={controlVideoPlay}
			containerClassName="youtube-container"
		/>
	);
}
