import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthLayout } from "../view/layouts/AuthLayout";
import { PageLayout } from "../view/layouts/PageLayout";
import { CreateTour } from "../view/pages/CreateTour";
import { UpdateTour } from "../view/pages/EditTour";
import { ForgotPassword } from "../view/pages/ForgotPassword";
import { Login } from "../view/pages/Login";
import { ResetPassword } from "../view/pages/ResetPassword";
import { Tours } from "../view/pages/Tours";

import { AuthGuard } from "./AuthGuard";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<PageLayout />}>
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/new" element={<CreateTour />} />
            <Route path="/tours/:tourId/edit" element={<UpdateTour />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
