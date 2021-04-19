import React, { useState, useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';

import './Content.scss';
import Card from "../songCard/songCard"
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongSubmission from "@Components/Song-Submission/Song-submission";
import HomeContent from '@Components/home-content/HomeContent';
import ProfileButton from '@Components/profile-button/ProfileButton';

const Content = ({
	playMusicHooks,
	musicData,
	musicIsPending,
	musicError,
}) => {
	const { path, url } = useRouteMatch();

	const homeContentProps = {
		playMusicHooks,
		musicData,
		musicIsPending,
		musicError,
	}

	return (
		<>
			<div className="content">
				<ProfileButton />
				<Route path={`${path}/songsubmission`} component={SongSubmission} />
				<Route 
					path={`${path}/favorites`} 
					component={SongSubmission} 
				/>
				<Route 
					exact path={`${path}`} 
					component={() => <HomeContent {...homeContentProps} />} 
				/>
    	</div>
		</>
	)
}

export default Content;
