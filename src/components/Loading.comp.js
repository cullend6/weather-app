import React from 'react'

export default function Loading() {

    const abbreviations = ['sn', 'sl', 'h', 't', 'hr', 'lr', 's', 'hc', 'lc', 'c'];

    const spinImage = abbreviations[Math.floor(Math.random()*10)];

    return (
        <div className='loader'>
            <img className='LoadingImage' src={'https://www.metaweather.com/static/img/weather/' + spinImage + '.svg'}/>       
        </div>
    )
}
