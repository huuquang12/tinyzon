import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage'
import SigninPage from './pages/SigninPage';
import { signout } from './actions/userActions';

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
                    <Link to="#signout" onClick={signoutHandler}>Sign out</Link>
                  </ul>
                </div>
              ) : 
              (
                <Link to="/signin">Sign In</Link>
              )
            }
          </div>
          </header>
        <main>
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/product/:id" component={ProductPage}></Route>
          <Route path="/" component={HomePage} exact></Route>
          <Route path="/signin" component={SigninPage}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;