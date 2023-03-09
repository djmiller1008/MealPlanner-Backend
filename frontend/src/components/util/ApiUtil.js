import axios from "axios";
import { API_KEY } from "../../config/keys";

const springRequestConfig = {
    headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
        'Content-Type': 'application/json'
    }
}


export const fetchRecipeSearchResults = async (searchQuery, searchFilters) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`, {
            params: { query: searchQuery, ...searchFilters }
        });

    return response.data.results;
} 

export const fetchRecipeInfo = async recipeId => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
    return response.data;
}

export const fetchRecipeNutritionInfo = async recipeId => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${API_KEY}`);
    return response.data;
}

export const login = async user => {
    const response = await axios.post('api/auth/login', user);
    return {
        jwtToken: response.headers.authorization,
        user: response.data
    }
}

export const addUserRecipe = async recipeData => {
    const response = await axios.post('/api/user-meals', recipeData);
    return response;
} 

export const createUserMealPlan = async mealPlanData => {
    const response = await axios.post('api/user-mealplans', mealPlanData, springRequestConfig);
    return response;
}

export const fetchUserMealPlans = async () => {
    const response = await axios.get('api/user-mealplans', springRequestConfig);
    return response;
}

export const addMealToMealPlan = async mealData => {
    const response = await axios.post('api/user-meals', mealData, springRequestConfig);
    return response;
}

export const fetchUserMealPlanMeals = async mealPlanId => {
    const response = await axios.get(`/api/user-mealplans/${mealPlanId}`, springRequestConfig);
    return response;
    
} 