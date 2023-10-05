import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getSavedRecipes, getSavedRecipesIds } from "../services/recipe";
import { useCookies } from "react-cookie";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookie, setCookie] = useCookies(["token"]);
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    getSavedRecipes(cookie.token && userId).then((value) =>
      setSavedRecipes(value)
    );
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 items-center pt-8">
      <h1>Saved Recipes</h1>
      {savedRecipes.length > 0 &&
        savedRecipes.map(({ imgUrl, name, cookingTime, id }) => (
          <RecipeCard
            key={id}
            imgUrl={imgUrl}
            name={name}
            cookingTime={cookingTime}
          />
        ))}
    </div>
  );
};

export default SavedRecipes;
