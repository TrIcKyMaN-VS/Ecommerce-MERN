import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // fetch(process.env.APP_REACT_API_URL + '/products')
    fetch('http://localhost:8000/api/products?'+searchParams)
      .then((res) => res.json())
      .then(res => {setProducts(res.products)
      });
  }, [searchParams]);
  return (
    <div>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
            {products.map(products => <ProductCard product={products} />)}
            {/* <ProductCard /> */}
            
          
        </div>
      </section>
    </div>
  );
};

export default Home;
