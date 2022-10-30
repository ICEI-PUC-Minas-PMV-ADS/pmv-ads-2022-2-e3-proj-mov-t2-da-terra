import axios from 'axios';

const API = axios.create();
const url = 'https://orange-cities-juggle-187-59-103-199.loca.lt';


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

