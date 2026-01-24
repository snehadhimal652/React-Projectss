import RecipeCard from "./RecipeCard";
import "./RecipeApp.css";

export default function RecipeList({ recipes }) {
  if (!recipes.length) {
    return <p>No recipes found. Try searching!</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}