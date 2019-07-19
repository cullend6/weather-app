import React from 'react';

export default function WeatherData(props) {
    function handleClick(){
        window.location.reload();
    }

    const { state, temp, predictability, locationName, imageUrl } = props.input;

    return (
        <div>
            <div> <input type='submit' value='Back' className='Button' onClick={handleClick}/> </div>
            <div className='WeatherContainer'>
                <div>
                    <img className='WeatherImage' alt={state} src={imageUrl}/>
                </div>
                <div className='WeatherData'>        
                    <div>{state}</div>
                    <div>Temp: {temp} °C</div>        
                    <div>Predictability: {predictability}%</div>        
                    <div>Location: {locationName}</div>     
                </div>   
            </div>
        </div>
    )
}
