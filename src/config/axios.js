import axios from 'axios';
import { userAuth } from '../utils/userAuth';
const server = process.env.server || "https://sub.deeponlineseller.com/api/v1";

let token = userAuth();
export const serverV1Instance = axios.create({
    baseURL: server,
    withCredentials: true,
    headers: { 'authorization': token || "" }
})