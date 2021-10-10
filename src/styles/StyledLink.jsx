import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './style.scss';

export const PillLink = styled(Link)`
	font-weight: bold;
	font-size: 1.2rem;
	text-align: center;
	text-decoration: none;
	width: auto;
	border: none;
	border-radius: 2rem;
	cursor: pointer;
	padding: 0.4rem 1.5rem;
	display: block;
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
