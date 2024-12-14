import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchRecipe } from '../redux/slices/recipeSlice';

const Header = ({ insideHome }) => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className="flex bg-green-600 fixed w-full p-5 text-white font-bold">
        <Link className="text-2xl" to={'/'}>
          <i className="fa-solid fa-bowl-food"></i> My Recipes
        </Link>
        <ul className="flex-1 text-right">
          <li className="list-none inline-block px-5">
            {insideHome && (
              <input
                onChange={(e) => dispatch(searchRecipe(e.target.value.toLowerCase()))}
                style={{ width: '300px' }}
                className="rounded p-2 text-black"
                type="text"
                placeholder="Search recipes by cuisine!"
              />
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
