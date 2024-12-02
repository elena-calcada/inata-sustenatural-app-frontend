import { httpClient } from "../HttpClient";

interface IRefreshTokenRequest {
  refreshTokenPayload: string;
}

interface IRefreshTokenResponse {
  accessToken: string;
}

export async function refreshToken({
  refreshTokenPayload,
}: IRefreshTokenRequest) {
  const { data } = await httpClient.post<IRefreshTokenResponse>(
    "/auth/refresh-token",
    {
      refreshToken: refreshTokenPayload,
    },
  );

  return data;
}
