import jwtDecode from 'jwt-decode';
import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = 'token';

http.setJwt(getJwt()); //avoid bi-driectional dependy with http service

export async function login(email, password) {
    const {data: jwt} = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
} 

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
    try {      
        const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        return user;
      } catch(ex) { return null; }
}

export function getJwt() {
    return localStorage.getItem('token');
}

export default {
    login,
    loginWithJwt,
    getCurrentUser,
    logout,
    getJwt
}
