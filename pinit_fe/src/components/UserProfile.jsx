import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import defaultImg from '../utils/defaultImg';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology';
function UserProfile() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  const btnStyles = {
    activeBtnStyled: 'transition-all duration-150 ease-in bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none',
    notActiveBtnStyles: 'transition-all duration-150 ease-in bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'
  }

  useEffect(() => {
    let isMounted = true;
    const query = userQuery(userId);
    client.fetch(query)
    .then((data) => {
      if(isMounted) setUser(data[0]);
    });
  
    return () => {
      isMounted = false;
    }
  }, [userId])

  const googleSignOut = () => {
    const { google } = window;
    google.accounts.id.disableAutoSelect();
    localStorage.clear();
    navigate('/login');
  };
  
  useEffect(() => {
    let isMounted = true;
    if(text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery)
      .then((data) => {
        if(isMounted) setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery)
      .then((data) => {
        if(isMounted) setPins(data);
      });
    }
  
    return () => {
      isMounted = false;
    }
  }, [text, userId])
  

  if(!user) return <Spinner message='loading profile...' />  
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img 
              src={randomImage}
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner profile'
            />
            <img 
              src={user?.image}
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              alt='user profile pic'
              onError={defaultImg} 
            />
            <h1 className='font-bold text-2xl text-center mt-3'>
              {user.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              { 
                userId === user._id
                ? (
                    <button
                        type='button'
                        className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                        onClick={googleSignOut}
                      >
                        <AiOutlineLogout color='red' fontSize={21} />
                    </button>
                ) : null
              }
            </div>
          </div>
          <div className='text-center mb-7 mt-2'>
              <button
                type='button'
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn('created')
                }}
                className={`${activeBtn === 'created' ? btnStyles.activeBtnStyled : btnStyles.notActiveBtnStyles}`}
              >
                Created
              </button>
              <button
                type='button'
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn('saved')
                }}
                className={`${activeBtn === 'saved' ? btnStyles.activeBtnStyled : btnStyles.notActiveBtnStyles}`}
              >
                Saved
              </button>
          </div>
          {
            pins?.length
            ? (
                <div className='px-2'>
                  <MasonryLayout pins={pins} />
                </div>
            )
            : (
              <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
                No pins found
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UserProfile