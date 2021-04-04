import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [currentTime, setCurrentTime] = useState(0);
  const [currentJson, setJson] = useState(0);

  useEffect(() => {
    fetch('./api/time').then(res => res.json()).then(date => {
      setCurrentTime(date.time);
    });
  }, []);

  useEffect(() => {
		const abortCont = new AbortController();
		
    fetch('./api/albums').then(res => res.json()).then(json => {
      setJson(json);
    });

  }, []);

	return (
		<div>

			<p>Testing, this is the current time! {currentTime}</p>
		</div>
	)
}

export default Home;
