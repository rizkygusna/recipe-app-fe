import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookie("token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <div className="navbar w-full bg-primary">
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
        {cookie.token ? (
          <button className="btn btn-sm btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
