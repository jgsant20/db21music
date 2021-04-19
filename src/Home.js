import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import useFetch from './useFetch';

import LeftNavBar from '@Components/left-nav-bar/LeftNavBar';
import PlayerBar from '@Components/player-bar/PlayerBar';
import Content from '@Components/content/Content';

import './Home.scss';
import { EmojiObjects } from '@material-ui/icons';

const findInData = (musicData={}, id) => {
	if (musicData == null) {
		return null
	}

	return (
		Object.values(musicData).find(element => (
			element.songID == id
		))
	)
}

const Home = () => {
	const { path, url } = useRouteMatch();
	const { data: musicData, isPending: musicIsPending, error: musicError } = useFetch('/api/music')

	const [musicSelected, setMusicSelected] = useState(0);
	const [songIsPlaying, setSongIsPlaying] = useState(false);
  const playMusicHooks = {
    musicSelected: musicSelected,
    setMusicSelected: setMusicSelected,
		songIsPlaying: songIsPlaying,
		setSongIsPlaying: setSongIsPlaying,
  }

	const contentProps = {
		playMusicHooks: playMusicHooks,
		musicData: musicData,
		musicIsPending: musicIsPending,
		musicError: musicError,
	}

	const playerBarProps = {
		playMusicHooks: playMusicHooks,
		songPlayingCurrently: findInData(musicData, musicSelected),
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
