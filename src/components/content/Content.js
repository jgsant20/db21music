import React, { useState, useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';

import './Content.scss';
import Card from "../songCard/songCard"
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongSubmission from "@Components/Song-Submission/Song-submission";

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
	const { path, url } = useRouteMatch();

	return (
		<>
			<div className="content">
				<Route path={`${path}/songsubmission`} component={SongSubmission} />
    	</div>
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
		</>
	)
}

export default Content;
