
import React from 'react';
import './FoodCategories.css';

import burgerIcon from '../assets/icons/burger.jpeg';
import pizzaIcon from '../assets/icons/pizza.jpeg';
import chickenIcon from '../assets/icons/fried-chicken.png';
import friesIcon from '../assets/icons/fries.jpeg';
import drinkIcon from '../assets/icons/drinks.jpeg';

const categories = [
  { name: 'All', icon: burgerIcon },
  { name: 'Burger', icon: burgerIcon },
  { name: 'Pizza', icon: pizzaIcon },
  { name: 'Fried Chicken', icon: chickenIcon },
  { name: 'Fries', icon: friesIcon },
  { name: 'Drinks', icon: drinkIcon },
];

const FoodCategories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="food-categories">
      {categories.map((cat) => (
        <button
          type="button"
          key={cat.name}
          className={`food-tag ${
            selectedCategory === cat.name ? 'active' : ''
          }`}
          onClick={() => onSelectCategory(cat.name)}
          aria-pressed={selectedCategory === cat.name}
        >
          <img
            src={cat.icon}
            alt=""
            className="category-icon"
          />

          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FoodCategories;
