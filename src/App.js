import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Star from "react-star-ratings";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import CorebizLogo from "./components/logo/logo";
import Imgcart from "./assets/Vector.svg";
import Iconphone from "./assets/iconphone.svg";
import Iconemail from "./assets/iconemail.svg";
import SmallCorebiz from "./assets/white-logo.svg";
import Logovtex from "./assets/vtex.svg";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://corebiz-test.herokuapp.com/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      });

  }, []);

  // function handleClik() {
  //   sumCart++;
  //   return
  // }

  // função que converte o valor para R$
  function formatValue(value) {
    const newValue = value / 100;
    return newValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div>
      <header>
        <CorebizLogo />
        <div className="search">
          <input type="text" placeholder="O que está procurando?"></input>
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
                  <p>Minha conta</p>
                </a>
              </div>
            </li>
            <li>
              <div className="cart-section">
                <img src={Imgcart} alt="cart"></img>
                <div className="number-cart">
                  <p className="count-cart">0</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      <section>
        <Carousel showThumbs={false}>
          <div className="maskgroup">
            <div className="img-carousel" alt="banner"></div>
          </div>
          <div className="maskgroup">
              <div className="img-carousel" alt="banner"></div>
          </div>
          <div className="maskgroup">
              <div className="img-carousel" alt="banner"></div>
          </div>
        </Carousel>
      </section>

      <main>
        <div className="best-sellers">
          <h3>Mais vendidos</h3>
        </div>

        <section className="prateleira">
          {products.map((product) => (
            <div key={product.productId} className="card">
              <img src={product.imageUrl} alt="shoes"></img>

              <p className="name-product">{product.productName}</p>
              <div className="star">
                <Star
                  rating={product.stars}
                  numberOfStars={5}
                  starRatedColor="#F8475F"
                  starDimension="15"
                  starSpacing="1px"
                />
              </div>

              {product.listPrice ? (
                <p className="listprice">{`de ${formatValue(
                  product.listPrice
                )}`}</p>
                ) : <p className="listprice"><br></br></p>}
              <p className="product-price">{`por ${formatValue(
                product.price
              )}`}</p>
              {product.installments.length > 0 ?
                product.installments.map((installment) => (
                  <p className="info-price">
                    ou em {installment.quantity}x de{" "}
                    {formatValue(installment.value)}
                  </p>
                )): <p className='info-price'><br></br></p>}

              <button className="buy">COMPRAR</button>
            </div>
          ))}
        </section>
      </main>

      <section className="newsletters">
        <div className="newsletter-info">
          <p>Participe de nossas news com promoções e novidades!</p>
        </div> 
        <div className="newsletter-register">
          <div className="newsletter-register-input">
            <div className="newsletter-name">
              <input type="text" name="name" placeholder="Digite seu nome:" required/>
              <span className="name-validation"></span>      
            </div>
            <div className="newsletter-email">
              <input type="text" name="email" placeholder="Digite seu email:" />
              <span className="email-validation"></span>
            </div>
            <button className="newsletter-submit">Eu quero!</button>
          </div>
        </div>
      </section>

      <footer>
         <div className="localization">
           <h2>Localização</h2>
           <p>Rua Ifigênia Maria de Oliveira 3793</p>
           <p>Jd. Piratininga - 14403-583</p>
           <p>Franca SP, Brasil</p>
           <p>contato@clickqi.com.br</p>
           <p>+55 16 3713-6985</p>
         </div>
         <div className="contact">
           <button className="message">
             <img src={Iconemail} alt="email"></img>
             <p>ENTRE EM CONTATO</p>
           </button>
           <button className="chat" >
             <img src={Iconphone} alt="phone"></img>
             <p>FALE COM O NOSSO CONSULTOR ONLINE</p>
           </button>
         </div>
         <div className="developed">
           <div className="corebiz">
             <p>Created By</p>
             <img src={SmallCorebiz} alt="logo corebiz"></img>       
           </div>
           <div className="vtex">
             <p>Powered By</p>
             <img src={Logovtex} alt="logo vtex"></img> 
           </div>
         </div>         
      </footer>
    </div>
  );
}

export default App;
