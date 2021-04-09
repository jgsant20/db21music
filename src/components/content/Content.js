import React, { useState, useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';

import './Content.scss';

import SongSubmission from "@Components/Song-Submission/Song-submission";

const Content = () => {
	const { path, url } = useRouteMatch();

	return (
		<div className="content">
			<Route path={`${path}/songsubmission`} component={SongSubmission} />
    </div>
	)
}

export default Content;
