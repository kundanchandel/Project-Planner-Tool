import Axios from "axios";

const baseURL = "http://localhost:7000/api/admin";

Axios.defaults.baseURL = baseURL;

export default Axios;