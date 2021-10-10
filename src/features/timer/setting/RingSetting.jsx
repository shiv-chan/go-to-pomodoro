import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../timerSlice';
import styled from 'styled-components';

const RingSettingSection = styled.section`
	display: flex;
	align-items: center;
	margin: 0 auto;
	margin-bottom: 5rem;

	input {
		width: 2rem;
		height: 2rem;
	}

	label {
		font-size: 1.5rem;
		font-weight: bold;
		margin-left: 1rem;
		cursor: pointer;
	}

	@media only screen and (min-width: 768px) {
		margin-bottom: 8rem;

		input {
			width: 2.5rem;
			height: 2.5rem;
		}

		label {
			font-size: 2rem;
		}
	}
`;

export default function RingSetting() {
	const haveRing = useSelector((state) => state.timer.haveRing);
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState(true);

	useEffect(() => {
		if (haveRing === 'on') {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, []);

	const checkboxClickHandler = (e) => {
		const { checked } = e.target;
		setIsChecked(checked);

		let payload;
		if (checked) {
			payload = 'on';
		} else {
			payload = 'off';
		}
		dispatch(set({ haveRing: payload }));
	};

	return (
		<RingSettingSection>
			<input
				type="checkbox"
				name="ring"
				id="ring"
				checked={isChecked}
				onChange={checkboxClickHandler}
			/>
			<label htmlFor="ring">Ring a bell when the session ends 🔔</label>
		</RingSettingSection>
	);
}
