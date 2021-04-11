import React, { useState, useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';

import './Content.scss';
import Card from "../songCard/songCard"
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SongSubmission from "@Components/Song-Submission/Song-submission";
import HomeContent from '@Components/home-content/HomeContent';

const Content = () => {
	const { path, url } = useRouteMatch();

	return (
		<>
			<div className="content">
				<Route path={`${path}/songsubmission`} component={SongSubmission} />
				<Route exact path={`${path}`} component={HomeContent} />
    	</div>
		</>
	)
}

export default Content;
