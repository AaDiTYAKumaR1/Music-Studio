import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {Provider} from "react-redux";
import store from './redux/store.js';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme-provider" 
import { Play } from 'lucide-react';
import  dotenv from 'dotenv'

 
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId='238683043090-k2okjt6vhfqphd7i62d34fgn6342jb0r.apps.googleusercontent.com'>
    <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    <Toaster/>
    </ThemeProvider>
    </Provider>
    </GoogleOAuthProvider>
   ,
)
