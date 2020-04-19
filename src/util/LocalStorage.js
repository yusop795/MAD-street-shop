
export const setLocalStorage = ({ name, data }) => {
    let localStorageValue = localStorage.getItem(name);
    if (localStorageValue) {
        localStorage.setItem(name, data);
    } else {

    }
};

