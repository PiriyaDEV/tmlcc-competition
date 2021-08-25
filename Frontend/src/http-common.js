import axios from "axios";
import url from "./api-url";

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});
