import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Container from '@material-ui/core/Container';
import { BorderAllOutlined } from '@material-ui/icons';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { getUrl } from "@Src/getUrl";
import { getUserId } from "@Src/verifyLogin";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'd-flex',
    backgroundColor: 'white',
    overflow: 'hidden',
    border: "1.5px solid black",
  },
  details: {
    display: 'grid',
  },
  mediaContainer: {
    padding: 10,
  },
  cover: {
    objectFit: 'cover',
  },
  content: {
    display: 'grid',
    padding: "5px 10px"
  },
  songName: {
    fontSize: 15,
  },
  contributors: {
    fontSize: 10,
  },
  controls: {
    display: 'flex',
    paddingBottom: "5px",
    paddingLeft: "5px",

  },
  playIcon: {
    height: 30,
    width: 30,
  },
}));

export default function songCard({
  id,
  obj,
  playMusicHooks
}) {

  const [isFavoritedVal, setIsFavoritedVal] = useState(obj.isFavorited)
  
  const {
    musicSelected,
    setMusicSelected,
    songIsPlaying,
    setSongIsPlaying,
  } = playMusicHooks;

  const classes = useStyles();
  const theme = useTheme();

  const musicOnClick = () => {
    if (isPlaying()) {  
      setMusicSelected(null)
      setSongIsPlaying(false)
    } else {
      setMusicSelected(obj)
      setSongIsPlaying(true)
    }
  }

  const isPlaying = () => (
    musicSelected && musicSelected.songID == id
  );

  const favoritesOnClick = () => {
    const formData = new FormData();

    formData.append('userID', getUserId())
    formData.append('songID', obj.songID)

    if (isFavorited()) {
      formData.append('favoriting', 0)
      setIsFavoritedVal(0)
    } else {
      formData.append('favoriting', 1)
      setIsFavoritedVal(1)
    }

    fetch(`${process.env.API_URL}/api/favorites?token=${localStorage.getItem('token')}&userID=${getUserId()}`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      }
    )
      .then((response) => response.json)
      .then((result) => {
        console.log('Success: ', result);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  const isFavorited = () => ( isFavoritedVal === 1 ? true : false )

  return (
    <Card className={classes.root}>
      <div className={classes.mediaContainer}>
        <CardMedia
        className={classes.cover}
        component="img"
        src={getUrl(obj.imageURL)}
        title="img"
      />
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.songName} component="h5" variant="h5">
            {obj.songName}
          </Typography>
          <Typography className={classes.contributors} variant="subtitle1" color="textSecondary">
            Contributors
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton onClick={musicOnClick} aria-label="play/pause">
            {isPlaying() ?
              <PauseIcon className={classes.playIcon} /> :
              <PlayArrowIcon className={classes.playIcon} /> }
          </IconButton>
          <IconButton onClick={favoritesOnClick} aria-label="favorites">
            {isFavorited() ?
              <FavoriteIcon className={classes.playIcon} /> :
              <FavoriteBorderIcon className={classes.playIcon} /> }
          </IconButton>
        </div>
      </div>
    </Card>
  );
}