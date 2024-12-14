import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams, useNavigate } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // To handle redirection if recipe is not found
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("allRecipe")) {
      const allRecipe = JSON.parse(sessionStorage.getItem("allRecipe"));
      const selectedRecipe = allRecipe.find(item => item.id.toString() === id);

      if (selectedRecipe) {
        setRecipe(selectedRecipe);
      } else {
        // Redirect to 404 or display a fallback message
        navigate("/*");
      }
    } else {
      // If sessionStorage is empty, redirect or handle error
      navigate("/*");
    }
  }, [id, navigate]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">Recipe Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col mx-5 pt-5">
        <div className="grid grid-cols-2 items-center h-screen">
          <div className="flex justify-center items-center">
            <img
              className="w-full max-w-md rounded-lg shadow-lg"
              src={recipe?.image}
              alt={recipe?.name}
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-5">{recipe?.name}</h1>
            <h4 className="font-bold text-red-600 text-2xl mb-3">Cuisine: {recipe?.cuisine}</h4>
            <h4 className="text-xl mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside text-lg">
              {recipe?.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p className="text-lg mt-3">
              <span className="font-bold">Instructions:</span>
              <ol className="list-decimal list-inside mt-2">
                {recipe?.instructions?.map((step, index) => (
                  <li key={index} className="mb-1">
                    {step}
                  </li>
                ))}
              </ol>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
