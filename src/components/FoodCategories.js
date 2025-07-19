import React from 'react';
import './FoodCategories.css';

import burgerIcon from '../assets/icons/burger.jpeg';
import pizzaIcon from '../assets/icons/pizza.jpeg';
import chickenIcon from '../assets/icons/fried-chicken.png';
import friesIcon from '../assets/icons/fries.jpeg';
import drinkIcon from '../assets/icons/drinks.jpeg';

// highlights food item based on catogary

const categories = [
  { name: 'All', icon: burgerIcon },
  { name: 'Burger', icon: burgerIcon },
  { name: 'Pizza', icon: pizzaIcon },
  { name: 'Fried Chicken', icon: chickenIcon },
  { name: 'Fries', icon: friesIcon },
  { name: 'Drinks', icon: drinkIcon },
];

const FoodCategories = ({ selectedCategory, onSelectCategory }) => (
  <div className="food-categories">
    {categories.map(cat => (
      <div
        key={cat.name}
        className={`food-tag ${selectedCategory === cat.name ? 'active' : ''}`}
        onClick={() => onSelectCategory(cat.name)}
      >
        <img src={cat.icon} alt={cat.name} className="category-icon" />
        <span>{cat.name}</span>
      </div>
    ))}
  </div>
);

export default FoodCategories;
