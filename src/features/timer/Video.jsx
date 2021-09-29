import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
const youtubeID = require('youtube-id');

export default function Video({
	session,
	setCounter,
	timerState,
	startButtonHandler,
	pauseButtonHandler,
}) {
	const timer = useSelector((state) => state.timer);
	let videoId;
	let autoplay;

	if (session === 'focus') {
		videoId = youtubeID(timer.focusBgm);
	} else if (session === 'short') {
		videoId = youtubeID(timer.shortBreakBgm);
	} else if (session === 'long') {
		videoId = youtubeID(timer.longBreakBgm);
	}

	if (session === 'focus' && setCounter === 0) {
		autoplay = 0;
	} else {
		autoplay = 1;
	}

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

	const controlVideoPlay = (e) => {
		const playerState = e.target.getPlayerState();
		console.log(playerState);
		if (playerState === 1 || playerState === -1 || playerState === 3) {
			if (timerState === '') e.target.seekTo(0);
			if (timerState !== 'ticking') {
				startButtonHandler();
			}
		} else if (playerState === 2) {
			pauseButtonHandler();
		}
	};

	return (
		<YouTube videoId={videoId} opts={opts} onStateChange={controlVideoPlay} />
	);
}
