import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useCookies } from "react-cookie";
import { getRecipes, getSavedRecipes, saveRecipe } from "../services/recipe";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [cookie, setCookie] = useCookies(["token"]);
  const userId = window.localStorage.getItem("userId");

  const fetchRecipes = async () => {
    const res = await getRecipes();
    setRecipeList(res);
  };

  const fetchSavedRecipes = async () => {
    if (cookie.token && userId) {
      const res = await getSavedRecipes(userId);
      setSavedRecipes(res);
    }
  };

  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.includes(recipeId);
  };

  useEffect(() => {
    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 items-center pt-8">
      {recipeList.length > 0 &&
        recipeList.map(({ imgUrl, name, cookingTime, id }) => (
          <RecipeCard
            key={id}
            imgUrl={imgUrl}
            name={name}
            cookingTime={cookingTime}
            onClickSave={() =>
              cookie.token && userId
                ? saveRecipe(id, userId)
                : alert("Please login")
            }
            isSaved={isRecipeSaved(id)}
          />
        ))}
    </div>
  );
};

export default Home;
