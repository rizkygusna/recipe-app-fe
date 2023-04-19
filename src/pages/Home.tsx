import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);

  const getRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/recipes");
      setRecipeList(res.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching recipes");
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 items-center pt-8">
      {recipeList.length > 0 &&
        recipeList.map(({ imgUrl, name, cookingTime }) => (
          <RecipeCard imgUrl={imgUrl} name={name} cookingTime={cookingTime} />
        ))}
    </div>
  );
};

export default Home;
