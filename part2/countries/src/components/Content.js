import React from 'react'
import Countries from './Countries'
import Country from './Country'

const Content = ({filtered, setFiltered}) => {

    if (filtered.length > 10)
        return(
            <p>Too many matches, specify another filter</p>
        )
    else if (filtered.length === 1) 
        return (
            <Country country={filtered[0]} />
        )
    else {
        return (
            filtered.map(country => 
           <Countries 
           key = {country.area}
           country={country} 
           setFiltered={setFiltered}/>)
        )
    }
}

export default Content
