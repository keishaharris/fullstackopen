import axios from "axios";
import React, {useState, useEffect} from "react"
import Filter from "./components/Filter";
import Content from "./components/Content";

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filtercountries, setFilterCountries ] = useState('')
  const [ filtered, setFiltered] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(res => {
      setCountries(res.data)
    }) 
  }, [])

  const handleCountryChange =(e) => {
    e.preventDefault()
    console.log(e.target.value)
    let value = e.target.value 
    setFilterCountries(value)
    setFiltered(countries.filter(country => country.name.common.includes(value)))
  }

  return (
    <div>
      <Filter value={filtercountries} onChange={handleCountryChange} />
      <Content filtered={filtered} 
      setFiltered={setFiltered} />
    </div>
  );
}

export default App;
