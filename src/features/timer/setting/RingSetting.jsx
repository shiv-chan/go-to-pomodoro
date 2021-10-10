import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
	const [checkboxValue, setCheckboxValue] = useState(true);
	const dispatch = useDispatch();

	const checkboxClickHandler = (e) => {
		const { checked } = e.target;
		setCheckboxValue(checked);

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
				checked={checkboxValue}
				onChange={checkboxClickHandler}
			/>
			<label htmlFor="ring">Ring a bell when the session ends 🔔</label>
		</RingSettingSection>
	);
}
