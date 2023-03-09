import './App.css';
import RecipeSearch from './components/recipe/recipeSearch/RecipeSearch';
import RecipeItem from './components/recipe/recipeItem/RecipeItem';
import { Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import { PrivateRoute, AuthRoute }from './components/util/RouteUtil';
import Dashboard from './components/home/Dashboard';
import CreateMealPlan from './components/mealPlan/CreateMealPlan';
import AddToMealPlan from './components/mealPlan/AddToMealPlan';
import MealPlanShow from './components/mealPlan/MealPlanShow';


function App() { 
 
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/search" component={RecipeSearch} />
        <PrivateRoute exact path='/recipe/:id' component={RecipeItem} />
        <PrivateRoute path="/create" component={CreateMealPlan} />
        <PrivateRoute path="/addMeal" component={AddToMealPlan} />
        <PrivateRoute path="/mealPlan/:id" component={MealPlanShow} />
        <AuthRoute exact path='/login' component={Login} />
      </Switch>
    </div>
  ) 
}

export default App;
