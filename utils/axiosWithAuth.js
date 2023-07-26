import axios from 'axios';
import { useSession } from 'next-auth/react';

const AxiosWithAuth = () => {
  const session = useSession();

  const instance = axios.create();

  instance.interceptors.request.use(
    async config => {
      const idToken = session?.data.idToken;

      // If the tokens exist, add them to the headers
      if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default AxiosWithAuth;