import { httpClient } from "../HttpClient";

export interface IResetPasswordParams {
  email: string;
  code: string;
  newPassword: string;
}

export async function resetPassword(params: IResetPasswordParams) {
  await httpClient.post("/auth/reset-password", params);
}
