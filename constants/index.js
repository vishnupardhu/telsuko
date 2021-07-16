import dotenv from 'dotenv';
dotenv.config();

export const DB = process.env.APP_DB;
export const SECRET = process.env.APP_SECRET;
export const DOMAIN = process.env.APP_DOMAIN;
export const HOST_EMAIL = process.env.APP_HOST_EMAIL;
export const SENDGRID_API = process.env.APP_SENDGRID_API;
export const PORT = process.env.PORT || process.env.APP_PORT;
export const ACCESS_KEY = process.env.ACCESS_KEY;
export const SECRET_KEY = process.env.SECRET_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_REGIONAL = process.env.AWS_REGIONAL;