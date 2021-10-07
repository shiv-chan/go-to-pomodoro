import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '../style.scss';

export const PillLink = styled(Link)`
	font-weight: bold;
	font-size: 1.2rem;
	text-align: center;
	text-decoration: none;
	width: 10rem;
	border: none;
	border-radius: 2rem;
	cursor: pointer;
	padding: 0.4rem 0;
	display: block;
	position: absolute;
	top: 10px;
	right: 35px;
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

export default function StyledLink({ text, link }) {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return (
		<PillLink to={link} session={session}>
			{text}
		</PillLink>
	);
}
