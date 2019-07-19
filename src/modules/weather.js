import axios from 'axios';

const getBrowserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
            resolve(pos);
        });
    });
};

const getLocation = async (query) => {
    let queryStr = '';
    if (query) {
        queryStr = `?query=${query}`;
    } else {
        const pos = await getBrowserLocation();
        const { latitude: lat, longitude: long } = pos.coords;
        queryStr = `?lattlong=${lat},${long}`;
    }

    const locationResponse = await axios.get(`https://www.metaweather.com/api/location/search/${queryStr}`);
    //use location info to get the weather
    return locationResponse.data[0].woeid;
};

export async function getWeatherData(query){
    if (!navigator.geolocation) throw new Error('Your browser does not support geoloation');

    const placeID = await getLocation(query);

    const weatherData = await axios.get(`https://www.metaweather.com/api/location/${placeID}`);
    const { consolidated_weather, title } = weatherData.data;
    const {
        weather_state_abbr,
        weather_state_name,
        the_temp,
        predictability,
    } = consolidated_weather[0];

    return {
        state: weather_state_name,
        temp: the_temp,
        predictability,
        locationName: title,
        imageUrl: `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`,
    };
}
