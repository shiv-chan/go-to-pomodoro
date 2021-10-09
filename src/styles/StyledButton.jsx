import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '../style.scss';

const Button = styled.button`
	display: inline-block;
	width: auto;
	font-weight: bold;
	font-size: 1.8rem;
	border: none;
	border-radius: 2rem;
	cursor: pointer;
	padding: 0.5rem 3rem;
	margin-bottom: 1rem;
	background-color: ${({ session }) => {
		if (session === 'focus') return 'var(--main-accent-color)';
		else if (session === 'short') return 'var(--short-color)';
		else if (session === 'long') return 'var(--long-color)';
	}};
	color: ${({ session }) => {
		if (session === 'focus') return 'var(--main-bg-color)';
		else if (session === 'short') return 'var(--short-bg-color)';
		else if (session === 'long') return 'var(--long-bg-color)';
	}};
`;

export default function StyledButton({ onClick, text, ...otherProps }) {
	const session = useSelector((state) => state.timer.currentSession);

	return (
		<Button onClick={onClick} session={session} {...otherProps}>
			{text}
		</Button>
	);
}
