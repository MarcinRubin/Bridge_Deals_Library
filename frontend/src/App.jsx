import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Authentication from './pages/Authentication';
import MainPage from './pages/MainPage';


// axios global setup///////////////////////////
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://localhost:81"
});
////////////////////////////////////////////////

function App() {

  const [activeSession, setActiveSession] = useState(false);
  const [activeUser, setActiveUser] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const token_retrieve = await client.get('/api/csrf_cookie/');
      const active_session = await client.get('/api/active_session');

      if (active_session.data['isAuthenticated']) {
        setActiveSession(true);
        setActiveUser(active_session.data['user']);
      }
    }
    fetchData()
      .catch(handleError);
  }, []);

  const handleError = (err) => {
    console.log(err);
  }

  return (
  <div className='main'>
    {!activeSession && <Authentication
        setActiveSession={setActiveSession}
        client = {client}
        setActiveUser = {setActiveUser}
      />}

    {activeSession && <MainPage
      setActiveSession = {setActiveSession}
      client = {client}
      user = {activeUser}
    />}
  </div>

);
}

export default App;
