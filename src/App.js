import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation,
} from 'react-router-dom';
import Header from './app/Header';
import Footer from './app/Footer';
import Home from './app/Home';
import Setting from './features/timer/Setting';
import Timer from './features/timer/Timer';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
}

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Header />
			<Switch>
				<Route path="/setting" component={Setting} />
				<Route path="/timer" component={Timer} />
				<Route path="/" component={Home} />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
