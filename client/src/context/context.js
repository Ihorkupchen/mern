import {createContext} from 'react';
const noop = () => {};
export const authContext = createContext({
    token: null,
    tokenId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})



