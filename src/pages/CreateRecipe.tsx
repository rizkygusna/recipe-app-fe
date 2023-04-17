import React, { useState } from "react";

interface IRecipe {
  name: string;
  ingredients: Array<string>;
  instruction: string;
  imageUrl: string;
  cookingTime: number;
}

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState<IRecipe>({
    name: "",
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
  });

  const handleFormChange = (event: React.ChangeEvent<any>) => {
    const { value, name } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <div className="card w-full max-w-md mt-16 mx-auto shadow bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Create Recipe</h2>
        <form className="form-control w-full gap-3">
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
            <label className="label" htmlFor="image-url">
              <span className="label-text">Image url</span>
            </label>
            <input
              className="textarea textarea-bordered"
              type="url"
              name="image-url"
              id="imageUrl"
              onChange={handleFormChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="cooking-time">
              <span className="label-text">Cooking time (minute)</span>
            </label>
            <input
              className="input input-bordered"
              type="number"
              name="cooking-time"
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
