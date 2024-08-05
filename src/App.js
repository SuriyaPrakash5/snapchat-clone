import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chats from './Chats';
import ChatView from './ChatView';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';
import Login from './Login';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <>
            <img className='app__logo' src="https://upload.wikimedia.org/wikipedia/zh/thumb/c/c4/Snapchat_logo.svg/1200px-Snapchat_logo.svg.png" alt="" />
            <div className="app__body">
              <div className='app__bodyBackground'>

                <Routes>

                  <Route
                    exact
                    path='/chats/view'
                    element={<ChatView />} />

                  <Route
                    exact
                    path='/chats'
                    element={<Chats />} />

                  <Route
                    exact
                    path='/preview'
                    element={<Preview />} />

                  <Route
                    exact
                    path="/"
                    element={
                      <WebcamCapture />
                    }
                  />
                </Routes>
              </div>

            </div>
          </>
        )}

      </BrowserRouter>

    </div>
  );
}

export default App;
