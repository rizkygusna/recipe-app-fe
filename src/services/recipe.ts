import axios from "axios";

export const getRecipes = async () => {
  try {
    const res = await axios.get("http://localhost:3001/recipes");
    return res.data;
  } catch (error) {
    console.log(error);
    alert("Error fetching recipes");
  }
};

export const saveRecipe = async (recipeId: string, userId: string) => {
  try {
    const res = await axios.put("http://localhost:3001/recipes", {
      recipeId,
      userId,
    });
    alert("Recipe saved");
  } catch (error) {
    console.log(error);
    alert("Error saving recipe");
  }
};

export const getSavedRecipesIds = async (userId: string) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/recipes/saved-recipes/ids/${userId}`
    );
    return res.data.savedRecipes;
  } catch (error) {
    alert("Could not fetch saved recipes");
  }
};

export const getSavedRecipes = async (userId: string) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/recipes/saved-recipes/${userId}`
    );
    return res.data;
  } catch (error) {
    alert("Could not fetch saved recipes");
  }
};
