import React from "react";

interface IProps {
  imgUrl: string;
  name: string;
  cookingTime: number;
  onClickSave: (e: any) => void;
}

const RecipeCard = ({ imgUrl, name, cookingTime, onClickSave }: IProps) => {
  return (
    <div className="card card-compact w-full max-w-md shadow">
      <figure>
        <img src={imgUrl} alt={name} />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{name}</h2>
          <button onClick={onClickSave}>Save</button>
        </div>
        <p>Cooking Time: {cookingTime} minutes</p>
      </div>
    </div>
  );
};

export default RecipeCard;
