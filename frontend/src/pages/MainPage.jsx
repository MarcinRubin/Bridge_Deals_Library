const MainPage = ({setActiveSession, client, user}) => {

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
    <div className="main-container">
      <div>You are logged as {user}</div>
      <button className="logout" onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default MainPage
