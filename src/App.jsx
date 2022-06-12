import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import { API_URL } from "./helper";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './Redux/Actions/usersAction';
import ProfilePage from './Pages/ProfilePage';
import SigninPage from './Pages/SigninPage';
import SettingsPage from './Pages/SettingsPage';
import SinglePostPage from './Pages/SinglePostPage';

function App() {

  const dispatch = useDispatch();


  const { username } = useSelector((state) => {
    return {
      username: state.usersReducer.username
    }
  })


  React.useEffect(() => {
    keepLogin();
  }, [])

  const keepLogin = () => {
    let token = localStorage.getItem("tokenIdUser")

    if (token) {
      Axios.get(`${API_URL}/users?id=${token}`)
        .then((response) => {
          localStorage.setItem("tokenIdUser", response.data[0].id)
          dispatch(loginAction(response.data[0]))
        }).catch((error) => {
          console.log(error)
        })
    }
  }


  return (
    <div>
      <Routes>
        {/* <Route
          path='/'
          element={
            !username ? (
              <Navigate replace to="/login" />) :
              (<Homepage />)} />

        <Route
          path='/profile'
          element={
            !username ? (
              <Navigate replace to="/login" />) :
              (<ProfilePage />)} 
        /> */}

        {username ?
          <>
            <Route path='/' element={<Homepage />} />
            {/* <Route path={`/profile/${username}`} element={<ProfilePage />} /> */}
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/login' element={<Navigate replace to='/' />} />
            <Route path='/post' element={<SinglePostPage />} />
          </>
          :
          <>
            <Route path='/login' element={<SigninPage />} />
            <Route path='/' element={<Navigate replace to='/login' />} />
            <Route path='/profile' element={<Navigate replace to='/login' />} />
            <Route path='/settings' element={<Navigate replace to='/login' />} />
          </>
        }

      </Routes>
    </div>
  );
}

export default App;
