import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState(null)

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    if(categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
      .then((data) => {
        if(mounted) setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
    return () => {
      mounted = false;
    }
  }, [categoryId])
  
  if(loading) 
    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
          <Spinner message='Your feed is filling up with new inspiration!' />
        </div>
    )
  
  if(!pins?.length) 
    return (
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <h2 className='text-2xl'>
          No pins available...
        </h2>
      </div>
    )

  return (
    <div>
      {
        pins
        ? <MasonryLayout pins={pins} />
        : null
      }
    </div>
  )
}

export default Feed