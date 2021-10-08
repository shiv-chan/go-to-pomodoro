import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StyledLink from '../styles/StyledLink';

export const StyledHeader = styled.header`
	width: 100%;
	height: 45px;
	z-index: 10;
	position: fixed;
	display: flex;
	align-items: center;
	background-color: ${({ session }) => {
		if (session === 'focus') return 'var(--main-header-color)';
		else if (session === 'short') return 'var(--short-header-color)';
		else if (session === 'long') return 'var(--long-header-color)';
	}};
	color: ${({ session }) => {
		if (session === 'focus') return 'var(--main-color)';
		else if (session === 'short') return 'var(--short-color)';
		else if (session === 'long') return 'var(--long-color)';
	}};
	align-items: center;
	padding: 15px 25px;
	cursor: pointer;
`;

export default function Header() {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return (
		<StyledHeader session={session}>
			<Link className="logo" to="/">
				Go-to Promodoro
			</Link>
			<StyledLink text="Set a Timer" link="/setting" />
		</StyledHeader>
	);
}
