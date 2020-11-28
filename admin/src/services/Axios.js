import Axios from "axios";

const baseURL = "http://localhost:7000/api/restaurant";

Axios.defaults.baseURL = baseURL;
Axios.defaults.headers.common['authtoken'] = localStorage.getItem('x-access-token')
export default Axios;
