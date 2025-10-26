import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "../LogoutBtn";

const Header = () => {
  // useSelector accepts a call back in that callback we get state.
  // we can access values from our state like this
  // we will use state, then we will use a dot operator and have the name of the slice and from there we can access the status and userData as well
  const userAuthStatus = useSelector(
    (state: RootState) => state.AuthSlice.status
  );
  const navigate = useNavigate();

  // when we have to create a navigation bar then we have to make an array and then loop over that array

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !userAuthStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !userAuthStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: userAuthStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: userAuthStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to={"/"}>
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.url)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {
                userAuthStatus && (
                    <li>
                        <LogoutBtn />
                    </li>
                )
            }
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
