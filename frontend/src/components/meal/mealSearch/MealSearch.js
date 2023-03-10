import React, { useState } from 'react'
import MealSearchList from './MealSearchList';
import { fetchRecipeSearchResults } from '../../util/ApiUtil';

export default function MealSearch() {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    cuisine: "",
    instructionsRequired: true
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async e => {
    e.preventDefault();
    if (searchQuery.length > 0) {
        const results = await fetchRecipeSearchResults(searchQuery, searchFilters);
        setSearchResults(results);
    }
  }

  const renderSearchResults = () => {
    if (searchResults.length > 0) {
        return <MealSearchList recipes={searchResults} />
    }
  }

  return (
    <div>
        <h1>Meal Search</h1>
        <section className='recipe-search'>
            <label htmlFor='recipe-search'>Search</label>
            <input onChange={(e) => setSearchQuery(e.target.value)} name='recipe-search' type="text"></input>
            <label htmlFor='cuisine-filter'>Cuisine Type</label>
            <select onChange={(e) => setSearchFilters(searchFilters => ({ ...searchFilters, 'cuisine': e.target.value}))}>
                <option value="">None</option>
                <option value="American">American</option>
                <option value="Chinese">Chinese</option>
                <option value="Thai">Thai</option> 
            </select>

            <button onClick={handleSearch}>Search</button>
        </section>
        {renderSearchResults()}
    </div>
    
  )
}
