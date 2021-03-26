// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import qs from 'qs';

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const redirectUri = encodeURIComponent(`https://a66003e1e3e5.ap.ngrok.io`);
  const lineClientId = process.env.REACT_APP_LINE_CLIENT_ID;
  const lineClientSecret = process.env.REACT_APP_LINE_CLIENT_SECRET;

  const loginLine = async () => {
    const state = Math.random().toString(36).substr(2, 9);
    const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${lineClientId}&redirect_uri=${redirectUri}&state=${state}&scope=profile%20openid`;
    window.open(url, '_blank');
  };

  const data = qs.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'https://a66003e1e3e5.ap.ngrok.io',
    client_id: lineClientId,
    client_secret: lineClientSecret,
  });
  const config = {
    method: 'post',
    url: 'https://api.line.me/oauth2/v2.1/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  };

  const getTokenLine = async () => {
    const response = await axios(config)
      .then((response) => response.data)
      .catch((err) => console.log(err));

    console.log(response);
  };

  return (
    <div className='App'>
      <button onClick={loginLine}>Line Login</button>
      {code && <button onClick={getTokenLine}>getToken</button>}
    </div>
  );
}

export default App;
