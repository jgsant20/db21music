import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';

const Home = () => {
  const { data, isPending, error } = useFetch('/api/time');

  console.log(data)

	return (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {new Date().toLocaleDateString()}.</h2>
			<p>Testing, this is the current time! {isPending}</p>
		</div>
	)
}

export default Home;
