import axios from 'axios';

const api = axios.create({
    baseURL: "https://xwealthx.vercel.app/auth/",
    withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);