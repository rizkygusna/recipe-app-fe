import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar w-full bg-red-900">
      <div className="w-full max-w-7xl mx-auto text-white p-3 flex gap-9 justify-center text-lg">
        <NavLink
          className="hover:underline underline-offset-2"
          to="/"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
            };
          }}
        >
          Home
        </NavLink>
        <NavLink
          className="hover:underline underline-offset-2"
          to="/create-recipe"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
            };
          }}
        >
          Create Recipe
        </NavLink>
        <NavLink
          className="hover:underline underline-offset-2"
          to="/saved-recipes"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
            };
          }}
        >
          Saved Recipe
        </NavLink>
        <NavLink
          className="hover:underline underline-offset-2"
          to="/auth"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
            };
          }}
        >
          Login/Register
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
