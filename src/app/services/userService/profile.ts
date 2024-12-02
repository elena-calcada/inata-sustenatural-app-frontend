import { httpClient } from "../HttpClient";

interface IProfileResponse {
  profile: {
    email: string;
    email_verified: string;
    last_name: string;
    first_name: string;
    id: string;
  };
}

export async function profile() {
  const { data } = await httpClient.get<IProfileResponse>("/profile");

  return data;
}
