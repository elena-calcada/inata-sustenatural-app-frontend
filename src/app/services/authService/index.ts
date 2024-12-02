import { forgotPassword } from "./forgotPassword";
import { refreshToken } from "./refreshToken";
import { resetPassword } from "./resetPassword";
import { signin } from "./signin";

export const authService = {
  signin,
  refreshToken,
  forgotPassword,
  resetPassword,
};
