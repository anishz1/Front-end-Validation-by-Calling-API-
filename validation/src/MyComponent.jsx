import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '1hPWgDeQjPQTriKYlahWy1F594Hn16tj';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define the API endpoint
    const endpoint = 'https://dummyjson.com/users';

    // Set up headers with the API key
    const headers = {
      'Api-Key': API_KEY,
    };

    // Make a GET request to the API
    axios.get(endpoint, { headers })
      .then(response => {
        // Handle the response data here
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from API</h1>
      {/* {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )} */}
      {data.map((e)=>{
        {e.firstName}
      })}
    </div>
  );
};

export default MyComponent;