"use client"
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../../firebase/firebaseConfig';

firebase.initializeApp(firebaseConfig);

function Login() {

  const [ usn, setUsn ] = useState('');
  const [ password, setPassword ] = useState('');

  const db = firebase.firestore();

  const handleSubmit = async () => {
    console.log(usn, password)
    try {
      const users = await db.collection('users').where('usn', '==', usn).where('password', '==', password).get();
      const userData: any = [];

      users.forEach((doc) => {
        userData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      if(userData.length === 0) alert(`couldn't find a user, please check your password or username`);
      if(userData) localStorage.setItem('user', JSON.stringify(userData[0]));
      window.location.href = '/home'
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleButtonClick = async (e: any) => {
    e.preventDefault();
    console.log("nothing")
    await handleSubmit();
  };

  return (
    <div className='w-full h-full'>
      <video className='w-full h-full rotate-180 absolute top-[-400px] z-[-1] object-cover' autoPlay muted loop src="./videos/blackhole.webm"></video>
      <div className='w-full h-[80px] flex items-center pl-5'>
        <img src="./images/logo.png" className='w-[200px] bg-white bg-auto h-[60px]' alt="" />
      </div>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[30%] mt-[100px] h-[500px] z-[999] border flex flex-col items-center rounded-2xl'>
          <form action="" className='w-full h-full flex flex-col py-8 items-center'>
            <h1 className='text-white text-[30px] font-serif font-bold'>LOGIN</h1>
            <input onChange={(e) => setUsn(e.target.value)} className='w-[80%] mt-20 p-1 rounded lg' type="text" placeholder='Enter your USN number' />
            <input onChange={(e) => setPassword(e.target.value)} className='w-[80%] mt-10 p-1 rounded lg' type="password" placeholder='Enter password' />
            <button className='w-[80px] h-[30px] border mt-10 rounded-lg bg-slate-600 hover:bg-black text-white' onClick={handleButtonClick}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login    