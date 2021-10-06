import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '../style.css';

const Button = styled.button`
	display: inline-block;
	width: 10%;
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

export default function StyledButton({ text }) {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return <Button session={session}>{text}</Button>;
}
