import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { PageLoader } from "../../view/components/PageLoader";
import { localStorageKeys } from "../config/localStorageKeys";
import { IUser } from "../entites/IUsers";
import { authService } from "../services/authService";
import { httpClient } from "../services/HttpClient";
import { usersService } from "../services/userService";
import { showErrorToast } from "../utils/toast";

interface IAuthContextValue {
  isSignedIn: boolean;
  signinSaveCredentials(accessToken: string, refreshToken: string): void;
  signout(): void;
  user: IUser | undefined;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );
    const storedRefreshToken = localStorage.getItem(
      localStorageKeys.REFRESH_TOKEN,
    );

    return !!(storedAccessToken && storedRefreshToken);
  });

  // #####################################################
  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,

      async (error) => {
        const refreshToken = localStorage.getItem(
          localStorageKeys.REFRESH_TOKEN,
        );
        const originalRequest = error.config;

        if (originalRequest.url === "/auth/refresh-token") {
          setIsSignedIn(false);
          localStorage.clear();
          return Promise.reject(error);
        }

        if (
          (error.response && error.response.status !== 401) ||
          !refreshToken
        ) {
          return Promise.reject(error);
        }

        const response = await authService.refreshToken({
          refreshTokenPayload: refreshToken,
        });

        localStorage.setItem(
          localStorageKeys.ACCESS_TOKEN,
          response.accessToken,
        );

        return httpClient(originalRequest);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, []);

  // #########################################################

  const signinSaveCredentials = useCallback(
    (accessToken: string, refreshToken: string) => {
      localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
      localStorage.setItem(localStorageKeys.REFRESH_TOKEN, refreshToken);

      setIsSignedIn(true);
    },
    [],
  );

  const queryClient = useQueryClient();

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.REFRESH_TOKEN);

    queryClient.removeQueries();
    setIsSignedIn(false);
  }, [queryClient]);

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: async () => usersService.profile(),
    enabled: isSignedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showErrorToast("Sua seção expirou!");
      signout();
    }
  }, [isError, signout]);

  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        signinSaveCredentials,
        isSignedIn: isSuccess && isSignedIn,
        signout,
        user: {
          first_name: data?.profile.first_name,
          email: data?.profile.email,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
