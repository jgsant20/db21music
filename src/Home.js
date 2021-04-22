import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import useFetch from './useFetch';

import LeftNavBar from '@Components/left-nav-bar/LeftNavBar';
import PlayerBar from '@Components/player-bar/PlayerBar';
import Content from '@Components/content/Content';

import './Home.scss';
import { EmojiObjects } from '@material-ui/icons';

import { getUrl } from "@Src/getUrl";
import { getUserId } from "@Src/verifyLogin";

const calculateIndex = (musicData, songID) => {
	if (!musicData) {
		return 0;
	}

	for (let idx = 0; idx < musicData.length; idx++) {
		if (musicData[idx].songID == songID) {
			return idx;
		}
	}

	return 0;
}

const Home = () => {
	const [musicUrl, setMusicUrl] = useState('')
	const [musicSelected, setMusicSelected] = useState(null);
	const [songIsPlaying, setSongIsPlaying] = useState(false);
	const [indexInMusicArray, setIndexInMusicArray] = useState(0);

	const { data, isPending: musicIsPending, error: musicError } = useFetch(musicUrl)

	const [musicData, setMusicData] = useState({});

	useEffect(() => {
		setMusicData(data)
	}, [data])

	useEffect(() => {
		if (musicSelected) {
			// let idxResp = calculateIndex(musicData, musicSelected.songID)
			setIndexInMusicArray(0)
		}	
	}, [musicUrl])

	useEffect(() => {
		if (musicData) {
			setMusicSelected(musicData[indexInMusicArray])
		}
	}, [indexInMusicArray])

	useEffect(() => {
		console.log("WORKWORK", musicSelected)
		if (musicSelected != null && musicSelected != '') {
			musicSelected.totalPlays += 1

			const formData = new FormData();

			formData.append('userID', getUserId())
			formData.append('songID', musicSelected.songID)

			fetch(`${process.env.API_URL}/api/counts?token=${localStorage.getItem('token')}&userID=${getUserId()}`,
				{
					method: 'POST',
					mode: 'no-cors',
					body: formData,
				}
			)
				.then((response) => response.json)
				.then((result) => {
					console.log('Success: ', result);
				})
				.catch((error) => {
					console.error('Error: ', error);
				});
		}
	}, [musicSelected])

  const playMusicHooks = {
    musicSelected,
    setMusicSelected,
		songIsPlaying,
		setSongIsPlaying,
		indexInMusicArray,
		setIndexInMusicArray,
		skipFunc: () => { indexInMusicArray < musicData.length - 1 ? setIndexInMusicArray(() => (indexInMusicArray + 1)) : setIndexInMusicArray(0)},
		rewindFunc: () => { indexInMusicArray > 0 ? setIndexInMusicArray(() => (indexInMusicArray - 1)) : setIndexInMusicArray(() => (musicData.length))},
  }

	const contentProps = {
		playMusicHooks,
		setMusicData,
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
