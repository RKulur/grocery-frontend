// Products
import React, { useEffect, useState } from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import Axios from 'axios'

export default function Products() {
  const [products,setProducts] = useState([])

  useEffect(()=>{
    let token = localStorage.getItem('token');
    if(!token){
      return console.log('No token ')
    }

    Axios.get('http://localhost:7000/api/user/groceries',{
      headers : {
        'auth-token' : JSON.parse(token)
      }
    }).then((res)=>{
      setProducts(res.data)
      console.log(products)

    }).catch((err)=>{
      console.log(err)
    })
  },[])

  function handleCart(gId){
    let token = localStorage.getItem('token');
    console.log(JSON.parse(token))
    if(!token){
      return console.log('No token ')
    }
    Axios.post(`http://localhost:7000/api/user/insert-cart/${gId}`,{
      headers : {
        'auth-token' : token
      }
    }).then(res => console.log(res)).catch((err)=>{
      console.log(err)})
  }

  SwiperCore.use([Autoplay]);
  return (
    <section className="products" id="products">
      <h1 className="heading">
        our
        {' '}
        <span>products</span>
      </h1>
      <div className="products-slider slider">
        <div className="wrapper swiper-wrapper">
          <Swiper
            loop
            spaceBetween={20}
            autoplay={{ delay: 7500, disableOnInteraction: false }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            centeredSlides
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: { slidesPerView: 3 },
            }}
            style={{ padding: '1rem' }}
          >
            {
              products.map((product,index) => (
                <SwiperSlide key={index}>
                <div className="box">
                <img src="" alt={product.image} />
                <h3>{product.name}</h3>
                <div className="price">{product.description}</div>
                <div className="price">₹{product.price}</div>
                <div className="stars">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
                <button onClick={()=>{
                  handleCart(product._id)
                }} type="button" className="btn">
                  add to cart
                </button>
              </div>
            </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>

    </section>
  );
}
