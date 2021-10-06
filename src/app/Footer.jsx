import React from 'react';
import { useSelector } from 'react-redux';
import { StyledHeader } from './Header';
import styled from 'styled-components';

const StyledFooter = styled(StyledHeader)`
	bottom: 0;
	text-align: center;
`;

export default function Footer() {
	const timer = useSelector((state) => state.timer);
	const session = timer.currentSession;

	return (
		<StyledFooter session={session} as="footer">
			<p>Made by Kaho Shibuya</p>
		</StyledFooter>
	);
}
