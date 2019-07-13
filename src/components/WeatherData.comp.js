import React from 'react';

export default function WeatherData(props) {

    function handleClick(){
        window.location.reload();
    }

    return (
        <div>
            <div> <input type='submit' value='Back' className='Button' onClick={handleClick}/> </div>
        <div className='WeatherContainer'>
            <div>
                <img className='WeatherImage'  src={'https://www.metaweather.com/static/img/weather/' + props.input.consolidated_weather[0].weather_state_abbr + '.svg'}/>
            </div>
            <div className='WeatherData'>        
                <div>{props.input.consolidated_weather[0].weather_state_name}</div>        
                <div>Temp: {props.input.consolidated_weather[0].the_temp} °C</div>        
                <div>Predictability: {props.input.consolidated_weather[0].predictability}%</div>        
                <div>Location: {props.input.title}</div>     
            </div>   
        </div></div>
    )
}
