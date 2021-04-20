import React, { useState, useEffect } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import './MySongsContent.scss';
import Card from "@Components/songCard/songCard"
import useFetch from "@Src/useFetch"

import MusicContainer from "@Components/MusicContainer/MusicContainer"

import { getUrl } from "@Src/getUrl";
import { getUserId } from "@Src/verifyLogin";

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: 10,
		marginRight: 10,
	  flexGrow: 1,
	},
}));

const HomeContent = ({ 
	playMusicHooks,
	musicData,
	musicIsPending,
	musicError,
	musicUrl,
	setMusicUrl
}) => {
  const classes = useStyles();
	const [updateMusicData, setUpdateMusicData] = useState(musicData)

	setMusicUrl("/api/mysongs")

	const deleteOnClick = (obj) => {
		if (confirm("Do you want to delete this song?")) {
			setUpdateMusicData(() => (
				updateMusicData.filter((item) => (
					item.songID != obj.songID
				))
			))

			musicData = updateMusicData;

			const formData = new FormData();

			formData.append('userID', getUserId())
			formData.append('songID', obj.songID)

			fetch(`${process.env.API_URL}/api/removesong?token=${localStorage.getItem('token')}&userID=${getUserId()}`,
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
	}

	console.log(musicData)

	return (
    <div className={classes.root}>
      <h1 className="content-title">My Songs</h1>
      <Grid container spacing={3}>
        {musicIsPending || !updateMusicData ? null:
        updateMusicData.map((obj, index) => {
          return <MusicContainer 
						key={obj.songID} 
						id={obj.songID} 
						obj={obj} 
						playMusicHooks={playMusicHooks}
						deleteOnClick={deleteOnClick}
				  />
        })}
      </Grid>
    </div>
	)
}

export default HomeContent;
