import React, { useState, useEffect } from "react";
import { Route, Link, useRouteMatch } from "react-router-dom";

import "./Content.scss";
import Card from "../songCard/songCard";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SongSubmission from "@Components/Song-Submission/Song-submission";
<<<<<<< HEAD
import EditSong from "@Components/EditSong/EditSong";
import HomeContent from "@Components/home-content/HomeContent";
import FavoriteContent from "@Components/FavoriteContent/FavoriteContent";
import MySongsContent from "@Components/MySongsContent/MySongsContent";
import ProfileButton from "@Components/profile-button/ProfileButton";
=======
import EditSong from "@Components/EditSong/EditSong"
import HomeContent from '@Components/home-content/HomeContent';
import FavoriteContent from '@Components/FavoriteContent/FavoriteContent';
import MySongsContent from '@Components/MySongsContent/MySongsContent';
import ProfileButton from '@Components/profile-button/ProfileButton';
>>>>>>> f68c5d24360ec64ce1b4a1a06e782c678681b7d1

import { PrivateRoute } from "@Src/verifyLogin";
import MyReportContent from '../MyReportContent/MyReportContent';

const Content = ({
  playMusicHooks,
  setMusicData,
  musicData,
  musicIsPending,
  musicError,
  musicUrl,
  setMusicUrl,
}) => {
  const { path, url } = useRouteMatch();

  const homeContentProps = {
    playMusicHooks,
    setMusicData,
    musicData,
    musicIsPending,
    musicError,
    musicUrl,
    setMusicUrl,
  };

  const favoriteContentProps = {
    playMusicHooks,
    musicData,
    musicIsPending,
    musicError,
    musicUrl,
    setMusicUrl,
  };

<<<<<<< HEAD
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
          exact
          path={`${path}`}
          component={() => <HomeContent {...homeContentProps} />}
        />
      </div>
    </>
  );
};
=======
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
				<PrivateRoute 
					path={`${path}/myreports`} 
					component={() => <MyReportContent/>}
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
>>>>>>> f68c5d24360ec64ce1b4a1a06e782c678681b7d1

export default Content;
