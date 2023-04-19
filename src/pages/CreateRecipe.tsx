import axios from "axios";
import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface IRecipe {
  name: string;
  ingredients: Array<string>;
  instruction: string;
  imgUrl: string;
  cookingTime: number;
}

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<IRecipe>({
    name: "",
    ingredients: [],
    instruction: "",
    imgUrl: "",
    cookingTime: 0,
  });

  const ingredientsInput = useRef<HTMLInputElement>(null);

  const handleFormChange = (event: React.ChangeEvent<any>) => {
    const { value, name } = event.target;
    const intValue = parseInt(value);
    setRecipe({
      ...recipe,
      [name]: name !== "cookingTime" ? value : intValue,
    });
  };

  const handleAddIngredients = () => {
    if (!ingredientsInput.current || !ingredientsInput.current.value) return;
    if (ingredientsInput.current.value.length <= 0) return;
    const addedIngredient = ingredientsInput.current?.value;
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, addedIngredient],
    });
    ingredientsInput.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = window.localStorage.getItem("userId");
    if (!userId) return;
    try {
      const res = await axios.post("http://localhost:3001/recipes", {
        ...recipe,
        createdById: userId,
      });
      alert("Recipe saved!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("An error occured, please check your network connection");
    }
  };

  const handleDeleteIngredient = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
    const ingredientsCopy = [...recipe.ingredients];
    ingredientsCopy.splice(index, 1);
    setRecipe({
      ...recipe,
      ingredients: ingredientsCopy,
    });
  };

  return (
    <div className="card w-full max-w-md mt-16 mx-auto shadow bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Create Recipe</h2>
        <form className="form-control w-full gap-3" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter recipe name"
              className="input input-bordered w-full"
              name="name"
              onChange={handleFormChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="ingredients">
              <span className="label-text">Ingredients</span>
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Add ingredients"
                className="input input-bordered mr-2 w-[90%]"
                name="ingredients"
                ref={ingredientsInput}
              />
              <button
                type="button"
                onClick={handleAddIngredients}
                className="btn btn-outline btn-primary"
              >
                Add
              </button>
            </div>
            {recipe?.ingredients.length > 0 && (
              <ul className="flex flex-col gap-2 mt-3">
                {recipe.ingredients.map((item, index) => (
                  <li>
                    {item}
                    <span>
                      <button
                        className="btn btn-outline btn-xs btn-error ml-1"
                        onClick={(event) =>
                          handleDeleteIngredient(event, index)
                        }
                      >
                        <FaTrash></FaTrash>
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="instruction">
              <span className="label-text">Instruction</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              name="instruction"
              rows={7}
              onChange={handleFormChange}
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="imgUrl">
              <span className="label-text">Image url</span>
            </label>
            <input
              className="textarea textarea-bordered"
              type="url"
              name="imgUrl"
              id="imgUrl"
              onChange={handleFormChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="cookingTime">
              <span className="label-text">Cooking time (minute)</span>
            </label>
            <input
              className="input input-bordered"
              type="number"
              name="cookingTime"
              id="cookingTime"
              min={1}
              onChange={handleFormChange}
            />
          </div>
          <button className="btn btn-primary btn-block my-4" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
