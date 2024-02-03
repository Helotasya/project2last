import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './home/HomePage';
import ProjectsPage from './components/ProjectsPage';
import Meal from './components/components/Meal'
import RecipeInfo from './components/components/RecipeInfo';
import './components/components/style.css';


function App() {
  return (
   <BrowserRouter>
   <header className='sticky'>
    <span className='logo'>
      {/* <img src='' alt='logo' width={'49'} height={'99'}/> */}
    </span>
    <NavLink to='/' className='button rounded'>
      <span className='icon-home'>Home</span>
    </NavLink>
    <NavLink to='/project' className='button rounded'>
      <span className='icon-home'>Project</span>
    </NavLink>
   </header>

   <div className='container'>
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='project' element={<ProjectsPage/>} />
    <Route path='projects/:id' element={<ProjectsPage />}/>
    <Route path='/' element = {<Meal />}/>
    <Route path='/ : MealId' element = {<RecipeInfo />}/>
    </Routes>

   </div>
   </BrowserRouter>
  );
}

export default App;
