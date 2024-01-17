import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage';
import Login, { AuthContext } from './components/login';
import { User } from './models/User';
import Profile from './components/Profile';
import AlbumDetails from './components/AlbumDetails';
import PostDetails from './components/PostDetails';
import ProfileDetails from './components/ProfileDetails'
import Albums from './components/Albums'
import AlbumDetailsAll from './components/AlbumDetailsAll';
import PhotoDetail from './components/PhotoDetail';
import PhotoDetailsAll from './components/PhotoDetailsAll'
import Posts from './components/Posts';
import MainPagePhotoDetail from './components/MainPagePhotoDetails';

function RouterR() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/albums' element={<Albums />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/photo/:photoId' element={<MainPagePhotoDetail />} />
          <Route path="/profile/:userId" element={<ProfileDetails />} />
          <Route path="/album/:albumId" element={<AlbumDetailsAll />} />
          <Route path='/album/:albumId/:photoId' element={<PhotoDetailsAll />} />
          <Route path='/albumDetails/:albumId' element={<AlbumDetails />} />
          <Route path='/albumDetails/:albumId/:photoId' element={<PhotoDetail />} />
          <Route path='/postDetails/:postId' element={<PostDetails />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default RouterR;

