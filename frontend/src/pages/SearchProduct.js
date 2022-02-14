import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchProduct(props) {
  const {
    name = 'all',
    category = 'all',
    brand = 'all',
    min = 0,
    max = 0,
    order = 'lastest',
    pageNumber = 1,
  } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
    } = productCategoryList;

    const productBrandList = useSelector((state) => state.productBrandList);
    const {
      loading: loadingBrands,
      error: errorBrands,
      brands,
    } = productBrandList;
    useEffect(() => {
      dispatch(
        listProducts({
          pageNumber,
          name: name !== 'all' ? name : '',
          category: category !== 'all' ? category : '',
          brand: brand !== 'all' ? brand : '',
          min,
          max,
          order,
        })
      );
    }, [category, brand, dispatch, name, min, max, order, pageNumber]);
      
    const getFilterUrl = (filter) => {
      const filterPage = filter.page || pageNumber;
      const filterCategory = filter.category || category;
      const filterBrand = filter.brand || brand;
      const filterName = filter.name || name;
      const sortOrder = filter.order || order;
      const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
      const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
      return `/search/category/${filterCategory}/brand/${filterBrand}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
    };
    return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
          <div className="sort">
          Sort by{' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="lastest">Lastest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Category</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Brand</h3>
            <div>
            {loadingBrands ? (
              <LoadingBox></LoadingBox>
            ) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              <ul>
                {brands.map((b) => (
                  <li key={b}>
                    <Link
                      className={b === brand ? 'active' : ''}
                      to={getFilterUrl({ brand: b })}
                    >
                      {b}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};