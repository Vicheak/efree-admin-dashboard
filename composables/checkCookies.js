import Cookies from 'js-cookie';
import { useRuntimeConfig } from '#app'; // Import `useRuntimeConfig` properly

export const checkCookieExpiration = () => {
  const config = useRuntimeConfig();
  const cookieKey = config.public.cookie_key; // Retrieve the cookie key from runtime config
  const accessToken = Cookies.get(cookieKey); // Get the access token cookie
  
  if (!accessToken) {
    console.log('Access token cookie does not exist or has expired.');
    return false; // Cookie does not exist or is expired
  }

  // Retrieve the expiration time stored in another cookie
  const expireTime = Cookies.get(`${cookieKey}_expire`);
  
  if (expireTime) {
    const expireDate = parseInt(expireTime, 10);
    const now = new Date().getTime(); // Get the current time in milliseconds
    
    if (now >= parseInt(expireDate, 10)) { // Compare with the expiration time
      console.log('Access token cookie has expired.');
      return false; // Cookie has expired
    } else {
      console.log('Access token cookie is valid.');
      return true; // Cookie is valid
    }
  } else {
    console.log('Expiration time cookie not found.');
    return false; // Expiration time not found
  }
};


