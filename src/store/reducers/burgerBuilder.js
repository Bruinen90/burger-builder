import * as actionTypes from '../actions/actionTypes';

const initalState = {
    ingredients: null,
    totalPrice: 3,
    totalIngredients: 0,
    doneness: 'medium',
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1,
};

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] +1,

                },
                totalIngredients: state.totalIngredients +1,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] -1,
                },
                totalIngredients: state.totalIngredients -1,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.CHANGE_DONENESS:
            return {
                ...state,
                doneness: action.newDoneness,
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
            }
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return {
                ...state,
                error: true,
            }
        default:
            return state;
    }
};

export default reducer;
