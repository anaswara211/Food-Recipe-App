import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipe } from '../redux/slices/recipeSlice'


const Home = () => {
  const dispatch = useDispatch();
const {allRecipe, loading, errorMsg} = useSelector(state=>state.recipeReducer)
// console.log(allRecipe, loading, errorMsg);
const[currentPage,setCurrentPage] =useState(1)
const productsPerPage = 8 
const totalpage = Math.ceil(allRecipe?.length/productsPerPage)
const currentPageProductLastIndex =currentPage * productsPerPage
const currentPageProductFirstIndex = currentPageProductLastIndex - productsPerPage
const visibleAllRecipe = allRecipe?.slice(currentPageProductFirstIndex,currentPageProductLastIndex)

  useEffect(() => {
    dispatch(fetchRecipe());
  }, []);

  const navigateToNextPage =()=>{
    if(currentPage!=totalpage){
      setCurrentPage(currentPage+1)
    }
  }
  const navigateToPreviousPage =()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }
  return (
    <>
    <Header insideHome={true}/>
    <div style={{ paddingTop: '190px'}} className="container px-3 mx-auto">
    
    {
    loading?
      <div className="flex justify-center items-center my-5 text-lg">
 <img 
              width="150px" 
              height="150px" 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" 
              alt="Loading..."
            />
            loading...
      </div>
      :
      <>
    
       <div className="grid grid-cols-4 gap-4 bg-white-600" >
        {allRecipe?.length>0?
         visibleAllRecipe?.map(recipe=>(
          <div className="rounded border p-2 shadow-2xl">
          <img width="100%" height="200px" src={recipe.image} alt="" />
          <div className="text-center mt-3">
                          <h1 className="text-xl font-bold">Dish:{recipe.name}</h1>
                          <h6 className=" font-bold">Cusine:{recipe.cuisine}</h6>
                          <Link 
                            to={`/${recipe.id}/view`} 
                            className="bg-green-600 rounded p-3 mt-3 text-white inline-block"
                          >
                            View Recipe..
                          </Link>

                        </div>
          </div>
         ))
        :
        <div className="flex justify-center items-center font-bold text-red-600 my-5 text-lg">
        Recipe not found!!
      </div> }
       </div>
       <div className="text-2xl text-center font-bold mt-20">
              <span onClick={navigateToPreviousPage} className="cursor-pointer"><i className="fa-solid fa-backward me-5"></i></span>
              <span>{currentPage}of {totalpage}</span>
              <span onClick={navigateToNextPage} className="cursor-pointer"><i className="fa-solid fa-forward ms-5"></i></span>
            </div>
            
    </>
    }
    </div>
    
    </>
  )
}

export default Home