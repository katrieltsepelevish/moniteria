// @ts-ignore
const env = import.meta.env;

export default {
  apiUrl: env.VITE_API_URL,
  socketUrl: env.VITE_SOCKET_URL,
  appName: env.VITE_APP_NAME,
  authCookie: env.VITE_AUTH_COOKIE,
};
