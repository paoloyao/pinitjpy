import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png'
import jwt_decode from 'jwt-decode'
import { client } from '../client';

function Login() {
  const navigate = useNavigate();
  const decodeJwt = (payload) => jwt_decode(payload);
  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem('user', JSON.stringify(decodeJwt(response.credential)));
    const { name, picture, sub } = decodeJwt(response.credential);
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }
    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', {replace: true});
    })
  };

  useEffect(() => {
    let script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      const {google} = window;
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
        callback: responseGoogle
      });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large", width: "200px" }  // customization attributes
      );
    };
    document.head.appendChild(script);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
        <div className='p-5'>
          <img src={logo} width='130px' alt='logo' />
        </div>
        <div className='shadow-2xl'>
          <button
              type='button'
              className='bg-mainColor flex justify-center items-center rounded-full cursor-pointer outline-none'
              id='signInDiv'
            >
              <FcGoogle className='m-4' />
            </button>
        </div>
      </div>
    </div>
  )
}

export default Login