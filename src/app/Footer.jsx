import React from 'react';
import { useSelector } from 'react-redux';
import { StyledHeader } from './Header';
import styled from 'styled-components';

const StyledFooter = styled(StyledHeader)`
	position: relative;
	bottom: 0;
	text-align: center;
`;

const StyledLink = styled.a`
	font-size: inherit;
	color: inherit;
`;

export default function Footer() {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return (
		<StyledFooter session={session} as="footer">
			<p>
				Made by{' '}
				<StyledLink href="https://kahoshibuya.dev/">Kaho Shibuya</StyledLink>
			</p>
		</StyledFooter>
	);
}
