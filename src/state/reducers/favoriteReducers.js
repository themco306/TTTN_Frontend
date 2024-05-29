import { FavoriteActionTypes } from "../actions/favoriteActions";

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoriteReducers = (state = initialState, action) => {
  switch (action.type) {
      case FavoriteActionTypes.ADD_TO_FAVORITE:
          const newFavoritesAdd = [...state.favorites, action.payload];
          localStorage.setItem('favorites', JSON.stringify(newFavoritesAdd));
          return {
              ...state,
              favorites: newFavoritesAdd
          };
      case FavoriteActionTypes.REMOVE_FROM_FAVORITE:
          const newFavoritesRemove = state.favorites.filter(id => id !== action.payload);
          localStorage.setItem('favorites', JSON.stringify(newFavoritesRemove));
          return {
              ...state,
              favorites: newFavoritesRemove
          };
      case FavoriteActionTypes.CLEAR_FAVORITE:
          localStorage.removeItem('favorites');
          return {
              ...state,
              favorites: []
          };
      default:
          return state;
  }
};

export default favoriteReducers;
