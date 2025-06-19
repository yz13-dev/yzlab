const isDev = process.env.NODE_ENV === "development";
export const DEV_API_URL = "http://localhost:3000";
export const PROD_API_URL = "https://api.yzlab.ru";
export const API_URL = isDev ? DEV_API_URL : PROD_API_URL;
