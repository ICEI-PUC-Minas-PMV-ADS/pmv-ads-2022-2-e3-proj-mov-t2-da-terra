import axios from 'axios';

const API = axios.create();
const url = 'https://early-donuts-roll-179-189-41-126.loca.lt';


// POST - Cadastro Usuário
export const register = async (param) => {
  try {
    return await API.post(`${url}/register`, param).then(
      response => {
        return response.data;
      },
      error => {
        console.log("response failed\n" + error);
        return null;
    }
    );
  } catch (error) {
    console.log("catch" + error);
    return null;
  }
}

// POST - Login
export const login = async (param) => {
  try {
    return await API.post(`${url}/login`, param).then(
      response => {
        return response.data;
      },
      error => {
        console.log("response failed\n" + error);
        return null;
    }
    );
  } catch (error) {
    console.log("catch" + error);
    return null;
  }
}

