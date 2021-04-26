import React, { useState, useEffect } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Card from "@Components/songCard/songCard"
import useFetch from "@Src/useFetch"

import MusicContainer from "@Components/MusicContainer/MusicContainer"
import EditSong from '@Components/EditSong/EditSong'
import { handleClickOpen } from '@Components/EditSong/EditSong'

import { getUrl } from "@Src/getUrl";
import { getUserId } from "@Src/verifyLogin";
import { PlayCircleFilledWhite } from '@material-ui/icons';
import './MyReportContent.scss';

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: 10,
		marginRight: 10,
	  flexGrow: 1,

	},
}));

const MyReportContent = () => {

const [userCount, setUserCount] = useState(0);
const [songLengthCount, setSongLengthCount] = useState("");
const [totalSongCount, setTotalSongCount] = useState(0);
const [songCount, setSongCount] = useState(0);

useEffect(() => {
    fetch(`${process.env.API_URL}/api/reports?token=${localStorage.getItem('token')}&userID=${getUserId()}`,
{
  method: 'GET',
}
)
.then((response) => response.json())
.then((result) => {
  console.log('Success: ', result);
  setUserCount(result.userCount)
  setSongLengthCount(result.songLengthCount)
  setTotalSongCount(result.totalSongCount)
  setSongCount(result.songCount)
})
.catch((error) => {
  console.error('Error: ', error);
});
}, [])

    console.log(userCount)
	return (
        <div>
            <div className="ReportContent">
                <div>
                    <label>Total Number of Songs you have: {songCount}</label>
                </div>
                <div>
                    <label>Length of Songs you uploaded: {songLengthCount} seconds</label>
                </div>
                <div>
                    <label>Total Number of Songs: {totalSongCount}</label>
                </div>
                <div>
                    <label>Total Number Of Users: {userCount}</label>
                </div>
            </div>
        </div>
	)
}

export default MyReportContent;