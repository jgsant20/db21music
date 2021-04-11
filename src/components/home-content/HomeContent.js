import React, { useState, useEffect } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import './HomeContent.scss';
import Card from "@Components/songCard/songCard"

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


const Content = () => {
	const classes = useStyles();

	return (
    <div className={classes.root}>
      <h1 className="content-title">Songs</h1>
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

export default Content;


