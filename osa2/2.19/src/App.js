import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// Filter the list 
const Filter = (props) => {
  return (
    <div>
      <form className="filter">
        find countries: <input onChange={props.searchData} type="text"/>
      </form>
      <div className="countries">
        {props.data.filter((item) => {
          return props.search.toLowerCase() === "" ? item : item.name.common.toLowerCase().includes(props.search)
        }).map(country =>
          <p key={country.name.common}>{country.name.common} <button>Show</button></p>
        )}
      </div>
    </div>
  )
}


const App = () => {
  const [list, setList] = useState([])
  const [search, setSearch] = useState("")
  // Get data from server and put it into list
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(response => {
      setList(response.data)
    })
  },[])

  // Search a country
  const searchData = (event) => {
    setSearch(event.target.value)
  }

  const showDetails = () => {
    
  }
 
  return (
    <div>
      <Filter 
        data={list} 
        search={search} 
        searchData={searchData}
        showDetails={showDetails}
      />
    </div>
  )
} 

export default App;
