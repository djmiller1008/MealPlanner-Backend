import axios from "axios"
import { API_KEY } from "../../config/keys"

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