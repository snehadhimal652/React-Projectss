import { useState } from "react";
import SearchBar from "./SearchBar";
import RecipeList from "./RecipeList";
import "./RecipeApp.css";

export default function RecipeApp() {
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async (query) => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="recipe-app">
      <div className="header">
      <h1>🍳 Recipe Finder</h1>
 </div> 
     <SearchBar onSearch={searchRecipes} />
      <RecipeList recipes={recipes} />
    </div>
  );
}