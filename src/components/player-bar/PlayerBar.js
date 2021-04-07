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

const PrettoSlider = withStyles({
  root: {
    color: '#FFFFFF',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const MusicPlayer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="music-player">
      <Grid container spacing={2} className="music-player-controls-wrapper">
        <Grid item>
          <IconButton className="music-player-controls">
            <SkipPreviousRoundedIcon className="music-player-controls__icon" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className="music-player-controls">
            <PauseCircleOutlineRoundedIcon className="music-player-controls__icon" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className="music-player-controls">
            <SkipNextRoundedIcon className="music-player-controls__icon" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="music-player-bar">
        <Grid item xs>
          <PrettoSlider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
      </Grid>
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
              <PrettoSlider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
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
