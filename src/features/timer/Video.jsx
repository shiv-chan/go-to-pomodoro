import React from 'react';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
const youtubeID = require('youtube-id');

export default function Video({ session, setCounter }) {
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

	return <YouTube videoId={videoId} opts={opts} />;
}
