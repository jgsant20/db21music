import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import useFetch from './useFetch';

import LeftNavBar from '@Components/left-nav-bar/LeftNavBar';
import PlayerBar from '@Components/player-bar/PlayerBar';
import Content from '@Components/content/Content';

import './Home.scss';
import { EmojiObjects } from '@material-ui/icons';

const Home = () => {
	const [musicUrl, setMusicUrl] = useState('')
	const [musicSelected, setMusicSelected] = useState(null);
	const [songIsPlaying, setSongIsPlaying] = useState(false);

	const { data: musicData, isPending: musicIsPending, error: musicError } = useFetch(musicUrl)

  const playMusicHooks = {
    musicSelected,
    setMusicSelected,
		songIsPlaying,
		setSongIsPlaying,
  }

	const contentProps = {
		playMusicHooks,
		musicData,
		musicIsPending,
		musicError,
		musicUrl, 
		setMusicUrl,
	}

	const playerBarProps = {
		playMusicHooks: playMusicHooks,
	}

	return (
		<div className="home">
			<LeftNavBar />
			<Content {...contentProps} />
			<PlayerBar {...playerBarProps} />
		</div>
	)
}

export default Home;
