export const FavoriteActionTypes = {
    ADD_TO_FAVORITE : 'ADD_TO_FAVORITE',
    REMOVE_FROM_FAVORITE:"REMOVE_FROM_FAVORITE",
    CLEAR_FAVORITE: 'CLEAR_FAVORITE'
}

export const favoriteActions = {
    addToFavorite: (productId) => ({
        type: FavoriteActionTypes.ADD_TO_FAVORITE,
        payload: productId,
    }),
    clearFavorite: () => ({
        type: FavoriteActionTypes.CLEAR_FAVORITE
    }),
    removeFromFavorite: (productId) => ({
        type: FavoriteActionTypes.REMOVE_FROM_FAVORITE,
        payload: productId,
    }),
};
