import { storageAvailable } from "./gm";

export function localStorageSet(name, value) {
    if (storageAvailable("localStorage")) {
        localStorage[name] = value;
    } else {
        console.log("localStorage error");
    }
}

export function localStorageGet(name) {
    if (storageAvailable("localStorage")) {
        return localStorage.getItem(name);
    } else {
        console.log("localStorage error");
    }
}

export function localStorageRemove(name) {
    if (storageAvailable("localStorage")) {
        return localStorage.removeItem(name);
    } else {
        console.log("localStorage error");
    }
}