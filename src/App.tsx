import React, { useState, useEffect, FormEvent } from 'react';
import './App.css';

function App() {
  const [recipesFound, setRecipesFound] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (recipeSearch:string): Promise<any> => {
    const data = await fetch(`http://localhost:3001/?search=${recipeSearch}`);
    return (await data.json()).results;
  }

  
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
  }

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      if(query) {
        const recipes = await searchForRecipes(query); 
        setRecipesFound(recipes);
      }
   
    })();
  }, [recipeSearch]);



  return (
    <div className="App">
      <h1>Recipe Box</h1>
      <form className="searchForm" onSubmit={event => handleSearch(event)}>
        <input id="searchText" type="text" />
        <button id="searchButton" onClick={() => setRecipeSearch(recipeSearch)}>Search</button>
      </form>
    </div>
  );
}

export default App;
