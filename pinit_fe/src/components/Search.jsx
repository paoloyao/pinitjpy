import React, { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if(searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query)
      .then((data) => {
        if(!isMounted) return
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery)
      .then((data) => {
        if(!isMounted) return
        setPins(data);
        setLoading(false);
      });
    }
  
    return () => {
      isMounted = false;
    }
  }, [searchTerm])
  

  return (
    <div>
      { loading ? <Spinner message='Searching for pins' /> : null }
      {
        pins?.length !== 0 && !loading
        ? (
          <MasonryLayout pins={pins} />
        )
        : (
          <div className='mt-10 text-center text-xl'>
            No Pins found
          </div>
        ) 
      }
    </div>
  )
}

export default Search