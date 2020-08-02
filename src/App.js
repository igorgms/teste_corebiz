import React,  { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faStar
} 
from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";

import CorebizLogo from "./components/logo";



function App() {

const [products, setProducts] = useState([])

useEffect(() => {
  axios
    .get("https://corebiz-test.herokuapp.com/api/v1/products")
    .then((response) => {
      setProducts(response.data) 
    });
}, [])

  return (
    <div>
      <header>
        <CorebizLogo />
        <div className="search">
          <input placeholder="O que está procurando?"></input>
          <a href="/">
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </div>
        <nav>
          <ul className="menu">
            <li>
              <div className="account">
                <a href="/">
                  <FontAwesomeIcon icon={faUser} />
                  Minha conta
                </a>
              </div>
            </li>
            <li>
              <a href="/">
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section>
        <Carousel showThumbs={false}>
          <div className="maskgroup">
            <div className="banner"></div>
            <div className="banner2">
              <div className="img-carousel"></div>
            </div>
          </div>
          <div className="maskgroup">
            <div className="banner"></div>
            <div className="banner2">
              <div className="img-carousel"></div>
            </div>
          </div>
          <div className="maskgroup">
            <div className="banner"></div>
            <div className="banner2">
              <div className="img-carousel"></div>
            </div>
          </div>
        </Carousel>
      </section>

      <h1>Mais vendidos</h1>

      <section className="prateleira">
        {products.map((product) => (
          <div key={product.productId} className="card">
            <img src={product.imageUrl}></img>
            <div className="description">
              <p>{product.productName}</p>
              {[...Array(5).keys()].map((item) => (
                <FontAwesomeIcon key={item} icon={faStar} />
              ))}
              {product.listPrice && <p className="listprice">{`de ${product.listPrice.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}`}</p>}
              <p>{product.price}</p>
              {product.installments.length > 0 &&
                product.installments.map((installment) => (
                  <p>
                    ou em {installment.quantity}x de R$ {installment.value}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
