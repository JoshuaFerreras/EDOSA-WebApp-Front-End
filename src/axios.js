import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.put['Accept'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
