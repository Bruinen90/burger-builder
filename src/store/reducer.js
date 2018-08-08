import * as actionTypes from './actions';

const initalState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0,
    },
    totalPrice: 3,
    totalIngredients: 0,
    doneness: 'medium',
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
        default:
            return state;
    }
};

export default reducer;
