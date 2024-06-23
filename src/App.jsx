import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Bag from "./pages/Bag";
import Order from "./pages/Order";
import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Individual from "./pages/Individual";
import { useSelector } from "react-redux";
import ScrollToTop from "./utility/ScrollToTop";
import Page404 from "./utility/404";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";
import Live from "./pages/Live";
import HandLive from "./pages/HandLive";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/products/:category" element={<ProductList />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/bag" element={<Bag />}></Route>
          <Route path="/products/individual" element={<Individual />}></Route>
          <Route path="/live" element={<Live />}></Route>
          <Route
            path="/account"
            element={user === null ? <Navigate to="/sign-in" /> : <Account />}
          ></Route>
          <Route
            path="/orders"
            element={user === null ? <Navigate to="/sign-in" /> : <Orders />}
          ></Route>
          <Route
            path="/order/:id"
            element={user === null ? <Navigate to="/sign-in" /> : <Order />}
          ></Route>
          <Route
            path="/success"
            element={user === null ? <Navigate to="/sign-in" /> : <Success />}
          ></Route>
          <Route
            path="/sign-in"
            element={user ? <Navigate to={-1} /> : <SignIn />}
          ></Route>
          <Route
            path="/sign-up"
            element={user ? <Navigate to={-2} /> : <SignUp />}
          ></Route>
          <Route
            path="/forget-password"
            element={user ? <Navigate to={-2} /> : <ForgetPassword />}
          ></Route>
          <Route
            path="/reset/:id/:token"
            element={user ? <Navigate to={-2} /> : <ChangePassword />}
          ></Route>
          <Route path="/hand" element={<HandLive />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
