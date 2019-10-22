import * as types from './../types';
import axios from 'axios';
import { API_URL } from '../../constant/api_url';

export const handleGetWebtoons = () => ({
  type: types.GET_WEBTOONS,
  payload: axios.get('https://rest-api-toon.herokuapp.com/api/v1/webtoons'),
});

export const handleGetWebtoonFavourites = id => ({
  type: types.GET_FAVOURITES,
  payload: axios({
    method: 'GET',
    url: `https://rest-api-toon.herokuapp.com/api/v1/user/${id}/favourites`,
  }),
});
