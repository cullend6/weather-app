import React, { useState }  from 'react';
import axios from 'axios';
import './App.css';
import WeatherData from './components/WeatherData.comp';
import Loading from './components/Loading.comp';
import InvalidPlace from './components/InvalidPlace.comp'
import { async } from 'q';

function App() {

  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [place, setPlace] = useState();
  const [cantFindPlace, setCantFindPlace] = useState(false);

  let body = <div className='bodyText'>
                  <div className='ButtonContainer'><input type='submit' className='CurrentButton' value='Current location' onClick={handleDefaultLocation} /></div>
                  <div className='ButtonContainer'>
                    <div><input type='input' className='textBox' placeholder='Or Enter A Location' onChange={(e) => setPlace(e.target.value)}/></div>
                    <div><input type='submit' className='Button' value='Submit' onClick={handlePickedLocation} /></div>
                  </div>
              </div>

  async function handleDefaultLocation(){

    setLoading(true);

    if(navigator.geolocation){

      await navigator.geolocation.getCurrentPosition(async (pos) => {
        
        //get browser co-ords and find info about the location
        const long = pos.coords.longitude;
        const lat = pos.coords.latitude;
        const response = await axios.get('https://www.metaweather.com/api/location/search/?lattlong=' + lat + ',' + long);
    
        //use location info to get the weather 
        const placeID = response.data[0].woeid;
        const response2 = await axios.get('https://www.metaweather.com/api/location/' + placeID);
        
        //set weather data
        setWeatherData(response2.data);
        setDataReady(true);
        setLoading(false);
      })

    }
    else {
      body = <div>Can't tell where you are bro</div>
    }
  }

  async function handlePickedLocation(){

    setLoading(true);

    let response = await axios.get('https://www.metaweather.com/api/location/search/?query=' + place);

    console.log(response);
    //use location info to get the weather 
    if(response.data.length != 0){
      const placeID = response.data[0].woeid;
      const response2 = await axios.get('https://www.metaweather.com/api/location/' + placeID);
      
      //set weather data
      setWeatherData(response2.data);
      setDataReady(true);
      setLoading(false);
    } else {
      setLoading(false);
      setCantFindPlace(true);
    }

  }

  if (loading) {
    body = <Loading />
  }

  if ( dataReady ){
    body = <WeatherData input={weatherData} />
  }

  if(cantFindPlace){
    body = <InvalidPlace />
  }

  return (
    <div className="App">
      { body }
    </div>
  );
}

export default App;
