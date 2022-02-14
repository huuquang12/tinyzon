import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Home from './pages/Home'
import Products from './pages/Products';
import Cart from './pages/Cart'
import Signin from './pages/Signin';
import { signout } from './actions/userActions';
import Register from './pages/Register';

import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SellerRoute from './components/SellerRoute'
import SellerScreen from './pages/Seller';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import OrderList from './pages/OrderList';
import SearchProduct from './pages/SearchProduct';
import SearchBox from './components/SearchBox';
import { listProductCategories, listProductBrands } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import UserList from './pages/UserList';
import ShippingAddress from './pages/ShippingAddress';
import PaymentMethod from './pages/PaymentMethod';
import EditUser from './pages/EditUser';

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const productBrandList = useSelector((state) => state.productBrandList);
  const {
    loading: loadingBrands,
    error: errorBrands,
    brands,
  } = productBrandList;


  useEffect(() => {
    dispatch(listProductBrands());
  }, [dispatch]);

  return (
    <BrowserRouter BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/"> 
              tinyzon
            </Link>
          </div>
          {
            userSignin ? (
              <div>
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
            </div>
            ) : (
              null
            )
          }
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
                      <Link to="/profile">Profile</Link>
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
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            { userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
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
          <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
          <ul className="categories">
            <li>
              <strong>Brands</strong>
            </li>
            {loadingBrands ? (
              <LoadingBox></LoadingBox>
            ) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              brands.map((b) => (
                <li key={b}>
                  <Link
                    to={`/search/brand/${b}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {b}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={Cart}></Route>
          <Route path="/product/:id" component={Products} exact></Route>
          <Route path="/product/:id/edit" component={EditProduct} exact></Route>
          <Route path="/" component={Home} exact></Route>
          <Route path="/pageNumber/:pageNumber" component={Home}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/shipping" component={ShippingAddress}></Route>
          <Route path="/payment" component={PaymentMethod}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>
          <Route path="/order/:id" component={Order}></Route>
          <Route path="/orderhistory" component={OrderHistory}></Route>
          <Route path="/search/name/:name?" component={SearchProduct} exact></Route>
          <Route
            path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={SearchProduct}
            exact
          ></Route>
          <Route path="/search/category/:category" component={SearchProduct} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchProduct} exact></Route>
          <Route path="/search/brand/:brand" component={SearchProduct} exact></Route>
          <Route path="/search/brand/:brand/name/:name" component={SearchProduct} exact></Route>
          <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductList}
          ></AdminRoute>
          <AdminRoute
            path="/productlist"
            component={ProductList}
            exact
          ></AdminRoute>          
          <AdminRoute
            path="/user/:id/edit"
            component={EditUser}
          ></AdminRoute>          
          <AdminRoute path="/orderlist" component={OrderList} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserList}></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductList}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderList}
          ></SellerRoute>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;