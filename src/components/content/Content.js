import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'

import './Content.scss';
import Card from "../songCard/songCard"
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

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

  export default function Content() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<h1>Songs</h1>
		<Grid container spacing={3}>
		  <Grid item xs={2}>
			<Card className={classes.card}></Card>
		  </Grid>
		  <Grid item xs={2}>
			<Card className={classes.card}></Card>
		  </Grid>
		  <Grid item xs={2}>
			<Card className={classes.card}></Card>
		  </Grid>
		  <Grid item xs={2}>
			<Card className={classes.card}></Card>
		  </Grid>
		  <Grid item xs={2}>
			<Card className={classes.card}></Card>
		  </Grid>
		  <Grid item xs={2}>
			<Card className={classes.card}></Card>
		  </Grid>
		</Grid>
	  </div>
	)
}

