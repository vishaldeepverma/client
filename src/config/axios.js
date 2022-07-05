import axios from 'axios';
import { userAuth } from '../utils/userAuth';
const server = process.env.server || "http://localhost:4000/api/v1";

let token = userAuth();
export const serverV1Instance = axios.create({
    baseURL: server,
    withCredentials: true,
    headers: { 'authorization': token || "" }
})