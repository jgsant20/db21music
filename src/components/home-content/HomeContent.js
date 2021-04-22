import React, { useState, useEffect } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import './HomeContent.scss';
import Card from "@Components/songCard/songCard"
import useFetch from "@Src/useFetch"

import MusicContainer from "@Components/MusicContainer/MusicContainer"

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: 10,
		marginRight: 10,
	  flexGrow: 1,
	},
}));

const HomeContent = ({ 
	playMusicHooks,
	setMusicData,
	musicData,
	musicIsPending,
	musicError,
	musicUrl,
	setMusicUrl
}) => {
  const classes = useStyles();

	setMusicUrl("/api/music")

	return (
    <div className={classes.root}>
      <h1 className="content-title">Songs</h1>
      <Grid container spacing={3}>
        {musicIsPending || !musicData ? null :
        musicData.map((obj, index) => {
          return <MusicContainer key={obj.songID} id={obj.songID} obj={obj} playMusicHooks={playMusicHooks}  />
        })}
      </Grid>
    </div>
	)
}

export default HomeContent;
