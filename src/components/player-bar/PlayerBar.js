import React from 'react';
import './PlayerBar.scss';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Slider, Typography } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';

// PauseCircleOutlineRoundedIcon, PlayCircleOutlineRoundedIcon,
// SkipNextRoundedIcon, SkipPreviousRoundedIcon 

import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';

const MusicPlayer = () => {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="music-player">
      <div className="music-player.controls">
        <Grid container spacing={2}>
          <Grid item>
            <IconButton>
              <SkipPreviousRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <PauseCircleOutlineRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <SkipNextRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <div className="music-player.bar">
        <Grid container spacing={2}>
          <Grid item xs>
            <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

const PlayerBar = () => {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="player-bar-base">
        <MusicPlayer />
        <div className="volume-bar">
          <Grid container spacing={2}>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default PlayerBar;
