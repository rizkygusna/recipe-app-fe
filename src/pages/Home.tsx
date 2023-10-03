import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [cookie, setCookie] = useCookies(["token"]);
  const userId = window.localStorage.getItem("userId");

  const getRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/recipes");
      setRecipeList(res.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching recipes");
    }
  };

  const saveRecipe = async (recipeId: string, userId: string) => {
    try {
      const res = await axios.put("http://localhost:3001/recipes", {
        recipeId,
        userId,
      });
    } catch (error) {
      console.log(error);
      alert("Error saving recipe");
    }
  };

  const getSavedRecipes = async (userId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/recipes/saved-recipes/ids/${userId}`
      );
      setSavedRecipes(res.data.savedRecipes);
    } catch (error) {
      alert("Could not fetch saved recipes");
    }
  };

  useEffect(() => {
    getRecipes();
    if (cookie.token && userId) getSavedRecipes(userId);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 items-center pt-8">
      {recipeList.length > 0 &&
        recipeList.map(({ imgUrl, name, cookingTime, id }) => (
          <RecipeCard
            imgUrl={imgUrl}
            name={name}
            cookingTime={cookingTime}
            onClickSave={() =>
              cookie.token && userId
                ? saveRecipe(id, userId)
                : alert("Please login")
            }
          />
        ))}
    </div>
  );
};

export default Home;
