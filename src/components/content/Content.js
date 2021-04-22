import React, { useState, useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';

import './Content.scss';
import Card from "../songCard/songCard"
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongSubmission from "@Components/Song-Submission/Song-submission";
import HomeContent from '@Components/home-content/HomeContent';
import FavoriteContent from '@Components/FavoriteContent/FavoriteContent';
import MySongsContent from '@Components/MySongsContent/MySongsContent';
import ProfileButton from '@Components/profile-button/ProfileButton';

import { PrivateRoute } from "@Src/verifyLogin";

const Content = ({
	playMusicHooks,
	setMusicData,
	musicData,
	musicIsPending,
	musicError,
	musicUrl,
	setMusicUrl
}) => {
	const { path, url } = useRouteMatch();

	const homeContentProps = {
		playMusicHooks,
		setMusicData,
		musicData,
		musicIsPending,
		musicError,
		musicUrl,
		setMusicUrl
	}

	const favoriteContentProps = {
		playMusicHooks,
		musicData,
		musicIsPending,
		musicError,
		musicUrl,
		setMusicUrl
	}

	return (
		<>
			<div className="content">
				<ProfileButton />
				<Route 
					path={`${path}/favorites`} 
					component={() => <FavoriteContent {...favoriteContentProps} />}
				/>
				<PrivateRoute 
					path={`${path}/songsubmission`} 
					component={SongSubmission} 
					userType="musician"
				/>
				<PrivateRoute 
					path={`${path}/mysongs`} 
					component={() => <MySongsContent {...homeContentProps} />}
					userType="musician" 
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
