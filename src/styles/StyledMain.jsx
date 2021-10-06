import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const Main = styled.main`
	min-height: calc(100vh - 45px);
	padding-top: 45px;
	background-color: ${({ session }) => {
		if (session === 'focus') return 'var(--main-bg-color)';
		else if (session === 'short') return 'var(--short-bg-color)';
		else if (session === 'long') return 'var(--long-bg-color)';
	}};

	& h1, h2 {
		color: ${({ session }) => {
			if (session === 'focus') return 'var(--main-color)';
			else if (session === 'short') return 'var(--short-color)';
			else if (session === 'long') return 'var(--long-color)';
		}}
`;

export default function StyledMain({ children }) {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return <Main session={session}>{children}</Main>;
}
