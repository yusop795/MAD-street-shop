
export const setLocalStorage = () => {
    return API_INSTANCE.get('/tags')
        .then(response => {
            console.log('야호')
            return response
        })
        .catch(error => {
            console.log('fetchShopList', error);
            return error;
        });
};

