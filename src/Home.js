import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import useFetch from './useFetch';

import LeftNavBar from '@Components/left-nav-bar/LeftNavBar';
import PlayerBar from '@Components/player-bar/PlayerBar';
import Content from '@Components/content/Content';

import './Home.scss';

const Home = () => {
  const { data, isPending, error } = useFetch('/api/time');

	const { path, url } = useRouteMatch();

  console.log(`${path}`)

	return (
<<<<<<< HEAD
		<div className="home">
			<LeftNavBar />
			<Content />
			<PlayerBar />
=======
		<div>
			<p>Testing, this is the current time! {isPending}</p>
>>>>>>> 320ebe4 (Dylan Test 1)
		</div>
	)
}

export default Home;
