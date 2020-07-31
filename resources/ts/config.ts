export const APP_LOGGER_ON = process.env.MIX_APP_DEBUG == 'true';

export const APP_URL = process.env.MIX_APP_URL;

export const APP_NAME = process.env.MIX_APP_NAME;

export const API_URL = APP_URL+"api/web/";

export const USER_TOKEN_KEY = 'userToken';

export const APP_DIRECTORY = process.env.MIX_APP_DEBUG == 'true'? '/':'/echemist/';
