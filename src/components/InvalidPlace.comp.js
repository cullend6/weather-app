import React, { useState, useEffect } from 'react'

export default function InvalidPlace() {

    useEffect(() => {
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    })

    return (
        <div className='InvalidContainer'>
            <div>I can't find that place!</div>
            <div>I'll bring you back for another go.</div>
        </div>
    )
}
