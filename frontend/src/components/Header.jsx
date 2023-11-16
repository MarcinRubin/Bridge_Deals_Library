const Header = ({user, setActiveSession, client}) => {

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
                <a>My Deals</a>
                <a>All Deals</a>
                <a>My comments</a>
                <a>Schedule</a>
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
