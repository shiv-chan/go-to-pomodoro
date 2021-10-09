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

	@media only screen and (min-width: 768px) {
		font-size: 1.8rem;
		padding: 0.8rem 3rem;
	}
`;

const SetTimerButton = ({ text, link }) => {
	const session = useSelector((state) => state.timer.currentSession);

	return (
		<StyledSetTimerButton to={link} session={session}>
			{text}
		</StyledSetTimerButton>
	);
};

const StyledMainHome = styled(Main)`
	.hero,
	.how-to {
		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			font-weight: bold;
			font-size: 2rem;
			text-align: start;
			display: inline-block;
			width: auto;
			margin: 3rem auto;
		}
	}

	img {
		margin: 2rem 0;
	}

	.description {
		max-width: 50rem;
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
			width: auto;
			margin-top: 3rem;
		}

		ol {
			width: 100%;
			max-width: 50rem;
			padding: 0 2rem;

			li {
				margin-top: 2rem;
			}
		}
	}

	@media only screen and (min-width: 768px) {
		padding-bottom: 4rem;

		.hero {
			h1 {
				font-size: 3rem;
				padding: 2rem 0;
			}

			img {
				width: 70%;
				margin-bottom: 5rem;
			}
		}

		p,
		li {
			font-size: 2.5rem;
			line-height: 3rem;
		}

		.how-to {
			h2 {
				font-size: 2.5rem;
			}

			ol li {
				margin-top: 4rem;
			}
		}
	}
`;

export default function Home() {
	const session = useSelector((state) => state.timer.currentSession);

	return (
		<div className={`main-wrapper ${session}`}>
			<StyledMainHome className="home">
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
						{/* <img src={HeroImage} alt="hero" /> */}
						<li>
							Select or set your favourite YouTube video for each time. <br />
							You can also select “None” if you prefer silence.
							<br />
							Please paste YouTube link when setting your own.
						</li>
						{/* <img src={HeroImage} alt="hero" /> */}
						<li>Click “Set” button and focus!</li>
					</ol>
					<SetTimerButton text="Set a Timer Now" link="/setting" />
				</section>
			</StyledMainHome>
		</div>
	);
}
