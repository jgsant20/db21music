import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';

import PlayerBar from './components/player-bar/PlayerBar'

const Home = () => {
  const { data, isPending, error } = useFetch('/api/time');

  console.log(data)

	return (
		<>
			<div>
				<p>Testing, this is the current time! {isPending}</p>
			</div>
			<PlayerBar />
		</>
	)
}

export default Home;
