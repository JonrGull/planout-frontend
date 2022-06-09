import '../src/config/firebase.config';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import { useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8080');

import AuthStateChanged from '../components/AuthStateChanged';
import { AuthProvider } from '../src/hook/auth';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    socket.on('newTask', (data) => {
      console.log('this is your data ', data);
      toast(`Hey, Listen! There's a new task in ${data.eventname}`)
    });
  }, [socket]);

  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthStateChanged>
    </AuthProvider>
  );
}

export default MyApp;
