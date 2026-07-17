import axios from "axios";


const api = axios.create({

    baseURL:"https://plataforma-vacaciones-api.onrender.com/api"

});


export default api;
