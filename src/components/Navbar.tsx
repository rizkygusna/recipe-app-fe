import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar w-full bg-red-900">
      <div className="w-full max-w-7xl mx-auto text-white p-3 flex gap-9 justify-center">
        <Link className="hover:underline underline-offset-2" to="/">
          Home
        </Link>
        <Link
          className="hover:underline underline-offset-2"
          to="/create-recipe"
        >
          Create Recipe
        </Link>
        <Link
          className="hover:underline underline-offset-2"
          to="/saved-recipes"
        >
          Saved Recipe
        </Link>
        <Link className="hover:underline underline-offset-2" to="/auth">
          Login/Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
