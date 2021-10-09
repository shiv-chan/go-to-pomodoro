import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PillLink } from '../styles/StyledLink';

export const StyledHeader = styled.header`
	width: 100%;
	height: 45px;
	z-index: 10;
	position: sticky;
	top: 0;
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

	@media only screen and (min-width: 768px) {
		height: 80px;

		p {
			font-size: 2rem;
		}
	}
`;

const StyledSetTimerButton = styled(PillLink)`
	position: absolute;
	top: 10px;
	right: 20px;

	@media only screen and (min-width: 768px) {
		font-size: 1.5rem;
		top: 25px;
	}
`;

const SetTimerButton = ({ text, link }) => {
	const session = useSelector((state) => state.timer.currentSession);

	return (
		<StyledSetTimerButton session={session} to={link}>
			{text}
		</StyledSetTimerButton>
	);
};

export default function Header() {
	const session = useSelector((state) => state.timer.currentSession);

	return (
		<StyledHeader session={session}>
			<Link className="logo" to="/">
				Go-to Promodoro
			</Link>
			<SetTimerButton text="Set a Timer" link="/setting" />
		</StyledHeader>
	);
}
