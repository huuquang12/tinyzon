import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Home from './pages/Home'
import Product from './pages/Product';
import Cart from './pages/Cart'
import Signin from './pages/Signin';
import { signout } from './actions/userActions';
import Register from './pages/Register';
import ShippingAddress from './pages/ShippingAddress';
import PaymentMethod from './pages/PaymentMethod';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductList from './pages/ProductList';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/"> 
              amazona
            </Link>
          </div>
          <div>
          <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                      {userInfo.name} 
                        <i className="fa fa-caret-down">
                        </i> 
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>Sign out</Link>
                    </li>
                  </ul>
                </div>
              ) : 
              (
                <Link to="/signin">Sign In</Link>
              )
            }
            { userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          </header>
        <main>
          <Route path="/cart/:id?" component={Cart}></Route>
          <Route path="/product/:id" component={Product}></Route>
          <Route path="/" component={Home} exact></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/shipping" component={ShippingAddress}></Route>
          <Route path="/payment" component={PaymentMethod}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>
          <Route path="/order/:id" component={Order}></Route>
          <Route path="/orderhistory" component={OrderHistory}></Route>
          <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductList}></AdminRoute>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;