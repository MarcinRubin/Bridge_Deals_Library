import { useState } from "react";

const Header = ({user, setActiveSession, client, setOption}) => {

  const handleOptionChange = (e) =>{
    e.preventDefault;
    setOption(e.target.dataset.option);
  }

  const handleLogout = async (e) =>{
    e.preventDefault;
    try{
      const response = await client.post("/api/logout/");
      if(response.status !== 200) throw new Error('Response status is not 200')
      setActiveSession(false);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="header-container">
        <div className="left-control-panel">
            <div className="logo">LOGO</div>
            <nav className="header-nav">
                <a data-option="1" onClick={handleOptionChange}>Create Deal</a>
                <a data-option="2" onClick={handleOptionChange}>All Deals</a>
                <a data-option="2" onClick={handleOptionChange}>My Deals</a>
                <a>Schedule</a>
                <a>Profile</a>
            </nav>
        </div>
        <div className="right-control-panel">
            <span className='username-tag'>{user}</span>
            <button className="logout" onClick={handleLogout}>Log out</button>
        </div>
    </div>
  )
}

export default Header
