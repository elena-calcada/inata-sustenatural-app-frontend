import { httpClient } from "../HttpClient";

export interface ISigninParams {
  email: string;
  password: string;
}

interface ISigninResponse {
  accessToken: string;
  refreshToken: string;
}

export async function signin(params: ISigninParams) {
  const { data } = await httpClient.post<ISigninResponse>(
    "/auth/sign-in",
    params,
  );

  return data;
}
