import React, { useEffect, useState, useRef } from 'react';
import './PlayerBar.scss';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Slider, Typography } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';

import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';

import { getUrl } from '@Src/getUrl';


// stolen code from Dan Abramov to solve stupid useInterval closure issue and states
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


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

const MusicPlayer = ({
  volume,
  setVolume,
  playMusicHooks,
}) => {
  const [currentTimePercentage, setCurrentTimePercentage] = useState(0);
  const [audioObj, setAudioObj] = useState(null);
  const [audioObjTime, setAudioObjTime] = useState(0)
  const [timer, setTimer] = useState(0);

  const {
    musicSelected,
    setMusicSelected,
    songIsPlaying,
    setSongIsPlaying,
  } = playMusicHooks;

  const getAudioTime = () => (audioObj ? audioObj.currentTime : 0)

  useEffect(() => {
    if (audioObj) {
      audioObj.pause()
    }
    if (musicSelected) {
      let audio = new Audio(getUrl(musicSelected.songURL));
      audio.play()
      audio.volume = volume
      audio.currentTime = 0
      setCurrentTimePercentage(0)

      audio.addEventListener('loadedmetadata', (e) => {
        setAudioObjTime(e.target.duration);
        setAudioObj(audio)
      });
    }
  }, [musicSelected])

  useEffect(() => {
    if (audioObj) {
      audioObj.volume = volume
    }
  }, [volume])

  const handleChange = (event, newValue) => {
    setCurrentTimePercentage(newValue);
    if (audioObj) {
      audioObj.currentTime = audioObjTime * (newValue / 100);
    }
  };

  const audioTimeTo100 = (val) => {
    return audioObjTime != 0 ? (val / audioObjTime) * 100 : 0
  }

  const pausePlayToggle = () => {
    if (!songIsPlaying && musicSelected != null) {  
      setSongIsPlaying(true)
      audioObj && audioObj.play()
    } else {
      setSongIsPlaying(false)
      audioObj && audioObj.pause()
    }
  }  

  useInterval(() => {
    if (audioObj || audioObj && audioObj.paused) {
      setCurrentTimePercentage((audioObj.currentTime / audioObjTime) * 100)
    }
  }, 1000)

  return (
    <div className="music-player">
      <Grid container spacing={2} className="music-player-controls-wrapper">
        <Grid item>
          <IconButton className="music-player-controls">
            <SkipPreviousRoundedIcon className="music-player-controls__icon" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={pausePlayToggle} className="music-player-controls">
            {songIsPlaying ?
              <PauseCircleOutlineRoundedIcon className="music-player-controls__icon" /> :
              <PlayCircleOutlineRoundedIcon className="music-player-controls__icon" />
            }
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
          <PrettoSlider value={currentTimePercentage} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
      </Grid>
    </div>
  )
}

const MusicStatus = ({
  playMusicHooks,
}) => {
  const {
    musicSelected,
    setMusicSelected,
    songIsPlaying,
    setSongIsPlaying,
  } = playMusicHooks;

  const idleText = () => ( musicSelected == null ? "Not playing anything" : "Paused" )
  const getCurrentSong = () => ( musicSelected == null ? "n/a" : musicSelected.songName )

  return (
    <div className="player-bar-base__status">
      {songIsPlaying ? `Currently playing ${getCurrentSong()}` : idleText()}
    </div>
  )
}

const PlayerBar = (props) => {
  const [volume, setVolume] = useState(0.05);
  const handleChange = (event, newValue) => {
    setVolume(newValue / 100);
  };

  const musicPlayerProps = {
    volume,
    setVolume,
    ...props
  }

  return (
    <>
      <div className="player-bar-base">
        <MusicStatus {...props} />
        <MusicPlayer {...musicPlayerProps} />
        <div className="volume-bar">
          <Grid container spacing={2}>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <PrettoSlider value={volume * 100} onChange={handleChange} aria-labelledby="continuous-slider" />
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
