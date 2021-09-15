import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/hero-img.svg';

export default function Home() {
	return (
		<main className="home">
			<section className="hero">
				<h1>Focus with Your Own Music</h1>
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
				<Link to="/setting">
					<button>Set a Timer Now</button>
				</Link>
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
				<Link to="/setting">
					<button>Set a Timer Now</button>
				</Link>
			</section>
		</main>
	);
}
