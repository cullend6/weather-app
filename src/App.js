import React, { useState }  from 'react';
import './App.css';
import WeatherData from './components/WeatherData.comp';
import Loading from './components/Loading.comp';
import InvalidPlace from './components/InvalidPlace.comp'
import { getWeatherData } from './modules/weather';


function App() {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState();
  const [cantFindPlace, setCantFindPlace] = useState(false);

  const handleSelected = (query) => {
    return async () => {
      try {
        setLoading(true);
        const data = await getWeatherData(query);
        setWeatherData(data);
      } catch (err) {
        setCantFindPlace(true);
      } finally {
        setLoading(false);
      }
    };
  };

  const getBody = (loading, weatherData, cantFindPlace) => {
    if (weatherData) return <WeatherData input={weatherData} />
    if (cantFindPlace) return <InvalidPlace />
    if (loading) return <Loading />
    return (
      <div className='bodyText'>
          <div className='ButtonContainer'>
            <input type='submit' className='CurrentButton' value='Current location' onClick={handleSelected()} />
          </div>
          <div className='ButtonContainer'>
            <div><input type='input' className='textBox' placeholder='Or Enter A Location' onChange={(e) => setPlace(e.target.value)}/></div>
            <div><input type='submit' className='Button' value='Submit' onClick={handleSelected(place)} /></div>
          </div>
      </div>
    );
  };

  return (
    <div className="App">
      { getBody(loading, weatherData, cantFindPlace) }
    </div>
  );
}

export default App;
