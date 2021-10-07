import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import HeroImage from '../assets/hero-img.svg';
import { Main } from '../styles/StyledMain';
import { PillLink } from '../styles/StyledLink';

export const StyledSetTimerButton = styled(PillLink)`
	position: relative;
	top: initial;
	right: initial;
	width: auto;
	display: inline-block;
	padding: 0.5rem 2rem;
	margin: 5rem auto;
`;

const SetTimerButton = ({ text, link }) => {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return (
		<StyledSetTimerButton to={link} session={session}>
			{text}
		</StyledSetTimerButton>
	);
};

const StyledMainHome = styled(Main)`
	display: flex;
	flex-direction: column;
	justufy-content: center;
	padding: 7rem;
	padding-bottom: 0;
	text-align: center;

	.hero {
		h1 {
			font-weight: bold;
			font-size: 2rem;
			text-align: start;
			display: inline-block;
			width: auto;
		}
	}

	img {
		margin: 2rem 0;
	}

	li,
	p {
		font-size: 1.5rem;
		font-weight: 400;
		text-align: start;
		font-family: var(--secondary-font);
		line-height: 2.2rem;
	}

	.how-to {
		h2 {
			font-size: 1.8rem;
			font-weight: 700;
		}

		ol {
			margin: 2rem 0;
		}
	}
`;

const MainHome = ({ children }) => {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return <StyledMainHome session={session}>{children}</StyledMainHome>;
};

export default function Home() {
	return (
		<MainHome className="home">
			<section className="hero">
				<h1>
					Focus
					<br />
					with
					<br />
					Your Own Music
				</h1>
				<img src={HeroImage} alt="hero" />
				<div className="description">
					<p>
						Go-to Pomorodo is a customize timer with the pomodoro technique.
					</p>
					<p>
						You can customize the length of time but also its background music
						with YouTube video link.
					</p>
				</div>
				<SetTimerButton text="Set a Timer Now" link="/setting" />
			</section>
			<section className="how-to">
				<h2>How to Use</h2>
				<ol>
					<li>Select or type focus time, short&long break time.</li>
					<img src={HeroImage} alt="hero" />
					<li>
						Select or set your favourite YouTube video for each time. You can
						also select “None” if you prefer silence.
						<br />
						<br />
						Please paste YouTube link when setting your own.
					</li>
					<img src={HeroImage} alt="hero" />
					<li>Click “Set” button and focus!</li>
				</ol>
				<SetTimerButton text="Set a Timer Now" link="/setting" />
			</section>
		</MainHome>
	);
}
