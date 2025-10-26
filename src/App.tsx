import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authServiceObject from "./appwrite/auth_service";
import { login, logout } from "./features/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServiceObject
      .getCurrentLoggedInUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          // if we didnt got the user data then we will update our state that the user data is null so that our state is update all the time.
          dispatch(logout())
        }
      })
      // we can add .catch() also.
      .finally(() => setLoading(false));
  }, []);

  
  // if loading is false then the first bracket will load and if loading is true then null will appear

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <main>
          {/* TODO: <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : <div>
    Loading.
  </div>
}

export default App;
