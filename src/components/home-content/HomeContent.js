import React, { useState, useEffect } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import './HomeContent.scss';
import Card from "@Components/songCard/songCard"
import useFetch from "@Src/useFetch"

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: 10,
		marginRight: 10,
	  flexGrow: 1,
	},
	card: {
	  padding: theme.spacing(2),
	  textAlign: 'center',
	  color: theme.palette.text.secondary,
	},
}));

const MusicContainer = ({obj, index}) => {
	const classes = useStyles();

  return (
    <Grid item xs={2}>
      <Card 
        className={classes.card}
        obj={obj}
        index={index}
      ></Card>
    </Grid>
  )
}

const Content = () => {
  const classes = useStyles();
  const { data, isPending, error } = useFetch('/api/music')
  
	return (
    <div className={classes.root}>
      <h1 className="content-title">Songs</h1>
      <Grid container spacing={3}>
        {isPending ? null :
        data.map((obj, index) => {
          return <MusicContainer key={obj.songID} obj={obj} index={index} />
        })}
      </Grid>
    </div>
	)
}

export default Content;


