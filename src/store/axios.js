import * as axios from 'axios';

var instance = axios.create();
instance.defaults.baseURL = "http://jodcard.com/api/";
instance.defaults.timeout = 20000;

export { instance as default };