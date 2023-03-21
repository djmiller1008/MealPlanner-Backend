import axios from "axios";
import { API_KEY } from "../../config/keys";

const getSpringRequestConfig = () => {
    return { headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
        'Content-Type': 'application/json'
    }}
}

export const fetchRecipeSearchResults = async (searchQuery, searchFilters) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`, {
            params: { query: searchQuery, ...searchFilters }
        }).catch(error => {
            if (error.response.status === 402) {
                return {
                    message: "Daily API request limit reached. Please try again later."
                }
            }
        })
    
    if (response.status === 200) {
        return response.data.results;
    }
    return response;
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
    const response = await axios.post('api/auth/login', user).catch(error => {
        if (error.response.status === 401) {
            return {
                jwtToken: "",
                user: null,
                message: error.response.data
            }
        } 
    })
    if (response.status === 200) {
        return {
            jwtToken: response.headers.authorization,
            user: response.data,
            message: ""
        }
    }
    return response;
}

export const addUserRecipe = async recipeData => {
    const response = await axios.post('/api/user-meals', recipeData);
    return response;
} 

export const createUserMealPlan = async mealPlanData => {
    const response = await axios.post('api/user-mealplans', mealPlanData, getSpringRequestConfig());
    return response;
}

export const fetchUserMealPlans = async () => {
    const response = await axios.get('api/user-mealplans', getSpringRequestConfig());
    return response;
}

export const addMealToMealPlan = async mealData => {
    const response = await axios.post('api/user-meals', mealData, getSpringRequestConfig());
    return response;
}

export const fetchUserMealPlanMeals = async mealPlanId => {
    const response = await axios.get(`/api/user-mealplans/${mealPlanId}`, getSpringRequestConfig());
    return response;
} 

export const validateJwtToken = async token => {
    const response = await axios.get(`/api/auth/validate?token=${token}`, getSpringRequestConfig());
    return response;
}