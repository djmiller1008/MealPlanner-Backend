import './App.css';
import RecipeSearch from './components/recipe/recipeSearch/RecipeSearch';
import RecipeItem from './components/recipe/recipeItem/RecipeItem';
import { Route } from 'react-router-dom';
import Login from './components/auth/Login';


function App() {
  return (
    <div>
      <Route exact path='/' component={RecipeSearch} />
      <Route exact path='/recipe/:id' component={RecipeItem} />
      <Route exact path='/login' component={Login} />
    </div>
  ) 
}

export default App;
