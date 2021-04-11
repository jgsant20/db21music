import { useEffect, useState } from "react";

const useFetch = (url, headers={}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(`${process.env.API_URL}${url}`, { 
				signal: abortCont.signal,
				...headers
			})
				.then(res => {
					if(!res.ok) {
						throw Error('Could not fetch the data for that resource');
					}
					return res.json();
				})
				.then(data => {
					setData(data);
					setIsPending(false);
					setError(null);
				})
				.catch(err => {
					if (err.name !== 'AbortError') {
						setIsPending(false);
						setError(err.message);
					}
				})
		}, 1000);

		return () => abortCont.abort();
  }, [url]);

	console.log(data);
	return { data, isPending, error }
}

export default useFetch
