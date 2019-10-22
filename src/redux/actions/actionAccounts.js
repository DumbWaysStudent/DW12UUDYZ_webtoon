import * as types from './../types';
import axios from 'axios';
import { API_URL } from './../../constant/api_url';

export const handleLogin = (email, password) => ({
  type: types.LOGIN,
  payload: axios({
    method: 'POST',
    url: 'https://rest-api-toon.herokuapp.com/api/v1/login',
    data: {
      email,
      password,
    },
  }),
});
