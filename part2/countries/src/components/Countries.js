import React from 'react'

const Countries = ({country, setFiltered}) => {
    const handler = (country) => setFiltered([country])
    console.log(country)
    return (
        <div>
            <p>
            {country.name.common}
            <button value={country} onClick={() => {handler(country)}}> 
             show me
            </button>
            </p>
        </div>
    )
}

export default Countries

