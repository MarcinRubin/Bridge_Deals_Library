import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const MainPage = ({profile, profile_pic}) => {
  return (
    <>
    <Header
        profile = {profile}
        profile_pic = {profile_pic}
      />
    <div className="main-page-container">
      <Outlet context={profile}/>
    </div>
    </>
  )
}

export default MainPage
