import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from './timerSlice';

export default function Setting() {
	const [focus, setFocus] = useState('25');
	const [short, setShort] = useState('5');
	const [long, setLong] = useState('30');

	const handleChange = (e) => {
		const { type, name, value } = e.currentTarget;
		if (name.charAt(0) === 'f') setFocus(value);
		if (name.charAt(0) === 's') setShort(value);
		if (name.charAt(0) === 'l') setLong(value);
	};

	// when the custom radio button gets clicked, pass its input value to radio value

	return (
		<main className="container">
			<h1>Set a Timer</h1>
			<section className="time">
				<h2>Focus Time</h2>
				<div className="time-options">
					<div>
						<input
							type="radio"
							id="f10"
							name="f10"
							value="10"
							checked={focus === '10'}
							onChange={handleChange}
						/>
						<label htmlFor="f10">
							10 <span className="min">min</span>
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="f15"
							name="f15"
							value="15"
							checked={focus === '15'}
							onChange={handleChange}
						/>
						<label htmlFor="f15">
							15 <span className="min">min</span>
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="f20"
							name="f20"
							value="20"
							checked={focus === '20'}
							onChange={handleChange}
						/>
						<label htmlFor="f20">
							20 <span className="min">min</span>
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="f25"
							name="f25"
							value="25"
							checked={focus === '25'}
							onChange={handleChange}
						/>
						<label htmlFor="f25">
							25 <span className="min">min</span>
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="f30"
							name="f30"
							value="30"
							checked={focus === '30'}
							onChange={handleChange}
						/>
						<label htmlFor="f30">
							30 <span className="min">min</span>
						</label>
					</div>
					{/* <div>
            <input type="radio" name="f-custom" value="" />
            <input type="number" min="1" max="999" value="" placeholder="Custom Time"/>
          </div> */}
				</div>
			</section>
			<section className="time">
				<h2>Short Break Time</h2>
				<div className="time-options">
					<div>
						<input
							type="radio"
							id="s5"
							name="s5"
							value="5"
							checked={short === '5'}
							onChange={handleChange}
						/>
						<label htmlFor="s5">
							5 <span className="min">min</span>
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="s10"
							name="s10"
							value="10"
							checked={short === '10'}
							onChange={handleChange}
						/>
						<label htmlFor="s10">
							10 <span className="min">min</span>
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="s15"
							name="s15"
							value="15"
							checked={short === '15'}
							onChange={handleChange}
						/>
						<label htmlFor="s15">
							15 <span className="min">min</span>
						</label>
					</div>
					{/* <div>
            <input type="radio" name="s-custom" value="" />
            <input type="number" min="1" max="999" value="" placeholder="Custom Time"/>
          </div> */}
				</div>
			</section>
			<section className="time">
				<h2>Long Break Time</h2>
				<div className="time-options">
					<div>
						<input
							type="radio"
							id="l20"
							name="l20"
							value="20"
							checked={long === '20'}
							onChange={handleChange}
						/>
						<label htmlFor="l20">
							20 <span className="min">min</span>
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="l30"
							name="l30"
							value="30"
							checked={long === '30'}
							onChange={handleChange}
						/>
						<label htmlFor="l30">
							30 <span className="min">min</span>
						</label>
					</div>
					<div>
						<input
							type="radio"
							id="l40"
							name="l40"
							value="40"
							checked={long === '40'}
							onChange={handleChange}
						/>
						<label htmlFor="l40">
							40 <span className="min">min</span>
						</label>
					</div>
					{/* <div>
            <input type="radio" name="l-custom" value="" />
            <input type="number" min="1" max="999" value="" placeholder="Custom Time"/>
          </div> */}
				</div>
			</section>
		</main>
	);
}
