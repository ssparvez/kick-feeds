import axios from 'axios';

const KEY = process.env.REACT_APP_FOOTBALL_API_KEY;
const HOST = 'api-football-v1.p.rapidapi.com';

export default axios.create({
  baseURL: 'https://' + HOST,
  headers: { 
		'X-RapidAPI-Host': HOST,
		'X-RapidAPI-Key': KEY
	} 
});