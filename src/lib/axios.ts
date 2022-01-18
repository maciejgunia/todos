import Axios from "axios";
export const axios = Axios.create({
    baseURL: `${window.location.protocol}//${window.location.host}`
});
