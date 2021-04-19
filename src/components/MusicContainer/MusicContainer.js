import React, { useState, useEffect } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Card from "@Components/songCard/songCard"
import useFetch from "@Src/useFetch"

const useStyles = makeStyles((theme) => ({
	card: {
	  padding: theme.spacing(2),
	  textAlign: 'center',
	  color: theme.palette.text.secondary,
	},
}));

const MusicContainer = (props) => {
	const classes = useStyles();

  return (
    <Grid item xs={2}>
      <Card 
        className={classes.card}
        {...props}
      ></Card>
    </Grid>
  )
}

export default MusicContainer;
