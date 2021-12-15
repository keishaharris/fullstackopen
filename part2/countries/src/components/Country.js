import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({country}) => {
    const [weather, setWeather] = useState([])

    const lat = country.latlng[0]
    const lon = country.latlng[1]

    useEffect(() => {
        axios.get(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res=> {
            console.log(res)
            setWeather(res)})
    }, [lat, lon])
    return (
        <div>
            <h1>{country.name.common} </h1>
            <p> Capital: {country.capital[0]}</p>
            <p>Population: {country.population}</p>

            <h2>Spoken languge</h2>
            <ul>
            {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
            </ul>

            <img src={country.flags.png} alt="flag"/>
            <h2>Weather in {country.capital[0]}</h2>
            {/* <p>temperature: {temperature.value}</p>
            <p>wind: {wind.speed.value}</p> */}
        </div>
    )
}

export default Country
