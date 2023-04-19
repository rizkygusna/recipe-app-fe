import React from "react";

interface IProps {
  imgUrl: string;
  name: string;
  cookingTime: number;
}

const RecipeCard = ({ imgUrl, name, cookingTime }: IProps) => {
  return (
    <div className="card card-compact w-full max-w-md shadow">
      <figure>
        <img src={imgUrl} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Cooking Time: {cookingTime} minutes</p>
      </div>
    </div>
  );
};

export default RecipeCard;
