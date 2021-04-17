import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Container from '@material-ui/core/Container';
import { BorderAllOutlined } from '@material-ui/icons';

import { getUrl } from "@Src/getUrl"

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

export default function songCard(props) {
  const { obj, index } = props
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.mediaContainer}>
        <CardMedia
        className={classes.cover}
        component="img"
        src={getUrl(obj.imageURL)}
        title="Live from space album cover"
      />
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.songName} component="h5" variant="h5">
            Song Name
          </Typography>
          <Typography className={classes.contributors} variant="subtitle1" color="textSecondary">
            Contributors
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}