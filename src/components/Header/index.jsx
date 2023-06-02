import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faBars,
  faSearch,
  faShoppingCart,
  faUser,
  faSignOut
} from "@fortawesome/free-solid-svg-icons";
import SearchForm from "./SearchForm";
import ShoppingCart from "./ShoppingCart";
import UserForm from "./UserForm";
import "./Header.css";
import Navbar from "./Navbar";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeShoppingCart, setActiveShoppingCart] = useState(false);
  const [activeUserForm, setActiveUserForm] = useState(false);
  const [localStrg, setLocalStrg] = useState(localStorage.getItem("token"));
  

  window.onscroll = () => {
    setActiveUserForm(false);
    setActiveShoppingCart(false);
    setActiveSearch(false);
    setActiveMenu(false);
  };
  const handleMenuButton = () => {
    setActiveMenu(!activeMenu);
    setActiveSearch(false);
    setActiveShoppingCart(false);
    setActiveUserForm(false);
  };
  const handleSearchButton = () => {
    setActiveSearch(!activeSearch);
    setActiveShoppingCart(false);
    setActiveUserForm(false);
    setActiveMenu(false);
  };
  const handleShoppingCartButton = () => {
    setActiveShoppingCart(!activeShoppingCart);
    setActiveSearch(false);
    setActiveUserForm(false);
    setActiveMenu(false);
  };
  const handleUserFormButton = () => {
    setActiveUserForm(!activeUserForm);
    setActiveSearch(false);
    setActiveShoppingCart(false);
    setActiveMenu(false);
  };
  return (
    <header className="header">
      <a href="/" className="logo">
        <i>
          <FontAwesomeIcon icon={faShoppingBasket} />
        </i>
        RR Veggies
      </a>
      <Navbar active={activeMenu} />
      <div className="flex  gap-9">
        {
          localStrg && (
            <button type="button" id="cart-btn" onClick={handleShoppingCartButton}>
          <FontAwesomeIcon
            className="fa-icon h-10 w-10 bg-gray-500 px-6 py-6 rounded-xl text-white"
            icon={faShoppingCart}
          />
        </button>
          )
        }
        {localStrg ? (
          <button type="button" id="user-btn" onClick={()=>{
            localStorage.removeItem('token')
            setLocalStrg(false)
          }}>
          <FontAwesomeIcon
            className="fa-icon h-10 w-10 bg-gray-500 px-6 py-6 rounded-xl text-white"
            icon={faSignOut}
          />
        </button>
        ) : (
          <button type="button" id="user-btn" onClick={handleUserFormButton}>
            <FontAwesomeIcon
              className="fa-icon h-10 w-10 bg-gray-500 px-6 py-6 rounded-xl text-white"
              icon={faUser}
            />
          </button>
        )}
      </div>
      <SearchForm active={activeSearch} />
      <ShoppingCart active={activeShoppingCart} />

      <UserForm active={activeUserForm} setActive={setActiveUserForm} setLocalStrg={setLocalStrg}/>
    </header>
  );
}
